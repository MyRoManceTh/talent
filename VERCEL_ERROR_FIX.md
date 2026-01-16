# 🔧 Fixing Vercel "FUNCTION_INVOCATION_FAILED" Error

## 🐛 Problem

Error message:
```
500: INTERNAL_SERVER_ERROR
Code: FUNCTION_INVOCATION_FAILED
ID: sin1::55q66-1768581634893-55e9eb7ad4ab
```

This error occurs when deploying Express.js backend to Vercel serverless functions.

---

## ✅ Solution Applied

### 1. **Updated package.json**
Added build scripts for Vercel:
```json
{
  "scripts": {
    "build": "prisma generate",
    "vercel-build": "prisma generate"
  }
}
```

### 2. **Created Serverless Handler**
Created `backend/api/index.js`:
```javascript
// Vercel Serverless Function Handler
const app = require('../src/server');
module.exports = app;
```

### 3. **Updated vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["src/**", "prisma/**"]
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ],
  "functions": {
    "api/index.js": {
      "maxDuration": 30,
      "memory": 1024
    }
  }
}
```

### 4. **Fixed server.js**
Modified to support both serverless and traditional deployment:
```javascript
// Start server (only in non-serverless environment)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    // ...
  });
}

// Export for Vercel serverless
module.exports = app;
```

---

## 🚀 Deployment Steps

### Step 1: Push Changes to GitHub
```bash
cd /home/user/webapp
git add -A
git commit -m "fix: Update backend for Vercel serverless deployment"
git push origin genspark_ai_developer_intake_brief
```

### Step 2: Redeploy on Vercel

**Option A: Auto Deploy (if connected to GitHub)**
- Vercel will auto-deploy when you push to GitHub

**Option B: Manual Deploy**
```bash
cd /home/user/webapp/backend
npx vercel --prod
```

### Step 3: Set Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add these variables:

```env
DATABASE_URL=postgresql://postgres.xxxxx:TALENTER2026AA!!@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
SUPABASE_URL=https://rrldahlpropldndsgeke.supabase.co
SUPABASE_KEY=sb_publishable_KMu1lOXkd_WVb6famqewlg_wcCpZQVe
JWT_SECRET=expert-connect-secret-key-2024-production-ready
JWT_EXPIRE=7d
NODE_ENV=production
```

### Step 4: Redeploy After Setting Environment Variables

In Vercel Dashboard:
1. Go to **Deployments**
2. Click the **3 dots** on the latest deployment
3. Click **Redeploy**

---

## 🧪 Testing After Fix

### Test Backend Health Check
```bash
curl https://your-backend-url.vercel.app/health
```

Expected response:
```json
{
  "success": true,
  "message": "Expert Connect API is running",
  "timestamp": "2026-01-16T..."
}
```

### Test API Endpoint
```bash
curl https://your-backend-url.vercel.app/api/auth/health
```

---

## 📊 View Logs

### Option 1: Vercel Dashboard
1. Go to your project
2. Click **Deployments**
3. Click on the deployment
4. View **Function Logs**

### Option 2: Vercel CLI
```bash
npx vercel logs your-project-name --follow
```

---

## 🔍 Common Issues & Solutions

### Issue 1: Prisma Client Not Generated
**Error:** `Cannot find module '@prisma/client'`

**Solution:**
- Ensure `vercel-build` script runs `prisma generate`
- Check build logs to confirm Prisma generation

### Issue 2: Database Connection Failed
**Error:** `Can't reach database server`

**Solution:**
- Use Connection Pooling URL (port 6543)
- Verify `DATABASE_URL` is correct
- Add `?pgbouncer=true` to connection string

### Issue 3: Environment Variables Not Set
**Error:** Various errors related to undefined variables

**Solution:**
- Set ALL required environment variables in Vercel Dashboard
- Select correct environment (Production/Preview/Development)
- Redeploy after setting variables

### Issue 4: CORS Error from Frontend
**Error:** `Access to fetch blocked by CORS policy`

**Solution:**
- Add `CORS_ORIGIN` environment variable with frontend URL
- Add `FRONTEND_URL` environment variable
- Redeploy backend

---

## 📁 File Structure After Fix

```
backend/
├── api/
│   └── index.js           # ✨ NEW: Vercel serverless handler
├── src/
│   ├── server.js          # ✅ UPDATED: Serverless-friendly
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── prisma/
│   └── schema.prisma
├── package.json           # ✅ UPDATED: Added build scripts
├── vercel.json           # ✅ UPDATED: New configuration
└── .vercelignore
```

---

## ✅ Verification Checklist

- [ ] `api/index.js` created
- [ ] `server.js` updated for serverless
- [ ] `package.json` has build scripts
- [ ] `vercel.json` updated
- [ ] Changes committed to git
- [ ] Changes pushed to GitHub
- [ ] Environment variables set in Vercel
- [ ] Redeployed on Vercel
- [ ] Health check passes
- [ ] No errors in Function Logs

---

## 🆘 Still Having Issues?

### Check Build Logs
1. Vercel Dashboard → Deployments
2. Click on the deployment
3. View **Build Logs**
4. Look for errors in:
   - Install phase
   - Build phase
   - Output phase

### Check Function Logs
1. Vercel Dashboard → Deployments
2. Click on the deployment
3. View **Function Logs**
4. Look for runtime errors

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot find module` | Missing dependency | Check package.json |
| `ECONNREFUSED` | Database connection | Check DATABASE_URL |
| `Unauthorized` | Missing JWT_SECRET | Set environment variable |
| `Timeout` | Function too slow | Increase maxDuration |
| `Memory exceeded` | Memory limit | Increase memory limit |

---

## 📚 Additional Resources

- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Deploying Express.js](https://vercel.com/guides/using-express-with-vercel)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🎉 Success!

After following these steps, your backend should be deployed successfully on Vercel! 🚀

If you continue to see errors, check the Function Logs in Vercel Dashboard for specific error messages.
