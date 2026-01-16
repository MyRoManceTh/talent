# 📦 Database Migration to Supabase

## ✅ What's been done:

1. ✅ Updated `.env` file with Supabase connection string
2. ✅ Generated SQL migration script: `supabase_migration.sql`
3. ✅ Backend is configured to use Supabase

## 🚀 Steps to Complete Migration:

### Step 1: Run SQL Script on Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Select your project: `rrldahlpropldndsgeke`
3. Navigate to **SQL Editor** (left sidebar)
4. Open the file `supabase_migration.sql` (located in `/home/user/webapp/backend/`)
5. Copy the entire SQL content
6. Paste it into the SQL Editor
7. Click **Run** button

### Step 2: Verify Database Connection

After running the SQL, your database will have:
- ✅ All tables (users, experts, seekers, consultations, etc.)
- ✅ All enums and types
- ✅ All indexes for performance
- ✅ All foreign key relationships

### Step 3: Test the Application

The backend is already configured with:

```env
DATABASE_URL=postgresql://postgres:TALENTER2026AA!!@db.rrldahlpropldndsgeke.supabase.co:5432/postgres
SUPABASE_URL=https://rrldahlpropldndsgeke.supabase.co
SUPABASE_KEY=sb_publishable_KMu1lOXkd_WVb6famqewlg_wcCpZQVe
```

## 📊 Database Schema Overview

### Core Tables:
- **users** - User authentication and basic info
- **experts** - Expert profiles with skills and experience
- **seekers** - Client/organization profiles
- **consultations** - Consultation requests and bookings
- **skills** - Skills catalog
- **industries** - Industries catalog
- **educations** - Expert education history
- **work_experiences** - Expert work history
- **achievements** - Expert achievements/portfolio
- **project_briefs** - Project intake forms

### Supporting Tables:
- **expert_skills** - Many-to-many: Experts ↔ Skills
- **expert_industries** - Many-to-many: Experts ↔ Industries
- **seeker_industries** - Many-to-many: Seekers ↔ Industries
- **matching_history** - AI matching analytics
- **password_resets** - Password reset tokens

## 🔧 Troubleshooting

### If SQL fails with "type already exists":
This means tables/types already exist. You can either:
1. Drop existing tables first (if safe)
2. Skip the error and continue

### If connection fails:
1. Check Supabase dashboard for project status
2. Verify password in `.env` file
3. Ensure database is not paused (free tier auto-pauses)

## 📝 Next Steps After Migration

1. **Data Migration** (if needed):
   - Export data from Railway
   - Import to Supabase using SQL INSERT statements

2. **Test Endpoints**:
   ```bash
   # Test health endpoint
   curl http://localhost:5000/health
   
   # Test database connection
   curl http://localhost:5000/api/auth/health
   ```

3. **Update Environment Variables** in production:
   - Update your deployment platform (Vercel, Netlify, etc.)
   - Use the same `DATABASE_URL` from `.env`

## 🎯 Benefits of Supabase

✅ **More Stable** - No connection resets like Railway
✅ **Better Free Tier** - 500MB database, 2GB bandwidth
✅ **Easy to Use** - Intuitive dashboard
✅ **Auto Backups** - Daily automated backups
✅ **Real-time** - Built-in real-time subscriptions (if needed)
✅ **Auth Support** - Optional: Can use Supabase Auth instead of JWT

## 🔐 Security Notes

- ⚠️ The publishable API key is safe for browser use (Row Level Security protected)
- 🔒 Database password should be kept secret
- 🛡️ Consider enabling Row Level Security (RLS) in Supabase for additional protection

## 📚 Useful Supabase Links

- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs
- SQL Editor: https://supabase.com/dashboard/project/rrldahlpropldndsgeke/sql

---

**Status**: ⏳ Waiting for SQL script to be run in Supabase Dashboard
**File Location**: `/home/user/webapp/backend/supabase_migration.sql`
