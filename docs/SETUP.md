# Expert Connect - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v14 or higher)
- **OpenAI API Key** (for AI matching engine)

## Initial Setup

### 1. Clone and Install Dependencies

```bash
# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

### 2. Database Setup

#### Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE expertconnect;

# Create user (optional)
CREATE USER expertconnect_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE expertconnect TO expertconnect_user;

# Exit
\q
```

#### Configure Database URL

Create `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and update the DATABASE_URL:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/expertconnect
```

### 3. Environment Variables

#### Backend (.env)

Update the following in `backend/.env`:

```env
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/expertconnect

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# OpenAI (Required for AI matching)
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4o

# CORS
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env)

Create `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Migration

Run Prisma migrations to create database tables:

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

## Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend API will be available at `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend in Production

```bash
cd backend
npm start
```

## Testing the Setup

1. **Health Check**: Visit `http://localhost:5000/health` - should return success message
2. **Frontend**: Visit `http://localhost:3000` - should show landing page
3. **Register**: Create a new account (both Expert and Seeker)
4. **Login**: Test authentication

## Common Issues and Solutions

### Issue: Database Connection Error

**Solution**: 
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in `.env` is correct
- Ensure database exists: `psql -l`

### Issue: Prisma Client Not Generated

**Solution**:
```bash
cd backend
npx prisma generate
```

### Issue: Port Already in Use

**Solution**:
- Change PORT in `backend/.env`
- Or kill process using the port:
  ```bash
  # Find process
  lsof -i :5000
  # Kill process
  kill -9 <PID>
  ```

### Issue: OpenAI API Error

**Solution**:
- Verify OPENAI_API_KEY is correct in `.env`
- Check API key has sufficient credits
- Ensure you have access to GPT-4o model

### Issue: CORS Error

**Solution**:
- Verify CORS_ORIGIN in backend `.env` matches frontend URL
- Check frontend proxy setting in `frontend/package.json`

## Directory Structure

```
expert-connect/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/             # Database models
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   │   └── ai/             # AI matching engine
│   │   ├── utils/              # Utility functions
│   │   └── server.js           # Entry point
│   ├── .env                    # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── contexts/           # React contexts
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── App.js              # Main app component
│   │   └── index.js            # Entry point
│   ├── public/
│   └── package.json
└── docs/
    └── SETUP.md                # This file
```

## Next Steps

After successful setup:

1. Complete expert profile with education, experience, skills
2. Create a consultation request as a seeker
3. Test AI matching functionality
4. Review matched experts and send connection requests

## Support

For issues or questions:
- Check the main README.md
- Review API documentation
- Check console/server logs for error messages

## Additional Configuration

### Email Notifications (Optional)

To enable email notifications, add to `backend/.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Vector Database (Optional - for advanced semantic search)

If using Pinecone or Weaviate:

```env
VECTOR_DB_TYPE=pinecone
VECTOR_DB_URL=https://your-index.pinecone.io
VECTOR_DB_API_KEY=your-api-key
VECTOR_DB_INDEX=expert-profiles
```

## Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a strong, random value
- [ ] Update all default passwords
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Review and restrict CORS_ORIGIN
- [ ] Enable rate limiting
- [ ] Set up proper logging
- [ ] Configure database backups
- [ ] Review and update security headers
- [ ] Implement proper error handling (no stack traces in production)

## Performance Optimization

For production deployment:

1. Enable database connection pooling
2. Implement Redis caching for frequent queries
3. Set up CDN for static assets
4. Enable gzip compression
5. Optimize database queries and add indexes
6. Implement API rate limiting
7. Use PM2 or similar for process management
