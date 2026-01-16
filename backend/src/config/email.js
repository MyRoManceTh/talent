const nodemailer = require('nodemailer');
const logger = require('./logger');

// Email configuration
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

// Create reusable transporter
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport(emailConfig);
    logger.info('Email transporter initialized');
  }
  return transporter;
};

/**
 * Send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text body
 * @param {string} options.html - HTML body
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // If email is not configured, log instead of sending
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      logger.warn('Email not configured. Email content:');
      logger.info({
        to,
        subject,
        text,
      });
      return { success: true, messageId: 'dev-mode-no-email' };
    }

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Expert Connect'}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await getTransporter().sendMail(mailOptions);
    logger.info(`Email sent successfully to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
};

/**
 * Send password reset email
 */
const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

  const subject = 'รีเซ็ตรหัสผ่าน - Expert Connect';
  const text = `
สวัสดี คุณ${user.firstName} ${user.lastName}

เราได้รับคำขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ

กรุณาคลิกลิงก์ด้านล่างเพื่อรีเซ็ตรหัสผ่านของคุณ:
${resetUrl}

ลิงก์นี้จะหมดอายุใน 1 ชั่วโมง

หากคุณไม่ได้ทำการขอรีเซ็ตรหัสผ่าน กรุณาเพิกเฉยอีเมลนี้

ขอบคุณครับ/ค่ะ
ทีมงาน Expert Connect
  `;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Sarabun', 'Noto Sans Thai', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .content {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      color: #4F46E5;
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #4F46E5;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
    }
    .button:hover {
      background-color: #4338CA;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #666;
      font-size: 14px;
    }
    .warning {
      background-color: #FEF3C7;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      border-left: 4px solid #F59E0B;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <div class="header">
        <h1>🔐 รีเซ็ตรหัสผ่าน</h1>
      </div>
      
      <p>สวัสดีค่ะ/ครับ <strong>${user.firstName} ${user.lastName}</strong></p>
      
      <p>เราได้รับคำขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณที่ <strong>${user.email}</strong></p>
      
      <p>กรุณาคลิกปุ่มด้านล่างเพื่อสร้างรหัสผ่านใหม่:</p>
      
      <div style="text-align: center;">
        <a href="${resetUrl}" class="button">รีเซ็ตรหัสผ่าน</a>
      </div>
      
      <div class="warning">
        <strong>⚠️ สำคัญ:</strong>
        <ul style="margin: 10px 0;">
          <li>ลิงก์นี้จะหมดอายุใน <strong>1 ชั่วโมง</strong></li>
          <li>ใช้งานได้เพียงครั้งเดียว</li>
          <li>อย่าแชร์ลิงก์นี้กับผู้อื่น</li>
        </ul>
      </div>
      
      <p style="color: #666; font-size: 14px;">
        หากปุ่มด้านบนไม่ทำงาน กรุณาคัดลอกและวางลิงก์นี้ในเบราว์เซอร์:<br>
        <code style="background: #f3f4f6; padding: 5px 10px; border-radius: 4px; display: inline-block; margin-top: 5px;">
          ${resetUrl}
        </code>
      </p>
      
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      
      <p style="color: #666; font-size: 14px;">
        <strong>หากคุณไม่ได้ทำการขอรีเซ็ตรหัสผ่าน</strong> กรุณาเพิกเฉยอีเมลนี้ 
        บัญชีของคุณยังคงปลอดภัย และรหัสผ่านจะไม่มีการเปลี่ยนแปลง
      </p>
      
      <div class="footer">
        <p>ขอบคุณที่ใช้บริการ Expert Connect</p>
        <p style="color: #999; font-size: 12px;">
          © 2024 Expert Connect. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({ to: user.email, subject, text, html });
};

/**
 * Send password changed confirmation email
 */
const sendPasswordChangedEmail = async (user) => {
  const subject = 'แจ้งเตือน: รหัสผ่านของคุณถูกเปลี่ยนแล้ว - Expert Connect';
  const text = `
สวัสดี คุณ${user.firstName} ${user.lastName}

รหัสผ่านสำหรับบัญชี ${user.email} ของคุณได้ถูกเปลี่ยนแปลงเรียบร้อยแล้ว

หากคุณไม่ได้ทำการเปลี่ยนรหัสผ่าน กรุณาติดต่อทีมงานของเราทันที

ทีมงาน Expert Connect
  `;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Sarabun', 'Noto Sans Thai', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .content {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .success {
      background-color: #D1FAE5;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      border-left: 4px solid #10B981;
    }
    .warning {
      background-color: #FEE2E2;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      border-left: 4px solid #EF4444;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <h2 style="color: #10B981;">✅ รหัสผ่านถูกเปลี่ยนแล้ว</h2>
      
      <p>สวัสดีค่ะ/ครับ <strong>${user.firstName} ${user.lastName}</strong></p>
      
      <div class="success">
        <p style="margin: 0;">รหัสผ่านสำหรับบัญชี <strong>${user.email}</strong> ของคุณได้ถูกเปลี่ยนเรียบร้อยแล้ว</p>
      </div>
      
      <p>คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้ทันที</p>
      
      <div class="warning">
        <p style="margin: 0;"><strong>⚠️ สำคัญ:</strong></p>
        <p style="margin: 5px 0 0 0;">หากคุณ<strong>ไม่ได้</strong>ทำการเปลี่ยนรหัสผ่าน กรุณาติดต่อทีมงานของเราทันที</p>
      </div>
      
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      
      <p style="color: #666; font-size: 14px;">ขอบคุณที่ใช้บริการ Expert Connect</p>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail({ to: user.email, subject, text, html });
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
};
