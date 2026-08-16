# 🏠 RoomFinder

> A full-stack MERN platform for discovering rooms, PGs, apartments, and
> compatible roommates based on location, budget, and lifestyle
> preferences.

## 🌐 Live Demo

-   **Frontend:** https://room-finder-tau.vercel.app
-   **Backend API:** https://roomfinder-backend-eejv.onrender.com
-   **Repository:** https://github.com/nainashilpi/RoomFinder

## 📌 About

RoomFinder is a full-stack web application that helps users discover
accommodation and compatible roommates. Users can browse properties,
search by location and budget, view detailed listings, create roommate
profiles, upload images, and authenticate securely.

The frontend is deployed on Vercel, the backend on Render, MongoDB is
used for persistent data, and Cloudinary handles image storage.

## ✨ Features

### Authentication

-   User registration and login
-   JWT-based authentication
-   Protected backend routes
-   Client-side logout

### Property Management

-   Browse properties
-   Search/filter properties
-   Property detail pages
-   Add property
-   Multiple image uploads
-   Cloudinary image hosting
-   Property type and room type
-   Rent and security deposit
-   Gender preference
-   Furnishing status
-   Amenities
-   Availability date
-   Location and contact information

### Roommate Finder

-   Browse roommate profiles
-   Create roommate profiles
-   Profile image upload
-   Age, gender and occupation
-   Budget and preferred location
-   Preferred gender
-   Lifestyle preferences
-   Contact information
-   Availability status

### UI/UX

-   React + Tailwind responsive interface
-   Reusable Navbar and Footer
-   Toast notifications
-   Animated interactions
-   Image previews
-   Property/roommate detail pages
-   Property image slideshow
-   Click-to-call contact buttons

## 🛠️ Tech Stack

**Frontend:** React.js, React Router, Tailwind CSS, Axios, React Hot
Toast, React Icons, Vite

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Multer,
Cloudinary, CORS, Morgan

**Deployment:** Vercel, Render, MongoDB, Cloudinary

## 🏗️ Architecture

``` text
RoomFinder/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── images/
│   │   ├── layouts/
│   │   └── pages/
│   └── package.json
│
└── README.md
```

## 🔄 Application Flow

``` text
React Frontend
      ↓ Axios
Express REST API
      ├── JWT Authentication
      ├── MongoDB / Mongoose
      └── Cloudinary
              ↓
          Image URLs
```

## 🔐 Authentication Flow

1.  User registers.
2.  Backend validates and creates the user.
3.  User logs in.
4.  Backend returns a JWT.
5.  Frontend stores the token in `localStorage`.
6.  Protected requests send the token.
7.  Authentication middleware verifies the token.
8.  Authorized operations proceed.

## ☁️ Image Upload Flow

``` text
Image selected
      ↓
React FormData
      ↓
Multer
      ↓
Express backend
      ↓
Cloudinary
      ↓
secure_url
      ↓
MongoDB stores URL
      ↓
React displays image
```

## 📡 Main API Routes

### Authentication

``` text
POST /api/auth/register
POST /api/auth/login
```

### Properties

``` text
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PUT    /api/properties/:id
DELETE /api/properties/:id
```

### Roommates

``` text
GET    /api/roommates
GET    /api/roommates/:id
POST   /api/roommates
PUT    /api/roommates/:id
DELETE /api/roommates/:id
```

## ⚙️ Environment Variables

### Backend

``` env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend

``` env
VITE_API_URL=https://roomfinder-backend-eejv.onrender.com
```

Never commit `.env` files or secrets to GitHub.

## 🚀 Local Setup

``` bash
git clone https://github.com/nainashilpi/RoomFinder.git
cd RoomFinder
```

### Backend

``` bash
cd backend
npm install
npm run dev
```

### Frontend

Open another terminal:

``` bash
cd frontend
npm install
npm run dev
```

For production build:

``` bash
npm run build
```

## 🔒 Security

-   JWT authentication
-   Protected backend routes
-   Environment variables for secrets
-   CORS configuration
-   Cloudinary for image storage
-   Server-side validation through Mongoose

## 🚧 Future Improvements

-   Edit/delete UI for user-owned listings
-   Advanced filtering and sorting
-   Saved listings
-   User profiles
-   Real-time chat
-   Pagination
-   Password reset
-   Admin dashboard
-   Image optimization and lazy loading
-   AI-powered recommendations

## 🎯 Interview Highlights

### Problem

Finding suitable accommodation and compatible roommates can be difficult
because users need to consider location, budget, room type, and
lifestyle compatibility.

### Solution

RoomFinder combines property discovery and roommate matching in one
platform with authentication, filtering, image uploads, and detailed
listings.

### Key Technical Challenges

-   Multipart form handling
-   Multer + Cloudinary integration
-   JWT authentication and protected routes
-   MongoDB/Mongoose data modeling
-   React--Express REST API integration
-   CORS configuration
-   Vercel + Render deployment
-   Managing image URLs instead of storing files in MongoDB

### Important Design Decision

Images are stored in Cloudinary while MongoDB stores their secure URLs.
This avoids storing large binary files in the database and keeps the
database lightweight.

## 👩‍💻 Author

**Naina Shilpi**

B.Tech IT \| Full-Stack Developer \| DSA Enthusiast

GitHub: https://github.com/nainashilpi

