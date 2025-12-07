# 🚀 คู่มือ Deploy Expert Connect ภาษาไทย

## 📋 สารบัญ

1. [วิธีที่ 1: Deploy ฟรีบน Render + Netlify](#วิธีที่-1-deploy-ฟรีบน-render--netlify-แนะนำสำหรับมือใหม่)
2. [วิธีที่ 2: Deploy บน Railway + Vercel](#วิธีที่-2-deploy-บน-railway--vercel)
3. [วิธีที่ 3: Deploy บน VPS (DigitalOcean/Linode)](#วิธีที่-3-deploy-บน-vps)
4. [วิธีที่ 4: Deploy บน Heroku](#วิธีที่-4-deploy-บน-heroku)

---

## 🌟 วิธีที่ 1: Deploy ฟรีบน Render + Netlify (แนะนำสำหรับมือใหม่)

### ✨ ข้อดี:
- ✅ **ฟรี!** (มี Free Plan)
- ✅ ง่ายมาก ไม่ต้องจัดการ server
- ✅ Auto deploy ทุกครั้งที่ push code
- ✅ มี Database ให้ใช้ฟรี

### 📦 สิ่งที่ต้องเตรียม:
- GitHub account
- OpenAI API Key (ไปสมัครที่ https://platform.openai.com)

---

### 📝 ขั้นตอนที่ 1: อัพโหลดโค้ดขึ้น GitHub

```bash
# 1. สร้าง GitHub Repository ใหม่
# ไปที่ github.com → New Repository → ตั้งชื่อว่า "expert-connect"

# 2. อัพโหลดโค้ด
cd /home/user/webapp

git remote add origin https://github.com/YOUR_USERNAME/expert-connect.git
git branch -M main
git push -u origin main
```

✅ **เช็คว่าสำเร็จ**: ไปดูที่ GitHub ต้องเห็นโค้ดทั้งหมด

---

### 🔧 ขั้นตอนที่ 2: Deploy Backend บน Render

#### 2.1 สร้าง PostgreSQL Database

1. ไปที่ https://render.com → Sign Up (ใช้ GitHub login)
2. กด **"New +"** → เลือก **"PostgreSQL"**
3. ตั้งค่า:
   ```
   Name: expert-connect-db
   Database: expertconnect
   User: expertconnect_user
   Region: Singapore (ใกล้บ้านเรา)
   Plan: Free
   ```
4. กด **"Create Database"**
5. รอสักครู่ จนเห็น status เป็น **"Available"**
6. **คัดลอก Internal Database URL** (จะได้ URL แบบนี้):
   ```
   postgresql://expertconnect_user:xxxxx@dpg-xxxxx-postgres/expertconnect
   ```
   📝 **เก็บ URL นี้ไว้ จะใช้ในขั้นตอนต่อไป**

#### 2.2 Deploy Backend API

1. กด **"New +"** → เลือก **"Web Service"**
2. **Connect Repository**: 
   - เลือก GitHub account ของคุณ
   - เลือก repository **"expert-connect"**
3. ตั้งค่า:
   ```
   Name: expert-connect-api
   Region: Singapore
   Branch: main
   Root Directory: backend
   Environment: Node
   Build Command: npm install && npx prisma generate
   Start Command: node src/server.js
   Instance Type: Free
   ```

4. **Environment Variables** - กด "Add Environment Variable" แล้วใส่:

   ```env
   NODE_ENV=production
   
   DATABASE_URL=<URL_ที่คัดลอกมาจากขั้นตอน 2.1>
   
   JWT_SECRET=my-super-secret-key-please-change-this-in-production-123
   
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
   
   PORT=5000
   
   CORS_ORIGIN=*
   ```

   ⚠️ **สำคัญ**: 
   - `DATABASE_URL` = URL จาก step 2.1
   - `OPENAI_API_KEY` = ไปเอาที่ https://platform.openai.com/api-keys
   - `JWT_SECRET` = เปลี่ยนเป็นอะไรก็ได้ที่ยาวๆ

5. กด **"Create Web Service"**
6. รอประมาณ 5-10 นาที (ดู Logs ด้านล่าง)

#### 2.3 Run Database Migrations

1. รอจนเห็น status เป็น **"Live"** สีเขียว
2. เลื่อนไปบนสุด จะเห็น URL แบบนี้:
   ```
   https://expert-connect-api.onrender.com
   ```
3. ไปที่ tab **"Shell"** (อยู่ด้านบน)
4. รันคำสั่ง:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```
5. ถ้าเห็น "All migrations applied successfully" แสดงว่าสำเร็จ! ✅

#### 2.4 ทดสอบ Backend

เปิดเบราว์เซอร์ แล้วไปที่:
```
https://expert-connect-api.onrender.com/health
```

ต้องเห็น:
```json
{
  "success": true,
  "message": "Expert Connect API is running",
  "timestamp": "..."
}
```

✅ **Backend สำเร็จแล้ว!**

---

### ⚛️ ขั้นตอนที่ 3: Deploy Frontend บน Netlify

#### 3.1 Deploy

1. ไปที่ https://netlify.com → Sign Up (ใช้ GitHub)
2. กด **"Add new site"** → **"Import an existing project"**
3. **"Deploy with GitHub"** → เลือก repo **"expert-connect"**
4. ตั้งค่า:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/build
   ```

5. **Environment variables** กด "Add environment variables":
   ```
   REACT_APP_API_URL=https://expert-connect-api.onrender.com/api
   ```
   ⚠️ **ใส่ URL จาก Backend ที่ได้จาก step 2.3** และเติม `/api` ท้าย

6. กด **"Deploy"**
7. รอประมาณ 3-5 นาที

#### 3.2 เปลี่ยนชื่อ Domain (ถ้าต้องการ)

1. หลัง Deploy สำเร็จ จะได้ URL แบบนี้:
   ```
   https://random-name-123.netlify.app
   ```
2. ไปที่ **Site settings** → **Domain management**
3. กด **"Options"** → **"Edit site name"**
4. เปลี่ยนเป็นชื่อที่ต้องการ เช่น:
   ```
   expert-connect-thailand
   ```
5. จะได้ URL ใหม่:
   ```
   https://expert-connect-thailand.netlify.app
   ```

#### 3.3 อัพเดท CORS ใน Backend

⚠️ **สำคัญ!** ต้องทำไม่งั้นจะ error

1. กลับไปที่ **Render.com** → Backend Service
2. ไปที่ **Environment** tab
3. แก้ไข `CORS_ORIGIN` จาก `*` เป็น:
   ```
   https://expert-connect-thailand.netlify.app
   ```
4. กด **"Save Changes"**
5. Backend จะ restart อัตโนมัติ

✅ **Frontend สำเร็จแล้ว!**

---

### 🎉 ทดสอบว่าใช้งานได้

1. เปิดเบราว์เซอร์ ไปที่:
   ```
   https://expert-connect-thailand.netlify.app
   ```

2. ต้องเห็นหน้า Landing Page

3. ทดสอบสมัครสมาชิก:
   - กด **Sign Up**
   - เลือก **Expert** หรือ **Seeker**
   - กรอกข้อมูล
   - กด **Create Account**

4. ถ้า Login สำเร็จ = ใช้งานได้แล้ว! 🎊

---

### 📱 URL ที่ได้:

```
Frontend: https://expert-connect-thailand.netlify.app
Backend:  https://expert-connect-api.onrender.com
Database: ตั้งอยู่บน Render (auto manage)
```

---

### 💰 ราคา (Free Plan):

| Service | Free Plan | Limit |
|---------|-----------|-------|
| Render Web Service | ฟรี | Sleep หลัง 15 นาทีไม่ใช้งาน |
| Render PostgreSQL | ฟรี | 1 GB storage, 1 เดือนแล้วถูกลบ |
| Netlify | ฟรี | 100 GB bandwidth/เดือน |

⚠️ **หมายเหตุ**: 
- Free plan ของ Render จะ "sleep" หลังไม่มีใครใช้ 15 นาที
- ครั้งแรกที่เปิดจะช้าประมาณ 30 วินาที (กำลัง wake up)
- Database ฟรีจะถูกลบหลัง 1 เดือน (ต้อง export ข้อมูลก่อน)

---

## 🚀 วิธีที่ 2: Deploy บน Railway + Vercel

### ข้อดี:
- ✅ Railway มี Free plan $5/เดือน (ใช้ได้นานกว่า Render)
- ✅ Database ไม่ถูกลบ
- ✅ Vercel รวดเร็วกว่า Netlify

### ขั้นตอน:

#### Backend บน Railway

1. ไปที่ https://railway.app → Sign up with GitHub
2. กด **"New Project"** → **"Deploy from GitHub repo"**
3. เลือก repo **expert-connect**
4. กด **"Add PostgreSQL"** → จะสร้าง Database ให้อัตโนมัติ
5. กด backend service → **Settings**:
   ```
   Root Directory: /backend
   Start Command: npm start
   ```

6. ไปที่ **Variables** tab → Add:
   ```
   NODE_ENV=production
   JWT_SECRET=your-secret-key
   OPENAI_API_KEY=sk-your-key
   CORS_ORIGIN=*
   ```

7. คัดลอก `DATABASE_URL` จาก PostgreSQL service → เพิ่มใน backend variables

8. **Generate Domain**:
   - Settings → Generate Domain
   - จะได้: `https://expert-connect-api.up.railway.app`

9. Run migrations ใน terminal:
   ```bash
   railway login
   railway link
   railway run npx prisma migrate deploy
   ```

#### Frontend บน Vercel

1. ไปที่ https://vercel.com → Import Project
2. เลือก GitHub repo
3. Settings:
   ```
   Framework: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   ```

4. Environment Variables:
   ```
   REACT_APP_API_URL=https://expert-connect-api.up.railway.app/api
   ```

5. Deploy!

6. อัพเดท CORS ใน Railway backend:
   ```
   CORS_ORIGIN=https://expert-connect.vercel.app
   ```

✅ **เสร็จแล้ว!**

---

## 🖥️ วิธีที่ 3: Deploy บน VPS (Ubuntu Server)

### ต้องมี:
- VPS (DigitalOcean, Linode, AWS EC2)
- Ubuntu 20.04 หรือ 22.04
- Root access

### วิธีใช้ Auto Deploy Script:

```bash
# 1. SSH เข้า VPS
ssh root@your-server-ip

# 2. Clone repo
git clone https://github.com/YOUR_USERNAME/expert-connect.git
cd expert-connect

# 3. แก้ไข deploy.sh (ใส่ GitHub URL ของคุณ)
nano deploy.sh
# แก้บรรทัดที่มี YOUR_USERNAME

# 4. รัน script
chmod +x deploy.sh
sudo ./deploy.sh

# 5. แก้ไข .env ใส่ OpenAI API Key
nano /var/www/expert-connect/backend/.env
# แก้ OPENAI_API_KEY=sk-your-key

# 6. Restart backend
pm2 restart expert-connect-api

# 7. เปิดเว็บที่
# http://YOUR_SERVER_IP
```

### ติดตั้ง SSL (HTTPS):

```bash
# 1. ติดตั้ง Certbot
sudo apt install certbot python3-certbot-nginx

# 2. ต้องมี Domain ก่อน (ซื้อจาก Namecheap, GoDaddy, etc.)
# ตั้ง DNS A Record ชี้มา server IP

# 3. Run Certbot
sudo certbot --nginx -d yourdomain.com

# 4. เสร็จแล้ว! จะได้ https://yourdomain.com
```

---

## 📦 วิธีที่ 4: Deploy บน Heroku

### Backend:

```bash
cd backend

# 1. Create Procfile
echo "web: node src/server.js" > Procfile

# 2. Login Heroku
heroku login

# 3. Create app
heroku create expert-connect-api

# 4. Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# 5. Set env vars
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set OPENAI_API_KEY=sk-your-key

# 6. Deploy
git push heroku main

# 7. Run migrations
heroku run npx prisma migrate deploy

# 8. เปิดดู
heroku open
```

### Frontend:

Deploy บน Vercel หรือ Netlify ตามขั้นตอนข้างบน

---

## 🐛 แก้ปัญหาที่พบบ่อย

### ❌ "Cannot connect to database"

**วิธีแก้:**
```bash
# เช็ค DATABASE_URL ว่าถูกต้องไหม
echo $DATABASE_URL

# ทดสอบ connection
psql $DATABASE_URL
```

### ❌ "CORS Error"

**วิธีแก้:**
- เช็คว่า `CORS_ORIGIN` ใน backend ตรงกับ frontend URL
- ต้องมี `https://` ด้วย
- ไม่ต้องมี `/` ท้าย

### ❌ "OpenAI API Error"

**วิธีแก้:**
- เช็ค API key ถูกต้องไหม
- เช็คว่ามี credits พอใน OpenAI account
- ไปที่ https://platform.openai.com/usage

### ❌ Backend "Sleep" บน Render

**วิธีแก้:**
- ใช้ cron job ping ทุก 10 นาที:
```bash
# ใช้ cron-job.org หรือ UptimeRobot
# Ping: https://expert-connect-api.onrender.com/health
```

### ❌ "Module not found"

**วิธีแก้:**
```bash
# ลบ node_modules แล้วติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 เปรียบเทียบแต่ละวิธี

| วิธี | ราคา/เดือน | ความยาก | ความเร็ว | แนะนำสำหรับ |
|------|-----------|---------|----------|-------------|
| Render + Netlify | ฟรี-$7 | ⭐ ง่าย | ⭐⭐ | มือใหม่ |
| Railway + Vercel | $5-$10 | ⭐⭐ | ⭐⭐⭐ | ทั่วไป |
| VPS (DigitalOcean) | $6-$12 | ⭐⭐⭐ | ⭐⭐⭐⭐ | Pro |
| Heroku | $7-$25 | ⭐⭐ | ⭐⭐⭐ | Enterprise |

---

## ✅ Checklist หลัง Deploy

- [ ] Frontend เปิดได้
- [ ] Backend API ทำงาน (test `/health`)
- [ ] สมัครสมาชิกได้
- [ ] Login ได้
- [ ] สร้าง Expert profile ได้
- [ ] สร้าง Consultation request ได้
- [ ] AI Matching ทำงานได้ (ต้องมี OpenAI credits)
- [ ] Database เซฟข้อมูลได้

---

## 🎯 แนะนำ: เริ่มต้นด้วยอันไหนดี?

**ถ้าเพิ่งเริ่มต้น → ใช้ Render + Netlify (วิธีที่ 1)**
- ฟรี
- ง่ายที่สุด
- ไม่ต้องจัดการอะไร

**ถ้าต้องการใช้งานจริง → ใช้ Railway + Vercel (วิธีที่ 2)**
- ไม่แพง
- Database ไม่ถูกลบ
- Performance ดี

**ถ้าต้องการ Full Control → ใช้ VPS (วิธีที่ 3)**
- ราคาคุ้มค่า
- ปรับแต่งได้เยอะ
- ต้องดูแลเอง

---

## 📞 ต้องการความช่วยเหลือ?

ถ้าติดปัญหาตรงไหน:
1. เช็ค logs ใน Render/Railway Dashboard
2. ดู browser console (F12) สำหรับ frontend errors
3. เช็ค environment variables ว่าถูกต้องทั้งหมด
4. ลองใช้ Postman ทดสอบ API โดยตรง

---

**สำเร็จแล้ว! เว็บของคุณออนไลน์แล้ว! 🎉**
