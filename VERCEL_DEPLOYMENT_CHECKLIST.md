# ✅ Vercel Deployment Checklist

## 📋 Pre-Deployment Checklist

### 🗄️ Database Setup
- [ ] Supabase account สร้างแล้ว
- [ ] Supabase project สร้างแล้ว
- [ ] SQL Schema ถูก deploy แล้ว (รัน `supabase_migration.sql`)
- [ ] Database connection ทดสอบแล้ว
- [ ] มี Database credentials:
  - [ ] `DATABASE_URL` (Connection Pooling)
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_KEY`

### 🔐 Authentication & Security
- [ ] JWT_SECRET กำหนดแล้ว (แนะนำ: random string 64 characters)
- [ ] JWT_EXPIRE กำหนดแล้ว (แนะนำ: 7d หรือ 30d)
- [ ] OpenAI API Key เตรียมแล้ว (optional)
- [ ] Email credentials เตรียมแล้ว (optional, สำหรับ password reset)

### 👤 Vercel Account
- [ ] Vercel account สร้างแล้ว (https://vercel.com/signup)
- [ ] เชื่อมต่อกับ GitHub account แล้ว
- [ ] ทราบ Vercel username/team name

### 💻 Development Environment
- [ ] Node.js v18+ ติดตั้งแล้ว
- [ ] npm หรือ yarn ติดตั้งแล้ว
- [ ] Git repository พร้อมใช้งาน
- [ ] Code อัปเดตล่าสุดแล้ว

---

## 🖥️ Backend Deployment Checklist

### Preparation
- [ ] ตรวจสอบ `backend/vercel.json` มีอยู่
- [ ] ตรวจสอบ `backend/.vercelignore` มีอยู่
- [ ] ตรวจสอบ `backend/package.json` มี scripts:
  - [ ] `"start": "node src/server.js"`
  - [ ] `"build": "prisma generate"`
- [ ] ตรวจสอบ `backend/prisma/schema.prisma` ถูกต้อง

### Deployment
- [ ] Login เข้า Vercel: `npx vercel login`
- [ ] Deploy backend: `cd backend && npx vercel --prod`
- [ ] Project name: `expert-connect-backend` (หรือชื่อที่ต้องการ)
- [ ] Deployment สำเร็จ
- [ ] บันทึก Backend URL: `https://__________________.vercel.app`

### Environment Variables
ตั้งค่าใน Vercel Dashboard → Settings → Environment Variables:

**Required:**
- [ ] `DATABASE_URL` ← Connection Pooling URL
- [ ] `SUPABASE_URL` ← Project URL
- [ ] `SUPABASE_KEY` ← Publishable API Key
- [ ] `JWT_SECRET` ← Random secret string
- [ ] `JWT_EXPIRE` ← Token expiration (e.g., 7d)
- [ ] `NODE_ENV` ← production

**Optional:**
- [ ] `OPENAI_API_KEY` ← สำหรับ AI features
- [ ] `EMAIL_HOST` ← SMTP host (e.g., smtp.gmail.com)
- [ ] `EMAIL_PORT` ← SMTP port (e.g., 587)
- [ ] `EMAIL_USER` ← Email username
- [ ] `EMAIL_PASS` ← Email password/app password
- [ ] `EMAIL_FROM_NAME` ← Sender name

### Post-Deployment
- [ ] Redeploy หลังตั้งค่า Environment Variables
- [ ] ทดสอบ Health Check: `curl https://[backend-url]/health`
- [ ] ทดสอบ API: `curl https://[backend-url]/api/auth/health`
- [ ] ตรวจสอบ Logs: `npx vercel logs expert-connect-backend`
- [ ] ไม่มี errors ใน logs

---

## 🎨 Frontend Deployment Checklist

### Preparation
- [ ] ตรวจสอบ `frontend/vercel.json` มีอยู่
- [ ] ตรวจสอบ `frontend/.vercelignore` มีอยู่
- [ ] สร้างไฟล์ `frontend/.env.production`:
  ```
  REACT_APP_API_URL=https://[backend-url].vercel.app
  ```
- [ ] ตรวจสอบ `frontend/package.json` มี scripts:
  - [ ] `"build": "react-scripts build"`
  - [ ] `"start": "react-scripts start"`

### Deployment
- [ ] Deploy frontend: `cd frontend && npx vercel --prod`
- [ ] Project name: `expert-connect-frontend` (หรือชื่อที่ต้องการ)
- [ ] Deployment สำเร็จ
- [ ] บันทึก Frontend URL: `https://__________________.vercel.app`

### Environment Variables
ตั้งค่าใน Vercel Dashboard → Settings → Environment Variables:

