# Deployment Guide

## Backend Deployment on Render

### Step 1: Prepare Your Code
```bash
cd server
npm install
```

### Step 2: Create Render Account
1. Go to render.com
2. Sign up with GitHub account
3. Connect your GitHub repository

### Step 3: Create Web Service on Render
1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub repo
4. Configure:
   - Name: `complaint-management-api`
   - Region: Choose closest to you
   - Branch: `main`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

### Step 4: Add Environment Variables
In Render dashboard, add:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_long_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
OPENROUTER_API_KEY=your_api_key
```

### Step 5: Deploy
Click "Deploy" button. Render will automatically deploy when you push to main.

## Frontend Deployment on Vercel

### Step 1: Prepare Code
```bash
cd client
npm install
```

### Step 2: Create Vercel Account
1. Go to vercel.com
2. Sign up with GitHub
3. Connect repository

### Step 3: Import Project
1. Click "New Project"
2. Import GitHub repository
3. Select `client` folder as root directory

### Step 4: Configure Build
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Step 5: Add Environment Variables
```
VITE_API_URL=https://your-render-backend-url/api
```

### Step 6: Deploy
Click "Deploy". Vercel will auto-deploy on git push.

## MongoDB Atlas Setup

### Step 1: Create Account
1. Go to mongodb.com/cloud/atlas
2. Sign up
3. Create organization

### Step 2: Create Cluster
1. Click "Create a Deployment"
2. Select "Shared" (Free tier)
3. Select Region (closest to you)
4. Click "Create Cluster"

### Step 3: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Set username and password
4. Add to all databases

### Step 4: Get Connection String
1. Go to "Databases"
2. Click "Connect" on cluster
3. Choose "Drivers"
4. Copy connection string
5. Replace `<password>` with your password

### Step 5: Add IP to Whitelist
1. Go to "Network Access"
2. Click "Add IP Address"
3. Add "0.0.0.0/0" for development
4. For production, add Render's IP

## Domain Setup

### Using Render with Custom Domain
1. In Render dashboard, go to Settings
2. Add Custom Domain
3. Update DNS records with provided values

### Using Vercel with Custom Domain
1. In Vercel dashboard, go to Settings
2. Add Domain
3. Update DNS records

## Local Development

### Start Backend
```bash
cd server
npm install
npm run dev
# Runs on http://localhost:5000
```

### Start Frontend
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:3000
```

## Environment Variable Checklist

### Backend
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] JWT_EXPIRE
- [ ] NODE_ENV
- [ ] PORT
- [ ] OPENROUTER_API_KEY

### Frontend
- [ ] VITE_API_URL

## Troubleshooting

### Backend Not Connecting to Database
- Check MongoDB connection string
- Verify IP is whitelisted in MongoDB Atlas
- Check username and password

### Frontend Cannot Reach Backend
- Verify backend URL in .env
- Check CORS settings on backend
- Ensure backend is running

### AI Analysis Not Working
- Check OpenRouter API key
- Verify API key has sufficient credits
- Check API rate limits

## Monitoring

### Render Dashboard
- View logs in real-time
- Monitor resource usage
- Set up alerts

### MongoDB Atlas
- Monitor query performance
- Check replication status
- View database stats

## Performance Optimization

### Backend
- Enable caching
- Use pagination
- Add rate limiting
- Optimize database queries

### Frontend
- Code splitting
- Image optimization
- Lazy loading
- Minification

## Security Checklist

- [ ] Environment variables not committed
- [ ] JWT secret is long and random
- [ ] Password hashing enabled
- [ ] CORS properly configured
- [ ] Input validation active
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] MongoDB IP whitelisted

## Backup Strategy

### MongoDB Backup
1. Enable automatic backups in MongoDB Atlas
2. Set retention to 30 days
3. Test restore procedures

### Code Backup
- Push to GitHub regularly
- Tag releases
- Keep production branch protected

## Scaling

### Database Scaling
- Upgrade to larger MongoDB tier
- Enable sharding for large datasets
- Optimize indexes

### Application Scaling
- Use Render's auto-scaling
- Add load balancing
- Optimize API endpoints

---

For more help, visit: https://render.com/docs and https://vercel.com/docs
