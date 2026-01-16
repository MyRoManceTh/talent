# 🚀 คู่มือ Deploy Expert Connect Platform ไปยัง Vercel

## 📋 สารบัญ
1. [ข้อกำหนดเบื้องต้น](#ข้อกำหนดเบื้องต้น)
2. [ติดตั้ง Vercel CLI](#ติดตั้ง-vercel-cli)
3. [Deploy Backend API](#deploy-backend-api)
4. [Deploy Frontend](#deploy-frontend)
5. [ตั้งค่า Environment Variables](#ตั้งค่า-environment-variables)
6. [ทดสอบการ Deploy](#ทดสอบการ-deploy)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 ข้อกำหนดเบื้องต้น

### 1. สิ่งที่ต้องมี
- ✅ Vercel Account (สมัครฟรีที่ https://vercel.com/signup)
- ✅ Node.js v18+ ติดตั้งแล้ว
- ✅ Git repository (GitHub, GitLab, Bitbucket)
- ✅ Supabase Database พร้อมใช้งาน

### 2. ข้อมูลที่ต้องเตรียม
```bash
# Supabase
DATABASE_URL=postgresql://postgres.xxxxxxxxxx:TALENTER2026AA!!@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
SUPABASE_URL=https://rrldahlpropldndsgeke.supabase.co
SUPABASE_KEY=sb_publishable_KMu1lOXkd_WVb6famqewlg_wcCpZQVe

# JWT
JWT_SECRET=expert-connect-secret-key-2024-production-ready
JWT_EXPIRE=7d

# OpenAI (Optional)
OPENAI_API_KEY=sk-your-actual-key-here

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## 📦 ติดตั้ง Vercel CLI

### วิธีที่ 1: ใช้ npx (แนะนำ)
```bash
npx vercel --version
```

### วิธีที่ 2: ติดตั้ง Global
```bash
npm install -g vercel
vercel --version
```

### เข้าสู่ระบบ Vercel
```bash
npx vercel login
```

เลือกวิธีเข้าสู่ระบบ:
- **GitHub** (แนะนำ)
- GitLab
- Bitbucket
- Email

---

## 🖥️ Deploy Backend API

### ขั้นตอนที่ 1: เตรียม Backend
```bash
cd /home/user/webapp/backend

# ตรวจสอบไฟล์ vercel.json
cat vercel.json
```

`vercel.json` ควรมีเนื้อหาดังนี้:
```json
{
  "version": 2,
  "name": "expert-connect-backend",
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### ขั้นตอนที่ 2: Deploy Backend
```bash
cd /home/user/webapp/backend

# Deploy แบบ Production
npx vercel --prod

# หรือ Deploy แบบ Preview ก่อน
npx vercel
```

คำสั่งจะถาม:
1. **Set up and deploy?** → Yes
2. **Which scope?** → เลือก account ของคุณ
3. **Link to existing project?** → No (ครั้งแรก)
4. **Project name?** → `expert-connect-backend` (หรือชื่อที่ต้องการ)
5. **Directory?** → `.` (directory ปัจจุบัน)
6. **Override settings?** → No

### ขั้นตอนที่ 3: ตั้งค่า Environment Variables
```bash
# เพิ่ม Environment Variables ผ่าน CLI
npx vercel env add DATABASE_URL production
# วาง: postgresql://postgres.xxxxxxxxxx:TALENTER2026AA!!@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true

npx vercel env add SUPABASE_URL production
# วาง: https://rrldahlpropldndsgeke.supabase.co

npx vercel env add SUPABASE_KEY production
# วาง: sb_publishable_KMu1lOXkd_WVb6famqewlg_wcCpZQVe

npx vercel env add JWT_SECRET production
# วาง: expert-connect-secret-key-2024-production-ready

npx vercel env add JWT_EXPIRE production
# วาง: 7d

npx vercel env add OPENAI_API_KEY production
# วาง: sk-your-actual-key-here

# (Optional) Email settings
npx vercel env add EMAIL_HOST production
npx vercel env add EMAIL_PORT production
npx vercel env add EMAIL_USER production
npx vercel env add EMAIL_PASS production
```

### ขั้นตอนที่ 4: Redeploy หลังตั้งค่า Environment Variables
```bash
npx vercel --prod
```

### ขั้นตอนที่ 5: ทดสอบ Backend API
```bash
# ทดสอบ Health Check
curl https://your-backend-url.vercel.app/health

# ทดสอบ API
curl https://your-backend-url.vercel.app/api/auth/health
```

---

## 🎨 Deploy Frontend

### ขั้นตอนที่ 1: เตรียม Frontend
```bash
cd /home/user/webapp/frontend

# ตรวจสอบไฟล์ vercel.json
cat vercel.json
```

`vercel.json` ควรมีเนื้อหาดังนี้:
```json
{
  "version": 2,
  "name": "expert-connect-frontend",
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm start",
  "installCommand": "npm install",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### ขั้นตอนที่ 2: อัปเดต Backend URL ใน Frontend

สร้างไฟล์ `.env.production`:
```bash
cd /home/user/webapp/frontend
cat > .env.production << 'EOF'
REACT_APP_API_URL=https://your-backend-url.vercel.app
EOF
```

### ขั้นตอนที่ 3: Deploy Frontend
```bash
cd /home/user/webapp/frontend

# Deploy แบบ Production
npx vercel --prod

# หรือ Deploy แบบ Preview ก่อน
npx vercel
```

คำสั่งจะถาม:
1. **Set up and deploy?** → Yes
2. **Which scope?** → เลือก account ของคุณ
3. **Link to existing project?** → No (ครั้งแรก)
4. **Project name?** → `expert-connect-frontend` (หรือชื่อที่ต้องการ)
5. **Directory?** → `.` (directory ปัจจุบัน)
6. **Override settings?** → No

### ขั้นตอนที่ 4: ตั้งค่า Environment Variables (Frontend)
```bash
# เพิ่ม Backend API URL
npx vercel env add REACT_APP_API_URL production
# วาง: https://your-backend-url.vercel.app
```

### ขั้นตอนที่ 5: Redeploy Frontend
```bash
npx vercel --prod
```

---

## ⚙️ ตั้งค่า Environment Variables ผ่าน Dashboard

### วิธีที่ 1: Vercel Dashboard (แนะนำ)

1. ไปที่ https://vercel.com/dashboard
2. เลือกโปรเจกต์ของคุณ
3. ไปที่ **Settings** → **Environment Variables**
4. เพิ่มตัวแปรทั้งหมด:

#### Backend Environment Variables
```
DATABASE_URL=postgresql://postgres.xxxxxxxxxx:TALENTER2026AA!!@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
SUPABASE_URL=https://rrldahlpropldndsgeke.supabase.co
SUPABASE_KEY=sb_publishable_KMu1lOXkd_WVb6famqewlg_wcCpZQVe
JWT_SECRET=expert-connect-secret-key-2024-production-ready
JWT_EXPIRE=7d
OPENAI_API_KEY=sk-your-actual-key-here
NODE_ENV=production
```

#### Frontend Environment Variables
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

5. เลือก Environment: **Production**, **Preview**, **Development**
6. กด **Save**
7. Redeploy โปรเจกต์

---

## 🧪 ทดสอบการ Deploy

### ทดสอบ Backend
```bash
# Health Check
curl https://your-backend-url.vercel.app/health

# Register User
curl -X POST https://your-backend-url.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@vercel.com",
    "password": "Test123456!",
    "firstName": "Test",
    "lastName": "User",
    "role": "EXPERT"
  }'

# Login
curl -X POST https://your-backend-url.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@vercel.com",
    "password": "Test123456!"
  }'
```

### ทดสอบ Frontend
1. เปิดเบราว์เซอร์ไปที่ Frontend URL
2. ทดสอบ Register
3. ทดสอบ Login
4. ทดสอบ Expert Profile
5. ตรวจสอบ Console สำหรับ Errors

---

## 🐛 Troubleshooting

### 1. Backend Error: "Can't reach database server"

**สาเหตุ:** Database connection string ไม่ถูกต้อง

**วิธีแก้:**
```bash
# ตรวจสอบ Environment Variables
npx vercel env ls

# ลบและเพิ่มใหม่
npx vercel env rm DATABASE_URL production
npx vercel env add DATABASE_URL production
```

### 2. Frontend Error: "Network Error"

**สาเหตุ:** Backend URL ไม่ถูกต้องหรือ CORS ไม่อนุญาต

**วิธีแก้:**
1. ตรวจสอบ `REACT_APP_API_URL`
2. ตรวจสอบ Backend CORS settings:

```javascript
// backend/src/server.js
const corsOptions = {
  origin: [
    'https://your-frontend-url.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
};
app.use(cors(corsOptions));
```

### 3. Prisma Error: "Migration not applied"

**วิธีแก้:**
```bash
# Generate Prisma Client ใน Vercel
# เพิ่มใน package.json
{
  "scripts": {
    "build": "prisma generate && npm run build:app",
    "vercel-build": "prisma generate && npm run build"
  }
}
```

### 4. Environment Variables ไม่ทำงาน

**วิธีแก้:**
1. ตรวจสอบว่าตั้งค่าครบทั้งสาม environments:
   - Production
   - Preview
   - Development
2. Redeploy หลังเปลี่ยน Environment Variables

---

## 📊 Monitoring & Logs

### ดู Logs แบบ Real-time
```bash
# Backend logs
npx vercel logs expert-connect-backend --follow

# Frontend logs
npx vercel logs expert-connect-frontend --follow
```

### ดู Logs จาก Dashboard
1. ไปที่ https://vercel.com/dashboard
2. เลือกโปรเจกต์
3. ไปที่ **Deployments** → เลือก deployment
4. ดู **Logs** และ **Build Logs**

---

## 🔄 CI/CD Integration

### Auto Deploy จาก GitHub

1. เชื่อม GitHub Repository:
   ```bash
   npx vercel link
   ```

2. Vercel จะ Auto Deploy เมื่อ:
   - Push to `main` branch → Production
   - Push to `develop` branch → Preview
   - Create Pull Request → Preview

3. ตั้งค่า Branch Protection:
   - Main branch → Production
   - Develop branch → Preview
   - Feature branches → Preview

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Supabase with Vercel](https://supabase.com/docs/guides/getting-started/tutorials/with-vercel)

---

## ✅ Checklist

### Pre-Deployment
- [ ] Supabase Database ใช้งานได้
- [ ] SQL Schema ถูก Deploy แล้ว
- [ ] Environment Variables พร้อม
- [ ] Vercel Account สร้างแล้ว
- [ ] GitHub Repository เชื่อมต่อแล้ว

### Backend Deployment
- [ ] vercel.json ถูกสร้างแล้ว
- [ ] Deploy Backend สำเร็จ
- [ ] Environment Variables ตั้งค่าครบ
- [ ] Health Check ทำงานได้
- [ ] API Endpoints ทำงานได้

### Frontend Deployment
- [ ] vercel.json ถูกสร้างแล้ว
- [ ] .env.production มี Backend URL
- [ ] Deploy Frontend สำเร็จ
- [ ] เชื่อมต่อ Backend ได้
- [ ] ทดสอบ Authentication สำเร็จ

### Post-Deployment
- [ ] ทดสอบ End-to-End
- [ ] ตรวจสอบ Logs ไม่มี Error
- [ ] CORS settings ถูกต้อง
- [ ] Database connection เสถียร
- [ ] Performance ดี

---

## 🎉 Congratulations!

โปรเจกต์ของคุณถูก Deploy ไปยัง Vercel แล้ว! 🚀

**URLs:**
- Backend: `https://expert-connect-backend.vercel.app`
- Frontend: `https://expert-connect-frontend.vercel.app`

หากมีปัญหา กรุณาตรวจสอบ Logs และ Troubleshooting Guide ครับ!
