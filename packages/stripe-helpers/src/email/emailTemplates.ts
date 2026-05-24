/**
 * emailTemplates.ts
 * Default and custom email templates for access codes
 */

interface EmailTemplateParams {
  appName?: string;
  supportEmail?: string;
  appUrl?: string;
  brandColor?: string;
}

export function getDefaultEmailTemplate({
  appName = 'ChAICodes',
  supportEmail = 'support@chaicodes.com',
  appUrl = 'https://chaicodes.com',
  brandColor = '#C8102E',
}: EmailTemplateParams = {}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Lora', Georgia, serif;
          background-color: #f5f5f5;
          color: #333;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: white;
          padding: 40px;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          border-bottom: 2px solid ${brandColor};
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: ${brandColor};
          margin: 0;
          font-size: 24px;
        }
        .content {
          margin: 20px 0;
        }
        .code-box {
          background-color: #f0f0f0;
          border: 2px solid ${brandColor};
          border-radius: 4px;
          padding: 20px;
          text-align: center;
          margin: 20px 0;
        }
        .code-box p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
        .code-box .code {
          font-family: monospace;
          font-size: 18px;
          font-weight: bold;
          color: ${brandColor};
          letter-spacing: 2px;
          margin: 10px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
        .footer a {
          color: ${brandColor};
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to ${appName}! 🎉</h1>
        </div>

        <div class="content">
          <p>Hi {email},</p>

          <p>Thank you for subscribing to ${appName}! We're excited to have you on board.</p>

          <p>Your access code is:</p>

          <div class="code-box">
            <p>Your Access Code</p>
            <div class="code">{accessCode}</div>
            <p>Use this to log in to your account</p>
          </div>

          <p>
            Questions or need help? Contact us at 
            <a href="mailto:${supportEmail}">${supportEmail}</a>
          </p>

          <p>
            Visit us at <a href="${appUrl}">${appName}</a>
          </p>
        </div>

        <div class="footer">
          <p>© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
          <p>Built by <a href="https://chaicodes.com">ChAI Codes</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function buildCustomEmailTemplate(templateFn: (() => string) | any): any {
  if (typeof templateFn !== 'function') {
    throw new Error('Template must be a function');
  }

  // Validate that the function returns a string
  const result = templateFn();
  if (typeof result !== 'string') {
    throw new Error('Template function must return a string');
  }

  return templateFn;
}

export default {
  getDefaultEmailTemplate,
  buildCustomEmailTemplate,
};
