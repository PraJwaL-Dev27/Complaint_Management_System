# Setup Guide

## Initial Project Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd Complaint_Management_System
```

### 2. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

## Environment Configuration

### Backend Configuration

1. Create `.env` file in `server/` directory:
```bash
cp server/.env.example server/.env
```

2. Edit `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/complaint_db?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_make_it_very_long_and_secure
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### Frontend Configuration

1. Create `.env` file in `client/` directory:
```bash
cp client/.env.example client/.env
```

2. Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## Database Setup

### MongoDB Atlas

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up
   - Create organization

2. **Create Cluster**
   - Click "Create a Deployment"
   - Select "Shared" (Free tier)
   - Choose region closest to you
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `admin` (or your choice)
   - Password: Choose strong password
   - Click "Create User"

4. **Get Connection String**
   - Go to "Databases"
   - Click "Connect" on your cluster
   - Select "Drivers"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `<username>` if needed
   - Replace `myFirstDatabase` with `complaint_db`

5. **Allow Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: Add `0.0.0.0/0`
   - For production: Add specific IPs

### Local MongoDB (Alternative)

If using local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/complaint_db
```

Ensure MongoDB is running:
```bash
# On Windows
mongod

# On macOS
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

## API Keys Setup

### OpenRouter API Key

1. **Create Account**
   - Go to https://openrouter.ai
   - Sign up
   - Go to dashboard

2. **Get API Key**
   - Click "API Keys"
   - Create new key
   - Copy the key
   - Add to `.env` as `OPENROUTER_API_KEY`

3. **Add Credits**
   - Go to Billing
   - Add payment method
   - Add credits

## Running the Project

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB Connected: cluster0.mongodb.net
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Expected output:
```
  VITE v4.4.0  ready in 123 ms

  ➜  Local:   http://localhost:3000/
```

### Test the Application

1. Open http://localhost:3000
2. Click "Sign Up"
3. Create account with credentials:
   - Name: Test User
   - Email: test@example.com
   - Password: 123456

4. Test features:
   - Register complaint
   - View dashboard
   - Check complaint list
   - View complaint details

## Verification Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads on localhost:3000
- [ ] Can create account
- [ ] Can login
- [ ] Can register complaint
- [ ] AI analysis works
- [ ] Dashboard shows statistics
- [ ] Can view complaint details
- [ ] Dark mode toggle works
- [ ] Responsive design works on mobile

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running
- Check connection string in .env
- Verify database name is correct

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```

**Solution:**
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### AI Analysis Not Working
```
Error: 401 Unauthorized
```

**Solution:**
- Check OpenRouter API key is correct
- Verify API key is added to environment
- Ensure you have credits
- Restart backend after adding API key

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Verify backend is running
- Check API URL in frontend .env
- Ensure frontend API URL matches backend

### Frontend Not Connecting to Backend
**Solution:**
- Check VITE_API_URL in client/.env
- Ensure backend is running on port 5000
- Check browser console for actual error
- Verify backend CORS settings

## Next Steps

1. **Configure Additional Features**
   - Email notifications
   - SMS alerts
   - File uploads

2. **Set Up CI/CD**
   - GitHub Actions
   - Automated tests
   - Code coverage

3. **Performance Optimization**
   - Enable caching
   - Optimize database queries
   - Code splitting

4. **Production Deployment**
   - Follow DEPLOYMENT.md
   - Set up monitoring
   - Configure backups

## Commands Reference

### Backend Commands
```bash
# Development with auto-reload
npm run dev

# Production build
npm start

# Just run
node index.js
```

### Frontend Commands
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Build for specific environment
npm run build -- --mode production
```

## Project Structure Reference

```
Complaint_Management_System/
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── complaintController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── complaintRoutes.js
│   │   └── aiRoutes.js
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── services/
│   │   └── aiService.js
│   ├── index.js
│   └── package.json
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── context/
    │   ├── hooks/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## Support

For issues or questions:
1. Check this setup guide
2. Review README.md
3. Check DEPLOYMENT.md
4. Create an issue in GitHub
5. Contact support

---

Happy coding! 🚀
