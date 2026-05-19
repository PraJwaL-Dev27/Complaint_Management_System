# AI-Based Smart Complaint Management System

A modern, production-ready complaint management platform powered by AI, built with the MERN stack (MongoDB, Express, React, Node.js).

## 🌟 Features

### For Citizens
- **Easy Complaint Registration**: Simple form to submit complaints with multiple categories
- **AI-Powered Analysis**: Automatic complaint analysis for priority detection and department routing
- **Real-time Tracking**: Monitor your complaint status in real-time
- **Beautiful Dashboard**: Modern, responsive interface with real-time updates
- **Mobile Friendly**: Fully responsive design for all devices

### For Administrators
- **Complete Dashboard**: Overview of all complaints with analytics
- **Advanced Filtering**: Search and filter complaints by multiple criteria
- **Status Management**: Update complaint status and track progress
- **Analytics & Charts**: Visual insights into complaint categories and priorities
- **AI Insights**: View AI-generated analysis for each complaint

### AI Features
- **Smart Priority Detection**: Automatically detects complaint urgency (Low/Medium/High/Critical)
- **Department Routing**: AI recommends the appropriate government department
- **Sentiment Analysis**: Analyzes the sentiment of complaints
- **Auto-Generated Summaries**: Creates concise summaries of complaints
- **Confidence Scoring**: Provides confidence score for AI analysis

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **React Icons** - Icon library
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Multer** - File uploads
- **OpenRouter AI API** - AI analysis

### Deployment
- **Frontend**: Vercel/Render
- **Backend**: Render
- **Database**: MongoDB Atlas

## 📁 Project Structure

```
Complaint_Management_System/
├── server/                    # Backend
│   ├── controllers/          # Route handlers
│   ├── routes/               # API routes
│   ├── middleware/           # Auth, error handling
│   ├── models/               # MongoDB schemas
│   ├── config/               # Database config
│   ├── services/             # Business logic (AI service)
│   ├── validators/           # Input validation
│   ├── utils/                # Helper functions
│   ├── index.js              # Server entry point
│   ├── package.json
│   └── .env.example
│
└── client/                    # Frontend
    ├── src/
    │   ├── components/       # Reusable components
    │   ├── pages/            # Page components
    │   ├── layouts/          # Layout wrapper
    │   ├── routes/           # Route protection
    │   ├── hooks/            # Custom hooks
    │   ├── context/          # React Context
    │   ├── services/         # API services
    │   ├── utils/            # Utilities
    │   ├── assets/           # Static files
    │   ├── index.css         # Global styles
    │   ├── App.jsx           # App component
    │   └── main.jsx          # Entry point
    ├── public/               # Public files
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── .env.example
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- OpenRouter API key
- Git

### Installation

#### 1. Backend Setup

```bash
cd server
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/complaint_db?retryWrites=true&w=majority
JWT_SECRET=your_very_long_and_secure_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

#### 2. Frontend Setup

```bash
cd client
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃 Running the Project

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
App runs on `http://localhost:3000`

### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## 📚 API Documentation

### Authentication Routes

#### Signup
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "avatar_url"
  }
}
```

#### Get Profile
```
GET /api/auth/profile
Authorization: Bearer {token}
```

### Complaint Routes

#### Create Complaint
```
POST /api/complaints
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "title": "Water Leakage in Main Street",
  "description": "There's a water leakage in the main water pipe...",
  "category": "Water Supply",
  "location": "Main Street, Downtown"
}
```

#### Get All Complaints (with filters)
```
GET /api/complaints?status=Pending&category=Water%20Supply&priority=High&page=1&limit=10&search=water
Authorization: Bearer {token}
```

#### Get Single Complaint
```
GET /api/complaints/:id
Authorization: Bearer {token}
```

#### Update Complaint (Admin only)
```
PUT /api/complaints/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "In Progress"
}
```

#### Delete Complaint
```
DELETE /api/complaints/:id
Authorization: Bearer {token}
```

#### Get Statistics
```
GET /api/complaints/stats/overview
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "total": 150,
    "pending": 45,
    "inProgress": 32,
    "resolved": 70,
    "categoryStats": [...],
    "priorityStats": [...]
  }
}
```

### AI Routes

#### Analyze Complaint with AI
```
POST /api/ai/analyze
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Water Leakage",
  "description": "There's water leaking from the main pipe...",
  "category": "Water Supply"
}

Response:
{
  "success": true,
  "data": {
    "urgencyLevel": "High",
    "department": "Water Department",
    "summary": "Customer reports water leakage from main supply pipe...",
    "autoResponse": "Your complaint has been registered and assigned...",
    "sentiment": "Negative",
    "confidence": 92
  }
}
```

## 🗄️ MongoDB Schemas

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  avatar: String,
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
}
```

### Complaint Schema
```javascript
{
  userId: ObjectId (reference to User),
  name: String,
  email: String,
  title: String,
  description: String,
  category: String,
  location: String,
  status: String (Pending/Under Review/In Progress/Resolved/Closed),
  priority: String (Low/Medium/High/Critical),
  attachments: [String],
  aiAnalysis: {
    summary: String,
    department: String,
    autoResponse: String,
    sentiment: String,
    confidence: Number,
    urgencyLevel: String
  },
  activityLog: [{
    action: String,
    timestamp: Date,
    details: String
  }],
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
}
```

## 🌐 Environment Variables

### Server (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Protected Routes**: Both frontend and backend route protection
- **Input Validation**: Express-validator for data validation
- **Role-based Access Control**: User and Admin roles
- **CORS**: Cross-Origin Resource Sharing protection
- **Environment Variables**: Sensitive data management

## 📊 Dashboard Features

### User Dashboard
- Complaint statistics
- Recent complaints list
- Quick action buttons
- AI insights preview

### Admin Dashboard
- System-wide statistics
- Charts and analytics
  - Complaints by category (Pie Chart)
  - Complaints by priority (Bar Chart)
- Complete complaints table
- Advanced filtering options
- Status management

## 🎨 UI/UX Features

- **Modern Design**: Gradient backgrounds, glassmorphism cards
- **Dark Mode**: Automatic dark/light mode toggle
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: Framer Motion animations
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback

## 📱 Responsive Breakpoints

- Mobile: 320px - 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

## 🚀 Deployment Guide

### Deploy Backend on Render

1. Push code to GitHub
2. Go to Render.com and create new Web Service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Deploy Frontend on Vercel

1. Push code to GitHub
2. Go to Vercel.com and import project
3. Set environment variables
4. Deploy automatically

### MongoDB Atlas Setup

1. Create account on MongoDB Atlas
2. Create a cluster
3. Create database user
4. Get connection string
5. Add to .env file

## 🧪 Testing

### User Demo Credentials
```
Email: demo@example.com
Password: 123456
Role: user
```

### Admin Demo Credentials
```
Email: admin@example.com
Password: 123456
Role: admin
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- Multi-language support
- Email notifications
- SMS alerts
- File uploads with virus scanning
- Advanced analytics dashboard
- API rate limiting
- Caching with Redis
- Real-time notifications with Socket.io
- Social media integration
- Complaint escalation system
- Feedback system
- Integration with payment gateways
- Mobile app (React Native)
- Machine learning for better predictions

## 🐛 Known Issues

- None currently known. Please report any issues!

## 📞 Support

For support, email: support@complainai.com or create an issue in the repository.

## 🙏 Acknowledgments

- OpenRouter AI for AI analysis capabilities
- MongoDB for database solutions
- Render for hosting
- Vercel for frontend deployment
- All contributors and users

---

Built with ❤️ using MERN Stack + AI
