"use server";

import { revalidatePath } from "next/cache";
import { emailService } from "./email-service";
import { ulid } from "ulid";
import type { Invitation, MemberRole } from "./types";

export async function sendInvitationAction(email: string, role: MemberRole, invitedBy: string) {
  try {
    // Generate unique token and expiry (30 days from now)
    const token = ulid();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const invitation: Invitation = {
      id: ulid(),
      email,
      role,
      invitedBy,
      status: "pending",
      token,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    // Send email invitation
    const emailSent = await emailService.sendInvitationEmail({
      email: invitation.email,
      role: invitation.role,
      invitedBy: invitation.invitedBy,
      token: invitation.token,
      expiresAt: invitation.expiresAt,
    });

    if (!emailSent) {
      throw new Error("Failed to send invitation email");
    }

    // In a real app, you would save this to your database
    // For now, we'll return the invitation object
    console.log("✅ Invitation created and email sent:", invitation);

    revalidatePath("/ambassador-dashboard");

    return {
      success: true,
      data: invitation,
      message: "Invitation sent successfully",
    };
  } catch (error) {
    console.error("Error sending invitation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send invitation",
    };
  }
}

export async function resendInvitationAction(invitationId: string, invitation: Invitation) {
  try {
    // Send email invitation
    const emailSent = await emailService.sendInvitationEmail({
      email: invitation.email,
      role: invitation.role,
      invitedBy: invitation.invitedBy,
      token: invitation.token,
      expiresAt: invitation.expiresAt,
    });

    if (!emailSent) {
      throw new Error("Failed to resend invitation email");
    }

    console.log("✅ Invitation resent:", invitationId);

    revalidatePath("/ambassador-dashboard");

    return {
      success: true,
      message: "Invitation resent successfully",
    };
  } catch (error) {
    console.error("Error resending invitation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to resend invitation",
    };
  }
}

export async function revokeInvitationAction(invitationId: string) {
  try {
    // In a real app, you would delete this from your database
    console.log("✅ Invitation revoked:", invitationId);

    revalidatePath("/ambassador-dashboard");

    return {
      success: true,
      message: "Invitation revoked successfully",
    };
  } catch (error) {
    console.error("Error revoking invitation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to revoke invitation",
    };
  }
}

export async function validateInvitationToken(token: string): Promise<Invitation | null> {
  try {
    // In a real app, you would query your database for the invitation
    // For demo purposes, we'll return null (invitation not found)
    console.log("🔍 Validating invitation token:", token);
    return null;
  } catch (error) {
    console.error("Error validating invitation token:", error);
    return null;
  }
}

export async function acceptInvitationAction(
  token: string,
  userData: {
    name: string;
    handle: string;
    campus: string;
    languages: string[];
  }
) {
  try {
    const invitation = await validateInvitationToken(token);

    if (!invitation) {
      return {
        success: false,
        error: "Invalid or expired invitation",
      };
    }

    if (invitation.status !== "pending") {
      return {
        success: false,
        error: "Invitation has already been used",
      };
    }

    if (new Date() > new Date(invitation.expiresAt)) {
      return {
        success: false,
        error: "Invitation has expired",
      };
    }

    // In a real app, you would:
    // 1. Create the new member in the database
    // 2. Mark the invitation as accepted
    // 3. Send welcome email
    console.log("✅ Invitation accepted:", { token, userData, invitation });

    return {
      success: true,
      message: "Account created successfully",
      data: {
        email: invitation.email,
        role: invitation.role,
        ...userData,
      },
    };
  } catch (error) {
    console.error("Error accepting invitation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to accept invitation",
    };
  }
}
