import { Resend } from "resend";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendPasswordResetEmailParams {
  email: string;
  resetUrl: string;
  userName?: string;
}

/**
 * Send password reset email to user
 */
export async function sendPasswordResetEmail({
  email,
  resetUrl,
  userName,
}: SendPasswordResetEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return {
        success: false,
        error: "Email service is not configured",
      };
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "Adhyayan <noreply@adhyayan.edu>";
    const displayName = userName || "User";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Reset Your Adhyayan Password",
      html: getPasswordResetEmailTemplate(displayName, resetUrl),
      text: getPasswordResetEmailText(displayName, resetUrl),
    });

    if (error) {
      console.error("Resend API error:", error);
      return {
        success: false,
        error: "Failed to send email",
      };
    }

    console.log("Password reset email sent successfully:", data);
    return { success: true };
  } catch (error: any) {
    console.error("Error sending password reset email:", error);
    return {
      success: false,
      error: error.message || "Failed to send email",
    };
  }
}

/**
 * HTML email template for password reset
 */
function getPasswordResetEmailTemplate(userName: string, resetUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #2E2E2E; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #EEEEEE; font-size: 28px; font-weight: bold;">Adhyayan</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #2E2E2E; font-size: 24px;">Reset Your Password</h2>
              
              <p style="margin: 0 0 20px; color: #2E2E2E; font-size: 16px; line-height: 1.6;">
                Hello ${userName},
              </p>
              
              <p style="margin: 0 0 20px; color: #2E2E2E; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password for your Adhyayan account. Click the button below to create a new password:
              </p>
              
              <!-- Button -->
              <table role="presentation" style="width: 100%; margin: 30px 0;">
                <tr>
                  <td style="text-align: center;">
                    <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background-color: #2E2E2E; color: #EEEEEE; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Reset Password</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0; color: #6B6B6B; font-size: 14px; line-height: 1.6;">
                Or copy and paste this link into your browser:
              </p>
              
              <p style="margin: 0 0 20px; color: #2E2E2E; font-size: 14px; word-break: break-all;">
                <a href="${resetUrl}" style="color: #2E2E2E; text-decoration: underline;">${resetUrl}</a>
              </p>
              
              <p style="margin: 20px 0 0; color: #6B6B6B; font-size: 14px; line-height: 1.6;">
                This link will expire in 1 hour for security reasons.
              </p>
              
              <p style="margin: 20px 0 0; color: #6B6B6B; font-size: 14px; line-height: 1.6;">
                If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #EEEEEE; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 10px; color: #6B6B6B; font-size: 12px;">
                © ${new Date().getFullYear()} Adhyayan. All rights reserved.
              </p>
              <p style="margin: 0; color: #6B6B6B; font-size: 12px;">
                This is an automated email, please do not reply.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Plain text email template for password reset
 */
function getPasswordResetEmailText(userName: string, resetUrl: string): string {
  return `
Reset Your Adhyayan Password

Hello ${userName},

We received a request to reset your password for your Adhyayan account. Click the link below to create a new password:

${resetUrl}

This link will expire in 1 hour for security reasons.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

© ${new Date().getFullYear()} Adhyayan. All rights reserved.
This is an automated email, please do not reply.
  `.trim();
}

