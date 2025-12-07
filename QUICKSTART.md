# Expert Connect - Quick Start Guide

Get Expert Connect running in 5 minutes! ⚡

## Prerequisites Check ✓

```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
psql --version  # Should be v14 or higher
```

Don't have them? Install:
- **Node.js**: https://nodejs.org/
- **PostgreSQL**: https://www.postgresql.org/download/

## Step-by-Step Setup

### 1️⃣ Database Setup (2 minutes)

```bash
# Start PostgreSQL (if not running)
# On macOS: brew services start postgresql
# On Ubuntu: sudo service postgresql start
# On Windows: Use Services app

# Create database
psql -U postgres -c "CREATE DATABASE expertconnect;"

# Verify
psql -U postgres -l | grep expertconnect
```

### 2️⃣ Backend Setup (2 minutes)

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env - REQUIRED CHANGES:
# 1. Update DATABASE_URL with your PostgreSQL credentials
# 2. Add your OPENAI_API_KEY (get from https://platform.openai.com/)

# Example .env:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/expertconnect"
# JWT_SECRET="your-random-secret-key-here"
# OPENAI_API_KEY="sk-your-key-here"

# Run database migrations
npx prisma generate
npx prisma migrate dev --name init

# Start backend server
npm run dev
```

**Expected Output:**
```
🚀 Expert Connect API is running on http://localhost:5000
📊 Health check: http://localhost:5000/health
```

### 3️⃣ Frontend Setup (1 minute)

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view expert-connect-frontend in the browser.

  Local:            http://localhost:3000
```

### 4️⃣ Verify Installation

Open your browser and test:

1. **Frontend**: http://localhost:3000
   - Should see landing page ✓

2. **Backend Health**: http://localhost:5000/health
   - Should see JSON response ✓

## Test the Platform 🧪

### Create an Expert Account

1. Go to http://localhost:3000/register
2. Fill in:
   - **Role**: Expert ⭐
   - Name, Email, Password
3. Click "Create Account"
4. You'll be redirected to Expert Dashboard

### Create a Seeker Account

1. **Open incognito/private window** (or use different browser)
2. Go to http://localhost:3000/register
3. Fill in:
   - **Role**: Seeker 🔍
   - Name, Email, Password
4. Click "Create Account"
5. You'll be redirected to Seeker Dashboard

### Test AI Matching (The Cool Part! 🤖)

You can test the AI matching engine directly via API:

```bash
# First, login as seeker and get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seeker@example.com",
    "password": "password123"
  }'

# Use the returned token in subsequent requests
# See docs/API.md for complete API documentation
```

## Common Issues & Quick Fixes 🔧

### ❌ "Database connection failed"
```bash
# Check if PostgreSQL is running
psql -U postgres -c "SELECT version();"

# If not running, start it
# macOS: brew services start postgresql
# Ubuntu: sudo service postgresql start
```

### ❌ "Port 5000 already in use"
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env
PORT=5001
```

### ❌ "OpenAI API error"
- Verify your API key is correct in `backend/.env`
- Check you have credits: https://platform.openai.com/usage
- Ensure you have access to GPT-4o model

### ❌ "Prisma Client not generated"
```bash
cd backend
npx prisma generate
```

## What's Next? 🚀

Now that everything is running:

1. **Explore the Features**:
   - Create expert profiles
   - Add work experience and skills
   - Create consultation requests
   - Test the AI matching

2. **Read the Documentation**:
   - `README.md` - Overview and features
   - `docs/SETUP.md` - Detailed setup guide
   - `docs/API.md` - Complete API reference
   - `docs/IMPLEMENTATION_SUMMARY.md` - Technical details

3. **Customize & Extend**:
   - Add more form fields
   - Customize UI/styling
   - Add new features
   - Deploy to production

## Quick Commands Reference

```bash
# Backend
cd backend
npm run dev          # Start development server
npx prisma studio    # Open database GUI
npx prisma migrate   # Run migrations

# Frontend  
cd frontend
npm start            # Start development server
npm run build        # Build for production

# Database
psql -U postgres expertconnect  # Connect to database
```

## Getting Help 💬

- Check `docs/SETUP.md` for troubleshooting
- Review `docs/API.md` for API usage
- Check server logs in `backend/logs/`
- Look at browser console for frontend errors

## System Check ✅

Everything working if you can:
- [ ] Access http://localhost:3000 (frontend)
- [ ] Access http://localhost:5000/health (backend)
- [ ] Register new users
- [ ] Login successfully
- [ ] View dashboards

**Congratulations! Your Expert Connect platform is ready! 🎉**

---

**Quick Links:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health: http://localhost:5000/health
- Database GUI: Run `npx prisma studio` from backend folder

For detailed information, see the full documentation in the `docs/` folder.
