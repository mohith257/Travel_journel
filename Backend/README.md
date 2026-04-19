# Travel Journal Backend - MERN Project

This is the backend for the Travel Journal MERN application. It provides APIs for user authentication and travel entry management.

## Project Structure

```
Backend/
├── models/
│   ├── User.js          # User schema with email, name, password
│   └── Entry.js         # Entry schema with travel details
├── routes/
│   ├── authRoutes.js    # Authentication endpoints (signup, login)
│   └── entryRoutes.js   # Entry management endpoints
├── server.js            # Main Express server
├── .env                 # Environment configuration
└── package.json         # Project dependencies
```

## Features

### Authentication
- User signup with name, email, and password
- User login with email and password verification
- User profile retrieval

### Travel Entries
- Create new travel entries with title, date, description, and images
- Retrieve all entries for a specific user
- Get single entry by ID
- Search entries by title
- Update existing entries
- Delete entries

## Setup Instructions

### 1. Install Dependencies

```bash
cd Backend
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variable management
- `nodemon` - Auto-reload during development

### 2. Configure Environment

The `.env` file contains:
```
MONGODB_URI=mongodb://localhost:27017/travel-journal
PORT=5000
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

**Update MONGODB_URI** with your MongoDB connection string:
- For local MongoDB: `mongodb://localhost:27017/travel-journal`
- For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/travel-journal`

### 3. Start MongoDB

Make sure MongoDB is running:
```bash
# Windows (if MongoDB is installed)
mongod

# Or use MongoDB Atlas (cloud)
```

### 4. Run the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Signup
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: { user: { id, name, email } }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { user: { id, name, email } }
```

#### Get User
```
GET /api/auth/:userId
Response: { _id, name, email, createdAt, updatedAt }
```

### Entry Routes (`/api/entries`)

#### Create Entry
```
POST /api/entries
Content-Type: application/json

{
  "userId": "user_id_from_auth",
  "title": "Paris Trip",
  "date": "2024-04-19",
  "description": "Amazing experience in Paris...",
  "images": ["url1", "url2"],
  "location": { "lat": 48.8566, "lng": 2.3522 }
}

Response: { entry: { _id, userId, title, date, ... } }
```

#### Get User's Entries
```
GET /api/entries/user/:userId
Response: [{ _id, title, date, description, images, ... }]
```

#### Get Single Entry
```
GET /api/entries/:entryId
Response: { _id, title, date, description, images, userId, ... }
```

#### Search Entries
```
GET /api/entries/search/title/Paris
Response: [{ _id, title, ... }]
```

#### Update Entry
```
PUT /api/entries/:entryId
Content-Type: application/json

{
  "title": "Updated Title",
  "date": "2024-04-20",
  "description": "Updated description...",
  "images": ["new_url"]
}

Response: { message: "Entry updated successfully", entry: { ... } }
```

#### Delete Entry
```
DELETE /api/entries/:entryId
Response: { message: "Entry deleted successfully" }
```

## CORS Configuration

The backend is configured to accept requests from the frontend running on port 3000:

```javascript
cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
})
```

## Frontend Integration

The frontend has been updated to connect to this backend:

1. **API Service** (`src/services/api.js`) - Axios configured to call `http://localhost:5000/api`
2. **Authentication Pages** - Updated to use backend endpoints
3. **Entry Pages** - Updated to fetch/save data from MongoDB via backend
4. **User ID Storage** - Stored in localStorage after login/signup

## Running Both Frontend and Backend

### Terminal 1 - Backend
```bash
cd Backend
npm run dev
# Runs on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd Travel_journel/frontend
npm start
# Runs on http://localhost:3000
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Entry Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  date: Date,
  description: String,
  images: [String],
  location: {
    lat: Number,
    lng: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify database name is correct

### CORS Error
- Ensure backend is running on port 5000
- Check CORS origin settings in server.js
- Restart backend after changes

### Port Already in Use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac - Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

## Next Steps

1. Add JWT authentication for better security
2. Implement password hashing (bcrypt)
3. Add input validation middleware
4. Add error logging
5. Deploy to Heroku/Vercel
6. Connect image upload to cloud storage (AWS S3, Cloudinary)

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/travel-journal |
| PORT | Server port | 5000 |
| JWT_SECRET | JWT signing secret | your_secret_key |
| NODE_ENV | Environment | development, production |
