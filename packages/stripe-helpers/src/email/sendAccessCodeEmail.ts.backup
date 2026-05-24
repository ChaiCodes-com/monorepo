/**
 * sendAccessCodeEmail.js
 * Sends access code email via SMTP
 */

export async function sendAccessCodeEmail({
  email,
  accessCode,
  appName = 'ChAICodes',
  emailTemplate,
  smtpConfig,
  expiresAt = null,
}) {
  if (!email || !accessCode) {
    throw new Error('Email and access code are required');
  }

  if (!smtpConfig) {
    console.warn('SMTP config not provided, skipping email send');
    return {
      success: true,
      message: 'Email sending skipped (no SMTP config)',
    };
  }

  try {
    const nodemailer = require('nodemailer');

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure || true,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.password,
      },
    });

    // Replace placeholders in template
    const html = emailTemplate
      .replace('{accessCode}', accessCode)
      .replace('{appName}', appName)
      .replace('{email}', email)
      .replace('{expiresAt}', expiresAt || 'N/A');

    // Send email
    const info = await transporter.sendMail({
      from: smtpConfig.from || `noreply@${appName.toLowerCase()}.com`,
      to: email,
      subject: `Your ${appName} Access Code`,
      html: html,
    });

    console.log(`Email sent to ${email}: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
      recipient: email,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default sendAccessCodeEmail;
