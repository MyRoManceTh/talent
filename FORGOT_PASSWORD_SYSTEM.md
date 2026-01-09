# ระบบลืมรหัสผ่าน (Forgot Password System)

**Date:** 2026-01-09  
**Status:** ✅ เสร็จสมบูรณ์

---

## 📋 สรุปการพัฒนา

เพิ่มระบบลืมรหัสผ่านและรีเซ็ตรหัสผ่านแบบสมบูรณ์ ให้ผู้ใช้สามารถรีเซ็ตรหัสผ่านได้อย่างปลอดภัยผ่านอีเมล

## 🔧 ส่วนประกอบที่เพิ่มเข้ามา

### 1. Backend Components

#### 1.1 Database Schema
**File:** `backend/prisma/schema.prisma`

เพิ่ม model ใหม่สำหรับเก็บ token รีเซ็ตรหัสผ่าน:

```prisma
model PasswordReset {
  id        String   @id @default(uuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token     String   @unique
  expiresAt DateTime

  createdAt DateTime @default(now())

  @@index([token])
  @@index([userId])
  @@map("password_resets")
}
```

**Features:**
- ✅ เก็บ hashed token เพื่อความปลอดภัย
- ✅ กำหนดเวลาหมดอายุ (1 ชั่วโมง)
- ✅ ลบอัตโนมัติเมื่อผู้ใช้ถูกลบ (Cascade)
- ✅ Index สำหรับการค้นหาที่รวดเร็ว

#### 1.2 Email Service
**File:** `backend/src/config/email.js`

บริการส่งอีเมลด้วย Nodemailer:

```javascript
// Functions
- sendEmail()                     // ส่งอีเมลทั่วไป
- sendPasswordResetEmail()         // ส่งอีเมลรีเซ็ตรหัสผ่าน
- sendPasswordChangedEmail()      // ส่งอีเมลแจ้งเตือนเปลี่ยนรหัสผ่าน
```

**Features:**
- 📧 รองรับ SMTP (Gmail, etc.)
- 🎨 อีเมล HTML สวยงาม พร้อมภาษาไทย
- 🔒 ปลอดภัย (ไม่เปิดเผยข้อมูลผู้ใช้)
- 🛠 Development Mode (log แทนการส่งจริง)

**Email Templates:**
1. **Password Reset Email**
   - ลิงก์รีเซ็ตรหัสผ่าน
   - คำเตือนเวลาหมดอายุ
   - คำแนะนำความปลอดภัย

2. **Password Changed Confirmation**
   - แจ้งเตือนเปลี่ยนรหัสผ่านสำเร็จ
   - คำเตือนกรณีไม่ได้เปลี่ยน

#### 1.3 Auth Controller Updates
**File:** `backend/src/controllers/authController.js`

เพิ่ม/อัปเดต API endpoints:

```javascript
// New/Updated Functions
- forgotPassword()    // POST /api/auth/forgot-password
- resetPassword()     // POST /api/auth/reset-password
- changePassword()    // POST /api/auth/change-password (updated)
```

**Forgot Password Flow:**
1. รับ email จาก request
2. ค้นหาผู้ใช้ในฐานข้อมูล
3. สร้าง random token (32 bytes)
4. Hash token ด้วย SHA-256
5. เก็บ hashed token + expiry ในฐานข้อมูล
6. ส่งอีเมลพร้อม plain token
7. Return success (ไม่เปิดเผยว่ามี user หรือไม่)

**Reset Password Flow:**
1. รับ token + newPassword
2. Hash token เพื่อเปรียบเทียบ
3. ค้นหา token ที่ยังไม่หมดอายุ
4. Hash รหัสผ่านใหม่
5. อัปเดตรหัสผ่าน
6. ลบ token ที่ใช้แล้ว
7. ส่งอีเมลแจ้งเตือน

### 2. Frontend Components

#### 2.1 Forgot Password Page
**File:** `frontend/src/pages/ForgotPassword.js`

**Features:**
- 🎨 UI สวยงามด้วย Tailwind CSS
- 📧 ฟอร์มกรอกอีเมล
- ✅ แสดงหน้ายืนยันส่งอีเมล
- 🔄 ส่งอีเมลซ้ำได้
- 🔗 ลิงก์กลับไปหน้า login
- ⚠️ คำเตือนเวลาหมดอายุ

**UI Elements:**
- Email input field with validation
- Loading state
- Success confirmation screen
- Development mode: แสดง reset URL

#### 2.2 Reset Password Page
**File:** `frontend/src/pages/ResetPassword.js`

**Features:**
- 🔐 ฟอร์มตั้งรหัสผ่านใหม่
- 👁 แสดง/ซ่อนรหัสผ่าน
- 💪 Password strength indicator
- ✅ ตรวจสอบรหัสผ่านตรงกัน
- 📝 แสดงเงื่อนไขรหัสผ่าน
- 🎯 Real-time validation

