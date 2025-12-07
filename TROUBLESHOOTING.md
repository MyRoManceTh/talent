# 🔧 Troubleshooting Guide

## ปัญหา: สมัครสมาชิกไม่ได้ (Network Error)

### ✅ สิ่งที่แก้ไขแล้ว:

1. **Backend Running**: ✅ Port 5000 ทำงานปกติ
2. **Database Connected**: ✅ PostgreSQL เชื่อมต่อสำเร็จ
3. **CORS Configured**: ✅ อนุญาต origin จาก frontend
4. **Frontend Restarted**: ✅ อ่าน environment variables ใหม่

### 🧪 วิธีทดสอบ:

#### 1. ทดสอบ Backend API โดยตรง:
```bash
curl -X POST https://5000-itagcibs0p2c8balh71zz-02b9cc79.sandbox.novita.ai/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "ทดสอบ",
    "lastName": "ระบบ",
    "role": "SEEKER"
  }'
```

#### 2. ทดสอบผ่านหน้าเว็บ Simple:
เปิด: https://3000-itagcibs0p2c8balh71zz-02b9cc79.sandbox.novita.ai/test-api.html
กดปุ่ม "Test Register"

#### 3. ทดสอบผ่านหน้า Register จริง:
เปิด: https://3000-itagcibs0p2c8balh71zz-02b9cc79.sandbox.novita.ai/register

### 🔍 ตรวจสอบ Browser Console:

1. เปิด Developer Tools (F12)
2. ไปที่ Tab "Console"
3. ลอง Register
4. ดู Error Message

### 📋 Checklist สำหรับ Debug:

- [ ] Backend running (check: https://5000-.../health)
- [ ] Frontend loaded (check: https://3000-.../register)
- [ ] Console มี error อะไร?
- [ ] Network tab มี request ไปหา /api/auth/register หรือไม่?
- [ ] Response status code เป็นเท่าไหร่?

### 💡 Solutions:

#### ถ้า Network Error หรือ CORS Error:
```bash
# Restart Backend
cd /home/user/webapp/backend
npm run dev

# Restart Frontend  
cd /home/user/webapp/frontend
npm start
```

#### ถ้า 404 Not Found:
ตรวจสอบ API_URL ใน browser console:
```javascript
console.log(process.env.REACT_APP_API_URL)
```

#### ถ้า 500 Internal Server Error:
ดู backend logs:
```bash
cd /home/user/webapp/backend
tail -f logs/*.log
```

### 🌐 URLs สำหรับทดสอบ:

- Frontend: https://3000-itagcibs0p2c8balh71zz-02b9cc79.sandbox.novita.ai
- Backend API: https://5000-itagcibs0p2c8balh71zz-02b9cc79.sandbox.novita.ai/api
- Health Check: https://5000-itagcibs0p2c8balh71zz-02b9cc79.sandbox.novita.ai/health
- API Test Page: https://3000-itagcibs0p2c8balh71zz-02b9cc79.sandbox.novita.ai/test-api.html

