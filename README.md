# Travel Journal - MERN Stack Project

A full-stack MERN (MongoDB, Express, React, Node.js) application demonstrating modern web development practices with user authentication, data persistence, and a responsive frontend.

---

## 📋 Tech Stack

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for building RESTful APIs
- **MongoDB** - NoSQL database for document storage
- **Mongoose** - MongoDB object modeling and schema validation
- **Cors** - Cross-Origin Resource Sharing middleware
- **Dotenv** - Environment variable management
- **Nodemon** - Development server with auto-reload

### **Frontend**
- **React 19** - Modern UI library with hooks and functional components
- **React Router DOM** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **React Icons** - Icon library integration
- **CSS3** - Styling and responsive design

---

## 🏗️ Database Schema

### **User Model**
```javascript
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);
```

**Key Features:**
- Email validation with regex pattern matching
- Unique email constraint to prevent duplicate accounts
- Automatic timestamps (createdAt, updatedAt)
- Password minlength validation

---

### **Entry Model**
```javascript
const entrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // URL or base64 string
      },
    ],
    location: {
      lat: {
        type: Number,
        default: 0,
      },
      lng: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);
```

**Key Features:**
- One-to-Many relationship: One User can have multiple Entries
- ObjectId reference to User collection
- Geolocation support with latitude and longitude
- Image array for multiple travel photos
- Auto-timestamping for creation/modification tracking

---

## 🔌 Backend Architecture

### **Server Configuration**
```javascript
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// CORS Configuration for frontend running on port 3000
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/entries", require("./routes/entryRoutes"));
```

---

## 🛣️ API Endpoints

### **Authentication Routes** (`/api/auth`)
- `POST /signup` - User registration
- `POST /login` - User authentication
- `POST /logout` - User session termination

### **Entry Routes** (`/api/entries`)
- `GET /` - Fetch all entries for logged-in user
- `GET /:id` - Fetch specific entry details
- `POST /` - Create new travel journal entry
- `PUT /:id` - Update existing entry
- `DELETE /:id` - Delete entry

---

## 📦 Project Structure

```
Travel_journel/
├── Backend/
│   ├── models/
│   │   ├── User.js          (MongoDB User schema)
│   │   └── Entry.js         (MongoDB Entry schema)
│   ├── routes/
│   │   ├── authRoutes.js    (Authentication endpoints)
│   │   └── entryRoutes.js   (Journal entry endpoints)
│   ├── server.js            (Express server setup)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── EntryCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── CreateEntry.jsx
│   │   │   ├── ViewEntry.jsx
│   │   │   └── Welcome.jsx
│   │   ├── services/
│   │   │   └── api.js       (Axios instance & API calls)
│   │   ├── styles/
│   │   └── App.js           (Root component with routing)
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v14+)
- MongoDB (local or Atlas connection string)
- npm or yarn package manager

### **Environment Variables**
Create a `.env` file in the Backend folder:
```
MONGODB_URI=mongodb://localhost:27017/travel-journal
PORT=5000
```

### **Backend Setup**
```bash
cd Backend
npm install
npm run dev
```
Server runs on `http://localhost:5000`

### **Frontend Setup**
```bash
cd frontend
npm install
npm start
```
App runs on `http://localhost:3000`

---

## 🔄 Data Flow

1. **User Registration/Login** → Express validates credentials → MongoDB stores/retrieves user
2. **Create Entry** → React form → Axios POST request → Express API → Mongoose saves Entry → MongoDB
3. **Fetch Entries** → React component → Axios GET → Express retrieves with user ID filter → MongoDB query → JSON response → React renders
4. **Update/Delete** → Same flow with PUT/DELETE methods

---

## 🛠️ Development Workflow

### **Branching Strategy**
- Always create branches from `dev` branch
- Branch naming: `feature/your-name` or `bugfix/issue-description`
- Open Pull Request into `dev` when complete
- Require one teammate review before merging
- **Never push directly to `main`**

### **Running Development Servers**
```bash
# Terminal 1 - Backend
cd Backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start
```

---

## 💡 Key Technologies Explained

- **MongoDB + Mongoose** - Flexible schema validation with automatic relationship management
- **Express Middleware** - CORS for cross-origin requests, JSON parsing for request bodies
- **React Router** - Client-side navigation without page reloads
- **Axios Interceptors** - Centralized API communication with error handling
