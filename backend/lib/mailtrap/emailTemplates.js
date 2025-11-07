export const VERIFICATION_EMAIL_TEMPLATE = ` 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    /* Responsive styles */
    @media only screen and (max-width: 600px) {
      .email-container {
        padding: 20px 12px !important;
      }
      .header {
        padding: 24px 16px !important;
        border-radius: 20px 20px 0 0 !important;
      }
      .header h1 {
        font-size: 24px !important;
      }
      .content-card {
        padding: 28px 20px !important;
        border-radius: 0 0 20px 20px !important;
      }
      .code-box {
        padding: 20px 12px !important;
        border-radius: 12px !important;
      }
      .code {
        font-size: 32px !important;
        letter-spacing: 4px !important;
        word-break: break-all !important;
      }
      .info-box {
        padding: 14px 16px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); min-height: 100vh;">
  <div class="email-container" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header with gradient -->
    <div class="header" style="background: linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #fb923c 100%); padding: 32px 24px; text-align: center; border-radius: 24px 24px 0 0; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -2px; left: 0; right: 0; height: 2px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);"></div>
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 8px rgba(0,0,0,0.15);">Verify Your Email</h1>
      <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">JMP Euroleague</p>
    </div>
    
    <!-- Main content card -->
    <div class="content-card" style="background: white; padding: 40px 32px; border-radius: 0 0 24px 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); border: 1px solid rgba(251, 146, 60, 0.1); border-top: none;">
      
      <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">Hello,</p>
      
      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0;">
        Thank you for signing up! To complete your registration, please use the verification code below:
      </p>
      
      <!-- Verification code box -->
      <div class="code-box" style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border: 2px solid #fb923c; border-radius: 16px; padding: 28px; text-align: center; margin: 0 0 32px 0; box-shadow: 0 4px 12px rgba(251, 146, 60, 0.15);">
        <div style="font-size: 11px; font-weight: 600; letter-spacing: 1.5px; color: #ea580c; text-transform: uppercase; margin-bottom: 12px;">Verification Code</div>
        <div class="code" style="font-size: 40px; font-weight: 700; letter-spacing: 8px; color: #ea580c; font-family: 'Courier New', monospace; text-shadow: 0 2px 4px rgba(251, 146, 60, 0.2); word-wrap: break-word; overflow-wrap: break-word;">{verificationCode}</div>
      </div>
      
      <div class="info-box" style="background: #f8fafc; border-left: 3px solid #fb923c; border-radius: 8px; padding: 16px 20px; margin: 0 0 32px 0;">
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">
          <strong style="color: #1e293b;">⏱️ Important:</strong> This code will expire in <strong style="color: #ea580c;">1 hour</strong> for security reasons.
        </p>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 8px 0;">
        If you didn't create an account with us, you can safely ignore this email.
      </p>
      
      <div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
        <p style="color: #475569; font-size: 15px; margin: 0 0 4px 0;">Best regards,</p>
        <p style="color: #fb923c; font-size: 15px; font-weight: 600; margin: 0;">JMP Euroleague Team</p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding: 0 20px;">
      <p style="color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 0 0 8px 0;">
        This is an automated message, please do not reply to this email.
      </p>
      <p style="color: #cbd5e1; font-size: 12px; margin: 0;">
        © 2025 JMP Euroleague. All rights reserved.
      </p>
    </div>
    
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    /* Responsive styles */
    @media only screen and (max-width: 600px) {
      .email-container {
        padding: 20px 12px !important;
      }
      .header {
        padding: 24px 16px !important;
        border-radius: 20px 20px 0 0 !important;
      }
      .header h1 {
        font-size: 24px !important;
      }
      .content-card {
        padding: 28px 20px !important;
        border-radius: 0 0 20px 20px !important;
      }
      .success-icon {
        width: 64px !important;
        height: 64px !important;
        font-size: 32px !important;
      }
      .info-box {
        padding: 14px 16px !important;
      }
      .security-list {
        padding-left: 20px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); min-height: 100vh;">
  <div class="email-container" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header with gradient -->
    <div class="header" style="background: linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #fb923c 100%); padding: 32px 24px; text-align: center; border-radius: 24px 24px 0 0; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -2px; left: 0; right: 0; height: 2px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);"></div>
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 8px rgba(0,0,0,0.15);">Password Reset Successful</h1>
      <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">JMP Euroleague</p>
    </div>
    
    <!-- Main content card -->
    <div class="content-card" style="background: white; padding: 40px 32px; border-radius: 0 0 24px 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); border: 1px solid rgba(251, 146, 60, 0.1); border-top: none;">
      
      <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">Hello,</p>
      
      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0;">
        We're writing to confirm that your password has been successfully reset.
      </p>
      
      <!-- Success icon -->
      <div style="text-align: center; margin: 0 0 32px 0;">
        <table cellpadding="0" cellspacing="0" border="0" align="center">
          <tr>
            <td class="success-icon" style="background: linear-gradient(135deg, #fb923c, #fbbf24); color: white; width: 80px; height: 80px; border-radius: 50%; text-align: center; vertical-align: middle; font-size: 40px; box-shadow: 0 8px 24px rgba(251, 146, 60, 0.3);">
              ✓
            </td>
          </tr>
        </table>
      </div>
      
      <!-- Alert box -->
      <div class="info-box" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px 24px; margin: 0 0 32px 0;">
        <p style="color: #78350f; font-size: 14px; line-height: 1.6; margin: 0 0 8px 0;">
          <strong style="color: #92400e;">⚠️ Security Alert</strong>
        </p>
        <p style="color: #78350f; font-size: 14px; line-height: 1.6; margin: 0;">
          If you did not initiate this password reset, please contact our support team immediately.
        </p>
      </div>
      
      <!-- Security recommendations -->
      <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 0 0 32px 0;">
        <p style="color: #1e293b; font-size: 15px; font-weight: 600; margin: 0 0 16px 0;">
          🔒 Security Recommendations
        </p>
        <ul class="security-list" style="color: #475569; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 24px;">
          <li style="margin-bottom: 8px;">Use a strong, unique password</li>
          <li style="margin-bottom: 8px;">Enable two-factor authentication if available</li>
          <li style="margin-bottom: 0;">Avoid using the same password across multiple sites</li>
        </ul>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">
        Thank you for helping us keep your account secure.
      </p>
      
      <div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
        <p style="color: #475569; font-size: 15px; margin: 0 0 4px 0;">Best regards,</p>
        <p style="color: #fb923c; font-size: 15px; font-weight: 600; margin: 0;">JMP Euroleague Team</p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding: 0 20px;">
      <p style="color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 0 0 8px 0;">
        This is an automated message, please do not reply to this email.
      </p>
      <p style="color: #cbd5e1; font-size: 12px; margin: 0;">
        © 2025 JMP Euroleague. All rights reserved.
      </p>
    </div>
    
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to JMP Euroleague</title>
  <style>
    /* Responsive styles */
    @media only screen and (max-width: 600px) {
      .email-container {
        padding: 20px 12px !important;
      }
      .header {
        padding: 24px 16px !important;
        border-radius: 20px 20px 0 0 !important;
      }
      .header h1 {
        font-size: 24px !important;
      }
      .content-card {
        padding: 28px 20px !important;
        border-radius: 0 0 20px 20px !important;
      }
      .welcome-icon {
        width: 64px !important;
        height: 64px !important;
        font-size: 32px !important;
      }
      .feature-grid {
        grid-template-columns: 1fr !important;
      }
      .cta-button {
        padding: 14px 28px !important;
        font-size: 15px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); min-height: 100vh;">
  <div class="email-container" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header with gradient -->
    <div class="header" style="background: linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #fb923c 100%); padding: 32px 24px; text-align: center; border-radius: 24px 24px 0 0; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -2px; left: 0; right: 0; height: 2px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);"></div>
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 8px rgba(0,0,0,0.15);">Welcome to JMP Euroleague!</h1>
      <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">Your Account is Ready</p>
    </div>
    
    <!-- Main content card -->
    <div class="content-card" style="background: white; padding: 40px 32px; border-radius: 0 0 24px 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); border: 1px solid rgba(251, 146, 60, 0.1); border-top: none;">
      
      <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 8px 0;">Hello <strong style="color: #fb923c;">__USERNAME__</strong>,</p>
      
      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0;">
        Thank you for joining JMP Euroleague! We're excited to have you on board. Your account has been successfully created and verified.
      </p>
      
      <!-- Welcome icon -->
      <div style="text-align: center; margin: 0 0 32px 0;">
        <table cellpadding="0" cellspacing="0" border="0" align="center">
          <tr>
            <td class="welcome-icon" style="background: linear-gradient(135deg, #fb923c, #fbbf24); color: white; width: 80px; height: 80px; border-radius: 50%; text-align: center; vertical-align: middle; font-size: 40px; box-shadow: 0 8px 24px rgba(251, 146, 60, 0.3); line-height: 80px;">
              🏀
            </td>
          </tr>
        </table>
      </div>
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 0 0 32px 0;">
        <a href="{loginURL}" class="cta-button" style="display: inline-block; background: linear-gradient(135deg, #fb923c, #fbbf24); color: white; padding: 16px 40px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px rgba(251, 146, 60, 0.4); transition: all 0.2s;">
          Get Started
        </a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0; text-align: center;">
        If you have any questions or need assistance, feel free to reach out to us.
      </p>
      
      <div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
        <p style="color: #475569; font-size: 15px; margin: 0 0 4px 0;">Best regards,</p>
        <p style="color: #fb923c; font-size: 15px; font-weight: 600; margin: 0;">JMP Euroleague Team</p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding: 0 20px;">
      <p style="color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 0 0 8px 0;">
        This is an automated message, please do not reply to this email.
      </p>
      <p style="color: #cbd5e1; font-size: 12px; margin: 0;">
        © 2025 JMP Euroleague. All rights reserved.
      </p>
    </div>
    
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    /* Responsive styles */
    @media only screen and (max-width: 600px) {
      .email-container {
        padding: 20px 12px !important;
      }
      .header {
        padding: 24px 16px !important;
        border-radius: 20px 20px 0 0 !important;
      }
      .header h1 {
        font-size: 24px !important;
      }
      .content-card {
        padding: 28px 20px !important;
        border-radius: 0 0 20px 20px !important;
      }
      .reset-button {
        padding: 14px 28px !important;
        font-size: 15px !important;
      }
      .info-box {
        padding: 14px 16px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); min-height: 100vh;">
  <div class="email-container" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header with gradient -->
    <div class="header" style="background: linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #fb923c 100%); padding: 32px 24px; text-align: center; border-radius: 24px 24px 0 0; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -2px; left: 0; right: 0; height: 2px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);"></div>
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 8px rgba(0,0,0,0.15);">Reset Your Password</h1>
      <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">JMP Euroleague</p>
    </div>
    
    <!-- Main content card -->
    <div class="content-card" style="background: white; padding: 40px 32px; border-radius: 0 0 24px 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); border: 1px solid rgba(251, 146, 60, 0.1); border-top: none;">
      
      <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">Hello,</p>
      
      <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 32px 0;">
        We received a request to reset your password. If you didn't make this request, you can safely ignore this email.
      </p>
      
      <!-- Reset button -->
      <div style="text-align: center; margin: 0 0 32px 0;">
        <a href="{resetURL}" class="reset-button" style="display: inline-block; background: linear-gradient(135deg, #fb923c, #fbbf24); color: white; padding: 16px 40px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px rgba(251, 146, 60, 0.4); transition: all 0.2s;">
          Reset Password
        </a>
      </div>
      
      <!-- Expiry warning -->
      <div class="info-box" style="background: #f8fafc; border-left: 3px solid #fb923c; border-radius: 8px; padding: 16px 20px; margin: 0 0 32px 0;">
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">
          <strong style="color: #1e293b;">⏱️ Important:</strong> This link will expire in <strong style="color: #ea580c;">1 hour</strong> for security reasons.
        </p>
      </div>
      
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">
        If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
      </p>
      
      <div style="margin-top: 40px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
        <p style="color: #475569; font-size: 15px; margin: 0 0 4px 0;">Best regards,</p>
        <p style="color: #fb923c; font-size: 15px; font-weight: 600; margin: 0;">JMP Euroleague Team</p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding: 0 20px;">
      <p style="color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 0 0 8px 0;">
        This is an automated message, please do not reply to this email.
      </p>
      <p style="color: #cbd5e1; font-size: 12px; margin: 0;">
        © 2025 JMP Euroleague. All rights reserved.
      </p>
    </div>
    
  </div>
</body>
</html>
`;
