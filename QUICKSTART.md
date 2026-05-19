# AI-Based Smart Complaint Management System - Quick Start

## 🚀 Quick Setup (5 minutes)

### Prerequisites
- Node.js v14+
- MongoDB Atlas account
- OpenRouter API key

### Step 1: Clone & Install
```bash
git clone <repo-url>
cd Complaint_Management_System

# Backend
cd server && npm install && cd ..

# Frontend
cd client && npm install && cd ..
```

### Step 2: Configure Environment
```bash
# Backend
cp server/.env.example server/.env
# Edit server/.env with your credentials

# Frontend
cp client/.env.example client/.env
```

### Step 3: Run
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

Visit http://localhost:3000

---

## 📋 Full Setup Checklist

- [ ] MongoDB Atlas account created
- [ ] Database user created with password
- [ ] Connection string copied to .env
- [ ] OpenRouter API key added to .env
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend running on :5000
- [ ] Frontend running on :3000
- [ ] Can create account
- [ ] Can login
- [ ] Can register complaint
- [ ] AI analysis working

---

## 🎯 Features to Try

1. **Landing Page**
   - Explore features
   - Read testimonials
   - View statistics

2. **Sign Up / Login**
   - Create new account
   - Or use demo credentials

3. **Dashboard**
   - View complaint statistics
   - See recent complaints
   - Create new complaint

4. **Register Complaint**
   - Fill complaint form
   - Click "Get AI Analysis"
   - Submit complaint

5. **View Complaints**
   - Search and filter
   - View details
   - Check AI insights

6. **Admin Dashboard** (if admin)
   - View all complaints
   - See analytics charts
   - Update complaint status

---

## 📱 Demo Credentials

**User:**
```
Email: demo@example.com
Password: 123456
Role: user
```

**Admin:**
```
Email: admin@example.com
Password: 123456
Role: admin
```

---

## 🆘 Troubleshooting

| Error | Solution |
|-------|----------|
| Cannot connect to MongoDB | Check connection string, ensure IP whitelisted |
| Port 5000 in use | `kill $(lsof -t -i:5000)` |
| AI analysis not working | Verify OpenRouter API key and credits |
| CORS error | Check API URL in frontend .env |

---

## 📚 Useful Links

- [README.md](./README.md) - Full documentation
- [SETUP.md](./SETUP.md) - Detailed setup guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [OpenRouter](https://openrouter.ai)
- [Render](https://render.com)
- [Vercel](https://vercel.com)

---

## 🚀 Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Backend deployment on Render
- Frontend deployment on Vercel
- MongoDB Atlas setup
- Domain configuration

---

## 📞 Support

- Check documentation files
- Review error messages carefully
- Check browser console
- Check server logs
- Create GitHub issue

---

**Happy coding! 🎉**