**Required:**
- [ ] `REACT_APP_API_URL` ← Backend URL (https://[backend-url].vercel.app)

### Post-Deployment
- [ ] Redeploy หลังตั้งค่า Environment Variables
- [ ] เปิดเบราว์เซอร์: `https://[frontend-url].vercel.app`
- [ ] หน้าเว็บโหลดได้
- [ ] ไม่มี Console Errors (F12)
- [ ] ทดสอบ Register/Login

---

## 🔄 CORS Configuration Checklist

### Update Backend CORS
- [ ] เพิ่ม Frontend URL ใน Backend Environment Variables:
  - [ ] `FRONTEND_URL=https://[frontend-url].vercel.app`
  - [ ] `CORS_ORIGIN=https://[frontend-url].vercel.app`
- [ ] Redeploy Backend
- [ ] ทดสอบ API call จาก Frontend

### Verify CORS Settings
- [ ] ตรวจสอบ `backend/src/server.js`:
  ```javascript
  const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  };
  app.use(cors(corsOptions));
  ```
- [ ] Redeploy หากแก้ไข

---

## 🧪 Testing Checklist

### Backend API Testing
- [ ] Health Check:
  ```bash
  curl https://[backend-url]/health
  # Expected: {"success":true,"message":"..."}
  ```
- [ ] Register User:
  ```bash
  curl -X POST https://[backend-url]/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"Test123!","firstName":"Test","lastName":"User","role":"EXPERT"}'
  # Expected: 201 Created
  ```
- [ ] Login:
  ```bash
  curl -X POST https://[backend-url]/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"Test123!"}'
  # Expected: 200 OK with token
  ```

### Frontend Testing
- [ ] หน้าแรกโหลดได้
- [ ] หน้า Register ทำงาน
- [ ] หน้า Login ทำงาน
- [ ] หน้า Dashboard ทำงาน (หลัง login)
- [ ] API calls สำเร็จ
- [ ] ไม่มี Console Errors
- [ ] ไม่มี CORS Errors
- [ ] Loading states ทำงาน
- [ ] Error messages แสดงถูกต้อง

### Database Testing
- [ ] User registration สร้าง record ใน database
- [ ] Login authentication ทำงาน
- [ ] Data persistence ทำงาน
- [ ] Relations/Joins ทำงาน

---

## 📊 Monitoring & Maintenance Checklist

### Logs Monitoring
- [ ] ตรวจสอบ Backend logs:
  ```bash
  npx vercel logs expert-connect-backend --follow
  ```
- [ ] ตรวจสอบ Frontend logs:
  ```bash
  npx vercel logs expert-connect-frontend --follow
  ```
- [ ] ตั้งค่า log alerts ใน Vercel Dashboard
- [ ] ไม่มี errors ซ้ำๆ

### Performance Monitoring
- [ ] เปิด Vercel Analytics
- [ ] ตรวจสอบ Response Times
- [ ] ตรวจสอบ Cold Start Times
- [ ] ตรวจสอบ Error Rate

### Database Monitoring
- [ ] ตรวจสอบ Database connections
- [ ] ตรวจสอบ Query performance
- [ ] ตั้งค่า connection pooling
- [ ] Monitor storage usage

---

## 🔐 Security Checklist

### Credentials
- [ ] JWT_SECRET ไม่ถูก expose
- [ ] Database password ปลอดภัย
- [ ] API keys ไม่อยู่ใน code
- [ ] Environment Variables ตั้งค่าใน Vercel Dashboard เท่านั้น

### HTTPS
- [ ] ทุก URL ใช้ HTTPS
- [ ] SSL Certificate ใช้งานได้
- [ ] Redirect HTTP → HTTPS

### CORS
- [ ] CORS อนุญาตเฉพาะ Frontend URL
- [ ] ไม่ใช้ `origin: '*'` ใน production
- [ ] Credentials: true ถูกตั้งค่าแล้ว

---

## 🚀 Post-Deployment Checklist

### Documentation
- [ ] อัปเดต README.md
- [ ] เพิ่ม deployment URLs
- [ ] บันทึก Environment Variables ที่จำเป็น
- [ ] สร้าง API documentation

### Team Communication
- [ ] แจ้งทีมเกี่ยวกับ URLs ใหม่
- [ ] แชร์ credentials ที่จำเป็น (ผ่านช่องทางปลอดภัย)
- [ ] อธิบายการใช้งาน

### Continuous Integration
- [ ] เชื่อมต่อ GitHub repository
- [ ] ตั้งค่า auto-deployment สำหรับ main branch
- [ ] ตั้งค่า preview deployments สำหรับ PRs

---

## 🎉 Final Verification

### URLs
- **Backend:** `https://________________________.vercel.app`
- **Frontend:** `https://________________________.vercel.app`

### Status
- [ ] ✅ Backend deployed successfully
- [ ] ✅ Frontend deployed successfully
- [ ] ✅ Database connected
- [ ] ✅ CORS configured
- [ ] ✅ Authentication working
- [ ] ✅ All tests passing
- [ ] ✅ No errors in logs
- [ ] ✅ Performance acceptable
- [ ] ✅ Security measures in place

---

## 📝 Notes

**Deployment Date:** _______________

**Deployed By:** _______________

**Backend URL:** _______________

**Frontend URL:** _______________

**Issues Encountered:**
```
(บันทึกปัญหาและวิธีแก้ไข)
```

**Additional Configuration:**
```
(บันทึก configuration พิเศษ)
```

---

## 🆘 If Something Goes Wrong

1. **Check Logs:**
   ```bash
   npx vercel logs expert-connect-backend
   npx vercel logs expert-connect-frontend
   ```

2. **Verify Environment Variables:**
   - ไปที่ Vercel Dashboard
   - Settings → Environment Variables
   - ตรวจสอบว่าครบทุกตัว

3. **Redeploy:**
   ```bash
   cd backend && npx vercel --prod
   cd frontend && npx vercel --prod
   ```

4. **Database Connection:**
   - ทดสอบ connection string
   - ตรวจสอบ Supabase dashboard
   - ดู network settings

5. **Contact Support:**
   - Vercel: https://vercel.com/support
   - Supabase: https://supabase.com/support

---

**Good luck with your deployment! 🚀**
