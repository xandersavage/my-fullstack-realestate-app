# 🏡 Real Estate Fullstack App

A fullstack real estate web application that allows users to browse property listings, search by criteria, save listings, create their own, and even chat with agents — all in real-time.

This project is built with a powerful tech stack and designed with scalability and modern user experience in mind.

---

## ✨ Features

- **Browse Listings**: View available properties with detailed information
- **Search Functionality**: Find properties by location, price range, and other criteria
- **User Authentication**: Secure login system to access personalized features
- **Saved Listings**: Bookmark favorite properties for easy access
- **Create Listings**: Authenticated users can create and manage their own listings
- **Real-time Chat**: Connect with agents directly through the platform
- **Profile Management**: Customize your profile with Cloudinary image uploads
- **Responsive Design**: Seamless experience across all devices

## 🛠️ Tech Stack

### Frontend
- **React.js**: Modern UI library for building interactive interfaces
- **SASS**: Advanced CSS preprocessor for styled components
- **Zustand**: Lightweight state management solution

### Backend
- **Node.js**: JavaScript runtime for server-side logic
- **Express.js**: Web framework for building robust APIs
- **WebSockets**: Real-time bidirectional communication for chat features
- **JWT**: Secure authentication with JSON Web Tokens

### Database & Storage
- **MongoDB**: NoSQL database for flexible data storage
- **Prisma**: Next-generation ORM for simplified database access
- **Cloudinary**: Cloud storage for profile and property images

## 📋 Installation

1. Clone the repository
```bash
git clone https://github.com/xandersavage/my-fullstack-realestate-app.git
cd real-estate-app
```

2. Install dependencies for all services
```bash
# Install API dependencies
cd api
npm install

# Install client dependencies
cd ../client
npm install

# Install socket server dependencies
cd ../socket
npm install

# Return to root directory
cd ..
```

3. Configure environment variables
Create `.env` files in the appropriate directories:

For API (.env in api folder):
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

For Socket Server (.env in socket folder):
```
PORT=your_socket_server_port
```

4. Run the development servers
```bash
# Run API server
cd api
npm run dev

# Run client (in a new terminal)
cd client
npm run dev

# Run socket server (in a new terminal)
cd socket
npm run dev
```

## 💻 Usage

### Authentication
- Register a new account or login to access protected features
- JWT secures user sessions and protected routes

### Browsing Properties
- View all listings on the home page
- Use filters to narrow down properties by location, price, etc.
- Click on listings to see detailed information

### Profile Management
- Update your personal information
- Upload and manage your profile picture
- View your saved listings and created properties

### Creating Listings
- Add new properties with detailed descriptions
- Upload multiple images
- Set pricing and property details

### Communicating with Agents
- Start real-time conversations about properties
- Receive instant responses through WebSocket integration

## 🔄 API Endpoints

### Auth Routes
```
POST /api/auth/register - Create new user
POST /api/auth/login - Authenticate user
POST /api/auth/logout - Logout current user

```

### Listing Routes
```
GET /api/posts - Get all posts
GET /api/posts/:id - Get specific listing
POST /api/posts - Create listing (auth required)
PUT /api/posts/:id - Update listing (auth required)
DELETE /api/posts/:id - Delete listing (auth required)

```

### User Routes
```
GET /api/users - Get all users
PUT /api/users/ - Update user (auth required)
DELETE /api/users/ - Delete user (auth required)
POST /api/users/save - Save a post (auth required)
GET /api/users/profilePosts - Get profile posts (auth required)
GET /api/users/notification - Get notification count (auth required)

```

### Message Routes
```
POST /api/messages/ - Create a message
```

## 🚀 Future Enhancements

- Virtual property tours
- Mortgage calculator
- Advanced search filters
- User reviews and ratings
- Mobile application

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Alexander Olomukoro - swankylex@gmail.com

Project Link: [https://github.com/xandersavage/my-fullstack-realestate-app](https://github.com/xandersavage/my-fullstack-realestate-app.git)
