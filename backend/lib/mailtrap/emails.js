import { mailtrapClient, sender } from "./mailtrap.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Error in sendVerificationEmail:", error.message);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "dad839d8-9254-441b-a347-fcc667613402",
      template_variables: {
        company_info_name: "JMP Euroleague",
        name: username,
      },
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Error in sendWelcomeEmail:", error.message);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.log("Error in sendPasswordResetEmail:", error.message);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
  } catch (error) {
    console.log("Error in sendResetSuccessEmail:", error.message);
    throw new Error(`Error sending password reset success email: ${error.message}`);
  }
};