**Password Requirements:**
- ✅ อย่างน้อย 8 ตัวอักษร (required)
- ✅ ตัวพิมพ์ใหญ่และเล็ก (recommended)
- ✅ ตัวเลข (recommended)
- ✅ อักขระพิเศษ (recommended)

**Password Strength Levels:**
- 🔴 อ่อน (weak): 33%
- 🟡 ปานกลาง (medium): 66%
- 🟢 แข็งแรง (strong): 100%

#### 2.3 Login Page Update
**File:** `frontend/src/pages/LoginPage.js`

**Changes:**
- เพิ่มลิงก์ "ลืมรหัสผ่าน?" → `/forgot-password`

#### 2.4 App Routes Update
**File:** `frontend/src/App.js`

**New Routes:**
```javascript
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
```

### 3. Configuration

#### 3.1 Environment Variables
**File:** `backend/.env`

```bash
# Database (Updated to Railway PostgreSQL)
DATABASE_URL=postgresql://postgres:mVQzRDPhNJgtxjYKVyvqbBFkfMjYDlOy@metro.proxy.rlwy.net:25263/railway

# Frontend URL (for email links)
FRONTEND_URL=https://3000-itagcibs0p2c8balh71zz-02b9cc79.sandbox.novita.ai

# Email Configuration (Optional for development)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=              # เว้นว่างใน dev mode
EMAIL_PASS=              # เว้นว่างใน dev mode
EMAIL_FROM_NAME=Expert Connect
```

#### 3.2 Dependencies
**File:** `backend/package.json`

เพิ่ม package:
```json
{
  "nodemailer": "^6.x.x"
}
```

## 🔐 ความปลอดภัย

### Security Best Practices Implemented:

1. **Token Security:**
   - ✅ ใช้ crypto.randomBytes(32) สร้าง token
   - ✅ Hash token ด้วย SHA-256 ก่อนเก็บในฐานข้อมูล
   - ✅ เก็บเฉพาะ hashed version ในฐานข้อมูล
   - ✅ ส่ง plain token ทางอีเมลเท่านั้น

2. **Token Expiration:**
   - ⏰ หมดอายุใน 1 ชั่วโมง
   - 🔄 ใช้ได้เพียงครั้งเดียว (ลบหลังใช้)
   - 🗑 ลบ token เก่าก่อนสร้างใหม่

3. **User Privacy:**
   - 🕵️ ไม่เปิดเผยว่ามี email ในระบบหรือไม่
   - 🔒 Return success message เหมือนกันทั้งสองกรณี
   - 📧 ส่งอีเมลเฉพาะกรณีมี user จริง

4. **Password Strength:**
   - 📏 อย่างน้อย 8 ตัวอักษร
   - 💪 แนะนำให้ใช้ตัวพิมพ์ใหญ่-เล็ก ตัวเลข สัญลักษณ์
   - 🔐 Hash ด้วย bcrypt ก่อนเก็บ

5. **Email Security:**
   - 🔒 ไม่ส่งรหัสผ่านทางอีเมล
   - 🔗 ส่งเฉพาะลิงก์รีเซ็ต
   - ⚠️ แจ้งเตือนเมื่อรหัสผ่านถูกเปลี่ยน

## 🔄 User Flow

### Forgot Password Flow:

```
1. User clicks "ลืมรหัสผ่าน?" on login page
   ↓
2. User enters email address
   ↓
3. System generates secure token
   ↓
4. System sends email with reset link
   ↓
5. User receives email (check inbox/spam)
   ↓
6. User clicks reset link in email
   ↓
7. User redirected to reset password page
   ↓
8. User enters new password (twice)
   ↓
9. System validates and updates password
   ↓
10. User redirected to login page
   ↓
11. User can login with new password
```

### Development Mode:

ในโหมด development (NODE_ENV=development):
- 🛠 ไม่ส่งอีเมลจริง (log ไปที่ console)
- 📋 Return reset URL ใน API response
- 🔗 แสดง reset link ใน browser console

## 📝 API Documentation

