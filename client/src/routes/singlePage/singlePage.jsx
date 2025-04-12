import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { redirect, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
function SinglePage() {
  const post = useLoaderData();
  console.log("Post data:", post);
  const [saved, setSaved] = useState(post.isSaved);

  const { currentUser } = useContext(AuthContext);

  const handleSave = async () => {
    // AFTER REACT 19 UPDATE TO USE OPTIMISTIC UPDATE
    setSaved((prev) => !prev);
    if (!currentUser) {
      redirect("/login");
    }
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (error) {
      console.error("Error saving the post:", error);
      setSaved((prev) => !prev); // Revert the saved state if there's an error
    }
  };

  // Helper function to format distances with proper units
  const formatDistance = (distance) => {
    if (distance === undefined || distance === null) return "Not specified";

    // Handle zero distance
    if (distance === 0) return "On location";

    // Convert to number if it's a string
    const numDistance =
      typeof distance === "string" ? parseFloat(distance) : distance;

    // Check if it's a valid number
    if (isNaN(numDistance)) return "Invalid distance";

    // Format the distance
    if (numDistance >= 1000) {
      const kmDistance = (numDistance / 1000).toFixed(1);
      return `${kmDistance} km away`;
    } else {
      return `${numDistance} m away`;
    }
  };
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets allowed</p>
                ) : (
                  <p>pets not allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post?.postDetail?.income || "Not specified"}</p>
              </div>
            </div>

            {/* Sizes Section */}
            <p className="title">Sizes</p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>
                  {post?.postDetail?.size
                    ? `${post.postDetail.size} sq ft`
                    : "Size not specified"}
                </span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>
                  {typeof post?.bedroom === "number"
                    ? `${post.bedroom} ${
                        post.bedroom === 1 ? "Bedroom" : "Bedrooms"
                      }`
                    : "Bedrooms not specified"}
                </span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="" />
                <span>
                  {typeof post?.bathroom === "number"
                    ? `${post.bathroom} ${
                        post.bathroom === 1 ? "Bathroom" : "Bathrooms"
                      }`
                    : "Bathrooms not specified"}
                </span>
              </div>
            </div>

            {/* Nearby Places Section */}
            <p className="title">Nearby Places</p>
            <div className="listHorizontal">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="featureText">
                  <span>School</span>
                  <p>{formatDistance(post?.postDetail?.school)}</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Bus Stop</span>
                  <p>{formatDistance(post?.postDetail?.bus)}</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Restaurant</span>
                  <p>{formatDistance(post?.postDetail?.restaurant)}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
