// Resend interface for email sending
interface ResendEmail {
  id?: string;
}

interface ResendResponse {
  data?: ResendEmail;
  error?: any;
}

interface ResendEmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

// Dynamic import for Resend to handle cases where it's not installed
async function createResend(apiKey: string) {
  try {
    const { Resend } = await import("resend");
    return new Resend(apiKey);
  } catch (error) {
    console.warn("Resend package not found. Install with: npm install resend");
    return null;
  }
}

export interface EmailInvitation {
  email: string;
  role: string;
  invitedBy: string;
  token: string;
  expiresAt: string;
}

export interface EmailServiceConfig {
  apiKey?: string;
  fromEmail: string;
  fromName: string;
  baseUrl: string;
}

class EmailService {
  private config: EmailServiceConfig;

  constructor(config: EmailServiceConfig) {
    this.config = config;
  }

  async sendInvitationEmail(invitation: EmailInvitation): Promise<boolean> {
    try {
      const inviteUrl = `${this.config.baseUrl}/accept-invitation?token=${invitation.token}`;

      const emailContent = this.generateInvitationEmailContent(
        invitation,
        inviteUrl,
      );

      // Log the email content for debugging
      console.log("📧 Sending Invitation Email:");
      console.log("To:", invitation.email);
      console.log("Subject:", emailContent.subject);
      console.log("Invite URL:", inviteUrl);

      if (this.config.apiKey) {
        // Try to send with real Resend API
        const resend = await createResend(this.config.apiKey);

        if (resend) {
          const result = await resend.emails.send({
            from: `${this.config.fromName} <${this.config.fromEmail}>`,
            to: invitation.email,
            subject: emailContent.subject,
            html: emailContent.html,
          });

          if (result.error) {
            console.error("❌ Resend API error:", result.error);
            console.log("📧 Falling back to demo mode...");
            this.logDemoEmail(emailContent);
            return false;
          }

          console.log(
            "✅ Email sent successfully with Resend:",
            result.data?.id,
          );
          return true;
        } else {
          console.log("📧 Resend not available, using demo mode:");
          this.logDemoEmail(emailContent);
          return true;
        }
      } else {
        // Demo mode - just log the email
        console.log("📧 Demo Mode (no API key provided):");
        this.logDemoEmail(emailContent);
        return true;
      }
    } catch (error) {
      console.error("❌ Error sending invitation email:", error);
      return false;
    }
  }

  private logDemoEmail(emailContent: { subject: string; html: string }) {
    console.log("📧 Email Subject:", emailContent.subject);
    console.log(
      "📧 Email Content Preview:",
      emailContent.html.substring(0, 200) + "...",
    );
    console.log("⚠️ To send real emails:");
    console.log("  1. Install Resend: npm install resend");
    console.log("  2. Get API key from https://resend.com");
    console.log("  3. Set RESEND_API_KEY in .env.local");
    console.log("  4. Verify your domain in Resend dashboard");
  }

  private generateInvitationEmailContent(
    invitation: EmailInvitation,
    inviteUrl: string,
  ) {
    const roleDisplayName = this.getRoleDisplayName(invitation.role);
    const expiryDate = new Date(invitation.expiresAt).toLocaleDateString();

    const subject = `You're invited to join MIL-CAN as a ${roleDisplayName}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>MIL-CAN Invitation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%); padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: #FFF; margin: 0; font-size: 28px;">MIL-CAN</h1>
            <p style="color: #E9D5FF; margin: 10px 0 0 0; font-size: 16px;">Media Information Literacy - Canada</p>
          </div>

          <div style="background: #F8FAFC; padding: 30px; border-radius: 10px; border-left: 4px solid #6B46C1;">
            <h2 style="color: #6B46C1; margin-top: 0;">You've been invited!</h2>
            <p>Hello,</p>
            <p>You've been invited by <strong>${invitation.invitedBy}</strong> to join the MIL-CAN platform as a <strong>${roleDisplayName}</strong>.</p>

            <div style="background: #FFFFFF; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #E2E8F0;">
              <h3 style="color: #374151; margin-top: 0;">About Your Role:</h3>
              ${this.getRoleDescription(invitation.role)}
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${inviteUrl}"
                 style="background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%);
                        color: white;
                        padding: 15px 30px;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: bold;
                        display: inline-block;
                        box-shadow: 0 4px 6px rgba(107, 70, 193, 0.2);">
                Accept Invitation
              </a>
            </div>

            <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">
              <strong>Important:</strong> This invitation will expire on <strong>${expiryDate}</strong>.
              Please accept it before then to join the platform.
            </p>

            <p style="color: #6B7280; font-size: 14px;">
              If you can't click the button above, copy and paste this link into your browser:<br>
              <code style="background: #F3F4F6; padding: 5px; border-radius: 4px; word-break: break-all;">${inviteUrl}</code>
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
            <p style="color: #6B7280; font-size: 14px; margin: 0;">
              MIL-CAN - Building Media Literacy in Canada<br>
              <a href="${this.config.baseUrl}" style="color: #6B46C1; text-decoration: none;">${this.config.baseUrl}</a>
            </p>
          </div>
        </body>
      </html>
    `;

    return { subject, html };
  }

  private getRoleDisplayName(role: string): string {
    const roleMap: Record<string, string> = {
      ambassador: "Ambassador",
      creator: "Content Creator",
      reviewer: "Content Reviewer",
      admin: "Administrator",
    };
    return roleMap[role] || role;
  }

  private getRoleDescription(role: string): string {
    const descriptions: Record<string, string> = {
      ambassador: `
        <p>As an <strong>Ambassador</strong>, you'll:</p>
        <ul>
          <li>Mentor content creators and help them improve their work</li>
          <li>Curate and review educational content</li>
          <li>Lead community initiatives and workshops</li>
          <li>Help build media literacy awareness in your region</li>
        </ul>
      `,
      creator: `
        <p>As a <strong>Content Creator</strong>, you'll:</p>
        <ul>
          <li>Create educational content about media literacy</li>
          <li>Submit videos, carousels, and scripts for review</li>
          <li>Collaborate with ambassadors and other creators</li>
          <li>Earn points for approved content and community engagement</li>
        </ul>
      `,
      reviewer: `
        <p>As a <strong>Content Reviewer</strong>, you'll:</p>
        <ul>
          <li>Review and provide feedback on submitted content</li>
          <li>Ensure accuracy and quality of educational materials</li>
          <li>Help maintain platform standards</li>
          <li>Support the content creation community</li>
        </ul>
      `,
      admin: `
        <p>As an <strong>Administrator</strong>, you'll:</p>
        <ul>
          <li>Manage platform settings and configurations</li>
          <li>Oversee user accounts and permissions</li>
          <li>Monitor platform activity and performance</li>
          <li>Support all user roles with technical assistance</li>
        </ul>
      `,
    };
    return (
      descriptions[role] ||
      "<p>You'll be able to participate in the MIL-CAN community.</p>"
    );
  }
}

// Create a singleton instance
export const emailService = new EmailService({
  apiKey: process.env.RESEND_API_KEY,
  fromEmail: process.env.EMAIL_FROM || "noreply@mil-can.org",
  fromName: "MIL-CAN Platform",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
});

// Export for testing and custom configurations
export { EmailService };