### 1. Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "หากมีบัญชีที่ใช้อีเมลนี้ เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปให้แล้ว",
  "resetToken": "abc123..." ,  // Dev mode only
  "resetUrl": "https://..."    // Dev mode only
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Email is required"
}
```

### 2. Reset Password

**Endpoint:** `POST /api/auth/reset-password`

**Request Body:**
```json
{
  "token": "abc123def456...",
  "newPassword": "MyNewP@ssw0rd"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "รีเซ็ตรหัสผ่านสำเร็จ คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้เลย"
}
```

**Error Responses:**

`400 Bad Request` - Invalid/Expired Token:
```json
{
  "success": false,
  "message": "ลิงก์รีเซ็ตรหัสผ่านไม่ถูกต้องหรือหมดอายุแล้ว"
}
```

`400 Bad Request` - Password Too Short:
```json
{
  "success": false,
  "message": "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
}
```

### 3. Change Password (Logged In Users)

**Endpoint:** `POST /api/auth/change-password`  
**Auth Required:** Yes (Bearer Token)

**Request Body:**
```json
{
  "currentPassword": "OldP@ssw0rd",
  "newPassword": "NewP@ssw0rd"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "เปลี่ยนรหัสผ่านสำเร็จ"
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "รหัสผ่านปัจจุบันไม่ถูกต้อง"
}
```

## 🗂 Files Modified/Created

### Created Files:
1. ✅ `backend/src/config/email.js` - Email service
2. ✅ `frontend/src/pages/ForgotPassword.js` - Forgot password UI
3. ✅ `frontend/src/pages/ResetPassword.js` - Reset password UI
4. ✅ `backend/prisma/migrations/20260109165824_add_password_reset_model/migration.sql`
5. ✅ `FORGOT_PASSWORD_SYSTEM.md` - This documentation

### Modified Files:
1. ✅ `backend/prisma/schema.prisma` - Added PasswordReset model
2. ✅ `backend/src/controllers/authController.js` - Updated password functions
3. ✅ `backend/.env` - Added email config + updated DATABASE_URL
4. ✅ `backend/package.json` - Added nodemailer
5. ✅ `frontend/src/pages/LoginPage.js` - Added forgot password link
6. ✅ `frontend/src/App.js` - Added new routes

## 🧪 Testing Instructions

### 1. Development Testing (Without Email):

```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm start
```

**Test Forgot Password:**
1. Go to `/login`
2. Click "ลืมรหัสผ่าน?"
3. Enter test email
4. Check console for reset URL
5. Copy reset URL and paste in browser

**Test Reset Password:**
1. Paste reset URL in browser
2. Enter new password (twice)
3. Verify password strength indicator
4. Submit form
5. Should redirect to login
6. Login with new password

### 2. Production Testing (With Email):

**Setup Email Configuration:**
```bash
# In backend/.env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in EMAIL_PASS

**Test Flow:**
1. Request password reset
2. Check email inbox
3. Click link in email
4. Reset password
5. Check confirmation email
6. Login with new password

### 3. Security Testing:

**Test Cases:**
- ✅ Expired token should be rejected
- ✅ Used token should be rejected
- ✅ Invalid token should be rejected
- ✅ Password < 8 chars should be rejected
- ✅ Non-existent email should return success (no info leak)
- ✅ Token should be deleted after use

## 🚀 Deployment Checklist

### Before Production:

- [ ] Set EMAIL_USER and EMAIL_PASS in production env
- [ ] Set FRONTEND_URL to production domain
- [ ] Run database migration: `npx prisma migrate deploy`
- [ ] Test email delivery in production
- [ ] Verify SSL/TLS for email connection
- [ ] Set NODE_ENV=production (hides dev-only features)
- [ ] Test complete flow end-to-end
- [ ] Monitor email delivery logs
- [ ] Set up email quota monitoring

### Optional Enhancements:

- [ ] Add rate limiting on forgot-password endpoint
- [ ] Add CAPTCHA to prevent abuse
- [ ] Implement email verification for new accounts
- [ ] Add 2FA (Two-Factor Authentication)
- [ ] Track failed password reset attempts
- [ ] Send email on suspicious activity

## 📊 Database Migration

Migration created: `20260109165824_add_password_reset_model`

**Applied successfully:**
```bash
✓ Added PasswordReset model
✓ Added relation to User model
✓ Created indexes for performance
```

## 🔗 Related Files

- Auth Routes: `backend/src/routes/authRoutes.js`
- Password Utils: `backend/src/utils/password.js`
- JWT Utils: `backend/src/utils/jwt.js`
- Auth Context: `frontend/src/contexts/AuthContext.js`

## 📱 Mobile Responsive

Both pages are fully responsive:
- ✅ Mobile (< 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (> 1024px)

## 🎨 Design Features

- 🌈 Gradient backgrounds
- 🎯 Clear call-to-actions
- 📱 Touch-friendly buttons
- ♿ Accessible forms
- 🔄 Loading states
- ✅ Success/error states
- 💡 Helpful instructions
- ⚠️ Warning messages

## 🌐 Language

All UI text is in **Thai (ภาษาไทย)** for better user experience in Thailand market.

## 📞 Support

For issues or questions:
1. Check logs in backend console
2. Check browser console (frontend)
3. Verify email configuration
4. Check database connection
5. Review this documentation

## ✅ Status Summary

| Component | Status | Notes |
|-----------|--------|-------|
| Database Schema | ✅ Done | PasswordReset model added |
| Backend API | ✅ Done | All endpoints working |
| Email Service | ✅ Done | Dev + Prod modes ready |
| Frontend UI | ✅ Done | Both pages complete |
| Routes | ✅ Done | Integrated with app |
| Testing | ✅ Done | Tested in dev mode |
| Documentation | ✅ Done | This file |
| Security | ✅ Done | Best practices applied |

---

**Implementation Date:** 2026-01-09  
**Implementation Time:** ~2 hours  
**Last Updated:** 2026-01-09

**Ready for Production:** ✅ Yes (after email config)
