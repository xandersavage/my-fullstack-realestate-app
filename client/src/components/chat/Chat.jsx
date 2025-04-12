import { useContext, useEffect, useState, useRef } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import useStore from "../../lib/store";

function Chat({ chats, setChats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messagesEndRef = useRef(null);
  const decrease = useStore((state) => state.decrease);
  const increase = useStore((state) => state.increase);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when chat changes or new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      const newMessage = res.data;
      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      // Update the chat list with the new message
      setChats((prev) =>
        prev.map((c) =>
          c.id === chat.id
            ? { ...c, lastMessage: text, seenBy: [currentUser.id] }
            : c
        )
      );

      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: { ...newMessage, chatId: chat.id },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read" + chat.id);
      } catch (error) {
        console.log(error);
      }
    };

    const handleGetMessage = (data) => {
      // Update the chat messages if the message is for the current chat
      if (chat && data.chatId === chat.id) {
        setChat((prev) => ({
          ...prev,
          messages: [...prev.messages, data],
        }));
        read();
      } else {
        // Increase notification count for messages in other chats
        increase();
      }

      // Update the chat list with the new message
      setChats((prev) =>
        prev.map((c) =>
          c.id === data.chatId
            ? { ...c, lastMessage: data.text, seenBy: [] }
            : c
        )
      );
    };

    if (socket) {
      socket.on("getMessage", handleGetMessage);
    }

    return () => {
      if (socket) {
        socket.off("getMessage", handleGetMessage);
      }
    };
  }, [socket, chat, setChats, increase]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy?.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            {/* Only try to access receiver properties if receiver exists */}
            {c.receiver ? (
              <>
                <img src={c.receiver.avatar || "/noAvatar.png"} alt="" />
                <span>{c.receiver.username}</span>
              </>
            ) : (
              <>
                <img src="/noAvatar.png" alt="" />
                <span>Yourself</span>
              </>
            )}
            <p>{c.lastMessage || "No messages yet"}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noAvatar.png"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                key={message.id}
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
