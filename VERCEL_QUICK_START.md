# ⚡ Quick Start - Deploy to Vercel

เริ่มต้นใช้งาน Vercel ภายใน 5 นาที!

## 🚀 แบบเร็ว (Automated)

### ขั้นตอนที่ 1: เตรียมข้อมูล
เตรียม Supabase credentials:
```bash
DATABASE_URL=postgresql://postgres.xxxxxxxxxx:TALENTER2026AA!!@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
SUPABASE_URL=https://rrldahlpropldndsgeke.supabase.co
SUPABASE_KEY=sb_publishable_KMu1lOXkd_WVb6famqewlg_wcCpZQVe
```

### ขั้นตอนที่ 2: รัน Script
```bash
cd /home/user/webapp

# Deploy แบบ Preview
./deploy-to-vercel.sh preview

# Deploy แบบ Production
./deploy-to-vercel.sh production
```

### ขั้นตอนที่ 3: ทดสอบ
- Backend: ดู URL ที่แสดง
- Frontend: เปิดเบราว์เซอร์ไปที่ URL

---

## 🔧 แบบละเอียด (Manual)

### 1. ติดตั้ง Vercel CLI
```bash
# ตรวจสอบว่า npx ใช้งานได้
npx vercel --version
```

### 2. Login เข้า Vercel
```bash
npx vercel login
```
เลือก **GitHub** แล้วทำตาม instructions

### 3. Deploy Backend
```bash
cd /home/user/webapp/backend

# Deploy
npx vercel --prod
```

ตอบคำถาม:
- **Set up and deploy?** → **Y**
- **Which scope?** → เลือก account
- **Link to existing project?** → **N**
- **Project name?** → `expert-connect-backend`
- **Directory?** → **.**
- **Override settings?** → **N**

### 4. ตั้งค่า Backend Environment Variables

#### วิธีที่ 1: ผ่าน Vercel Dashboard (แนะนำ)
1. ไปที่ https://vercel.com/dashboard
2. เลือก **expert-connect-backend**
3. **Settings** → **Environment Variables**
4. เพิ่มตัวแปรเหล่านี้:

```
DATABASE_URL=postgresql://postgres.xxxxxxxxxx:TALENTER2026AA!!@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
SUPABASE_URL=https://rrldahlpropldndsgeke.supabase.co
SUPABASE_KEY=sb_publishable_KMu1lOXkd_WVb6famqewlg_wcCpZQVe
JWT_SECRET=expert-connect-secret-key-2024-production-ready
JWT_EXPIRE=7d
NODE_ENV=production
```

5. กด **Save**
6. **Redeploy** โปรเจกต์

#### วิธีที่ 2: ผ่าน CLI
```bash
cd /home/user/webapp/backend

npx vercel env add DATABASE_URL production
npx vercel env add SUPABASE_URL production
npx vercel env add SUPABASE_KEY production
npx vercel env add JWT_SECRET production
npx vercel env add JWT_EXPIRE production

# Redeploy
npx vercel --prod
```

### 5. Deploy Frontend
```bash
cd /home/user/webapp/frontend

# สร้าง .env.production
echo "REACT_APP_API_URL=https://your-backend-url.vercel.app" > .env.production

# Deploy
npx vercel --prod
```

### 6. ตั้งค่า Frontend Environment Variables
```bash
# ผ่าน CLI
npx vercel env add REACT_APP_API_URL production
# วาง: https://your-backend-url.vercel.app

# Redeploy
npx vercel --prod
```

### 7. อัปเดต Backend CORS
```bash
# เพิ่ม Frontend URL ใน Backend Environment
cd /home/user/webapp/backend
npx vercel env add FRONTEND_URL production
# วาง: https://your-frontend-url.vercel.app

npx vercel env add CORS_ORIGIN production
# วาง: https://your-frontend-url.vercel.app

# Redeploy Backend
npx vercel --prod
```

---

## ✅ ทดสอบการ Deploy

### ทดสอบ Backend
```bash
# Health Check
curl https://your-backend-url.vercel.app/health

# ควรได้:
# {"success":true,"message":"Expert Connect API is running","timestamp":"..."}
```

### ทดสอบ Frontend
1. เปิด https://your-frontend-url.vercel.app
2. ทดสอบ Register Account
3. ทดสอบ Login
4. ตรวจสอบ Console (F12) ไม่มี Error

---

## 🐛 Troubleshooting

### ❌ Backend: Can't reach database server
**วิธีแก้:**
1. ตรวจสอบ `DATABASE_URL` ถูกต้อง
2. ใช้ Connection Pooling URL (port 6543)
3. Redeploy: `npx vercel --prod`

### ❌ Frontend: Network Error
**วิธีแก้:**
1. ตรวจสอบ `REACT_APP_API_URL`
2. ตรวจสอบ Backend CORS settings
3. Redeploy Frontend: `npx vercel --prod`

### ❌ Environment Variables ไม่ทำงาน
**วิธีแก้:**
1. ตั้งค่าครบทั้ง 3 environments: Production, Preview, Development
2. **Redeploy** หลังเปลี่ยน Environment Variables

---

## 📊 View Logs

### แบบ Real-time
```bash
# Backend logs
npx vercel logs expert-connect-backend --follow

# Frontend logs
npx vercel logs expert-connect-frontend --follow
```

### แบบ Dashboard
1. https://vercel.com/dashboard
2. เลือกโปรเจกต์
3. **Deployments** → เลือก deployment
4. ดู **Logs** และ **Build Logs**

---

## 🔄 Redeploy

### แบบอัตโนมัติ (GitHub Integration)
1. Push code ไปยัง GitHub
2. Vercel จะ Auto Deploy

### แบบ Manual
```bash
# Backend
cd /home/user/webapp/backend
npx vercel --prod

# Frontend
cd /home/user/webapp/frontend
npx vercel --prod
```

---

## 📝 Next Steps

1. ✅ **Custom Domain** - เพิ่ม custom domain ใน Vercel Dashboard
2. ✅ **SSL Certificate** - Vercel ให้ SSL ฟรีอัตโนมัติ
3. ✅ **Analytics** - เปิดใช้ Vercel Analytics
4. ✅ **Monitoring** - ตั้งค่า alerts สำหรับ errors
5. ✅ **CI/CD** - ตั้งค่า GitHub Actions สำหรับ auto testing

---

## 🆘 Need Help?

- 📖 [Full Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)
- 🌐 [Vercel Documentation](https://vercel.com/docs)
- 💬 [Vercel Community](https://vercel.com/community)
- 🐛 [Report Issues](https://github.com/your-repo/issues)

---

## 🎉 Success!

ตอนนี้แอปของคุณถูก Deploy ไปยัง Vercel แล้ว! 🚀

**URLs:**
- 🖥️  **Backend:** `https://expert-connect-backend.vercel.app`
- 🎨 **Frontend:** `https://expert-connect-frontend.vercel.app`

Happy Coding! 💻✨
