const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendPasswordResetEmail(email, name, resetTokenLink) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Reset",
      html: `<div class="container" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
    <h1 style="color: #333; text-align: center;">Password Reset Request</h1>
    <p>Hello ${name},</p>
    <p>You requested to reset your password. Click the link below to set a new password:</p>
    <a href="${resetTokenLink}" class="button" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; text-align: center;">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
    <p>Thank you,<br></p>
    <div class="footer" style="margin-top: 20px; text-align: center;">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
    </div>
</div>
`,
    });
    return {
      success: true,
      message: "Password Reset link send to email successfully",
    };
  } catch (error) {
    console.error("Error sending Password Reset link to email", error);
    return {
      success: false,
      message: "Failed to send Password Reset link to email",
    };
  }
}

async function sendEmailToAdmin(email, issue, message, phone) {
  try {
    await resend.emails.send({
      from: `Gumflow_Support@resend.dev`,
      to: process.env.COMPANY_EMAIL,
      subject: `Email from gumflow user ${email}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
        <h1 style="color: #4CAF50;">Support Request</h1>
      </header>
      <section style="padding: 20px 0;">
        <p style="font-size: 16px; color: #555;">Hello Admin,</p>
        <p style="font-size: 16px; color: #555;">You have received a new support request with the following details:</p>
        <div style="padding: 10px 0; line-height: 1.6;">
          <p><strong>Email:</strong> <span style="color: #333;">${email}</span></p>
          <p><strong>Issue:</strong> <span style="color: #333;">${issue}</span></p>
          <p><strong>Message:</strong> <span style="color: #333;">${message}</span></p>
          <p><strong>Phone:</strong> <span style="color: #333;">${phone}</span></p>
        </div>
      </section>
      <footer style="margin-top: 20px; text-align: center; border-top: 1px solid #ddd; padding-top: 20px;">
        <p style="font-size: 12px; color: #aaa;">&copy; 2024 Gumflow. All rights reserved.</p>
      </footer>
    </div>
`,
    });

    return {
      success: true,
      message: "Support email send successfully",
    };
  } catch (error) {
    console.error("Error sending verification email", error);
    return {
      success: false,
      message: "Failed to send support email",
    };
  }
}

module.exports = {
  resend,
  sendPasswordResetEmail,
  sendEmailToAdmin,
};
