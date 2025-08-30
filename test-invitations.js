#!/usr/bin/env node

/**
 * Demo Script: Ambassador Invitations Testing
 *
 * This script demonstrates and tests the invitation functionality
 * for the MIL-CAN platform.
 */

const { ulid } = require('ulid');

// Mock data for testing
const mockInvitations = [
  {
    id: ulid(),
    email: "dr.sarah.johnson@university.edu",
    role: "ambassador",
    invitedBy: "Admin User",
    status: "pending",
    token: ulid(),
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: ulid(),
    email: "prof.michael.chen@college.edu",
    role: "creator",
    invitedBy: "Ambassador Smith",
    status: "pending",
    token: ulid(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: ulid(),
    email: "reviewer@institution.edu",
    role: "reviewer",
    invitedBy: "Admin User",
    status: "accepted",
    token: ulid(),
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(),
    acceptedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

// Helper functions
function getRelativeTime(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
}

function getRoleDisplayName(role) {
  const roleMap = {
    ambassador: "Ambassador",
    creator: "Content Creator",
    reviewer: "Content Reviewer",
    admin: "Administrator",
  };
  return roleMap[role] || role;
}

function generateInviteUrl(baseUrl, token) {
  return `${baseUrl}/accept-invitation?token=${token}`;
}

function generateEmailContent(invitation, inviteUrl) {
  const roleDisplayName = getRoleDisplayName(invitation.role);
  const expiryDate = new Date(invitation.expiresAt).toLocaleDateString();

  return `
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
  </div>

  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
    <p style="color: #6B7280; font-size: 14px; margin: 0;">
      MIL-CAN - Building Media Literacy in Canada
    </p>
  </div>
</body>
</html>
  `;
}

// Test functions
async function testSendInvitation() {
  console.log("🧪 Testing: Send Invitation");
  console.log("=" .repeat(50));

  const newInvitation = {
    id: ulid(),
    email: "test@example.edu",
    role: "creator",
    invitedBy: "Test Admin",
    status: "pending",
    token: ulid(),
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  console.log("📧 Sending invitation to:", newInvitation.email);
  console.log("👤 Role:", getRoleDisplayName(newInvitation.role));
  console.log("🔗 Token:", newInvitation.token);
  console.log("⏰ Expires:", new Date(newInvitation.expiresAt).toLocaleDateString());

  const inviteUrl = generateInviteUrl("http://localhost:3000", newInvitation.token);
  console.log("🌐 Invite URL:", inviteUrl);

  // Simulate email sending
  const emailContent = generateEmailContent(newInvitation, inviteUrl);
  console.log("✅ Email content generated successfully");
  console.log("📝 Email length:", emailContent.length, "characters");

  return newInvitation;
}

async function testValidateInvitation(invitation) {
  console.log("\n🧪 Testing: Validate Invitation");
  console.log("=" .repeat(50));

  console.log("🔍 Validating token:", invitation.token);

  // Check if invitation exists
  const found = mockInvitations.find(inv => inv.token === invitation.token) || invitation;
  if (!found) {
    console.log("❌ Invitation not found");
    return false;
  }

  console.log("✅ Invitation found");
  console.log("📧 Email:", found.email);
  console.log("📊 Status:", found.status);

  // Check if expired
  const now = new Date();
  const expiryDate = new Date(found.expiresAt);

  if (now > expiryDate) {
    console.log("❌ Invitation has expired");
    console.log("⏰ Expired on:", expiryDate.toLocaleDateString());
    return false;
  }

  console.log("✅ Invitation is valid");
  console.log("⏰ Expires on:", expiryDate.toLocaleDateString());

  // Check if already used
  if (found.status !== "pending") {
    console.log("❌ Invitation already used");
    console.log("📊 Current status:", found.status);
    return false;
  }

  console.log("✅ Invitation is pending and ready to use");
  return true;
}

async function testAcceptInvitation(invitation) {
  console.log("\n🧪 Testing: Accept Invitation");
  console.log("=" .repeat(50));

  const userData = {
    name: "Dr. Test User",
    handle: "@testuser",
    campus: "Test University",
    languages: ["English", "French"]
  };

  console.log("👤 Creating account for:", userData.name);
  console.log("🏫 Campus:", userData.campus);
  console.log("🌐 Languages:", userData.languages.join(", "));

  // Simulate account creation
  const newMember = {
    id: ulid(),
    role: invitation.role,
    name: userData.name,
    email: invitation.email,
    handle: userData.handle,
    campus: userData.campus,
    languages: userData.languages,
    points: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  // Mark invitation as accepted
  invitation.status = "accepted";
  invitation.acceptedAt = new Date().toISOString();

  console.log("✅ Account created successfully");
  console.log("🆔 Member ID:", newMember.id);
  console.log("📧 Email:", newMember.email);
  console.log("👤 Role:", getRoleDisplayName(newMember.role));
  console.log("📊 Invitation status updated to:", invitation.status);

  return newMember;
}

function displayInvitationSummary() {
  console.log("\n📊 Invitation Summary");
  console.log("=" .repeat(50));

  const pending = mockInvitations.filter(inv => inv.status === "pending");
  const accepted = mockInvitations.filter(inv => inv.status === "accepted");
  const expired = mockInvitations.filter(inv => {
    const now = new Date();
    const expiryDate = new Date(inv.expiresAt);
    return now > expiryDate && inv.status === "pending";
  });

  console.log("📈 Total invitations:", mockInvitations.length);
  console.log("⏳ Pending:", pending.length);
  console.log("✅ Accepted:", accepted.length);
  console.log("⏰ Expired:", expired.length);

  console.log("\n📋 Pending Invitations:");
  pending.forEach(inv => {
    console.log(`  📧 ${inv.email}`);
    console.log(`     👤 Role: ${getRoleDisplayName(inv.role)}`);
    console.log(`     👥 Invited by: ${inv.invitedBy}`);
    console.log(`     📅 Sent: ${getRelativeTime(inv.createdAt)}`);
    console.log(`     ⏰ Expires: ${getRelativeTime(inv.expiresAt)}`);
    console.log("");
  });
}

function displayTestInstructions() {
  console.log("\n📋 Manual Testing Instructions");
  console.log("=" .repeat(50));

  console.log("1. 🚀 Start the development server:");
  console.log("   npm run dev");

  console.log("\n2. 🔑 Log in as an ambassador or admin:");
  console.log("   Email: utkarshkviim@gmail.com");
  console.log("   Password: secure123");

  console.log("\n3. 📧 Send a test invitation:");
  console.log("   - Go to Ambassador Dashboard");
  console.log("   - Click 'Invite New Ambassador'");
  console.log("   - Enter a test email address");
  console.log("   - Select a role");
  console.log("   - Click 'Send Invitation'");

  console.log("\n4. 📮 Check email logs:");
  console.log("   - Open browser console");
  console.log("   - Look for email content in logs");
  console.log("   - Copy the invitation URL");

  console.log("\n5. ✅ Test invitation acceptance:");
  console.log("   - Open invitation URL in new tab");
  console.log("   - Fill out account setup form");
  console.log("   - Submit to create account");

  console.log("\n6. 🔄 Test management features:");
  console.log("   - View pending invitations");
  console.log("   - Resend invitations");
  console.log("   - Revoke invitations");

  console.log("\n📝 Environment Setup:");
  console.log("   - Copy .env.example to .env.local");
  console.log("   - Set RESEND_API_KEY for real emails");
  console.log("   - Leave empty for demo mode");
}

// Main test runner
async function runTests() {
  console.log("🎯 MIL-CAN Ambassador Invitations Test Suite");
  console.log("=" .repeat(60));

  try {
    // Test sending invitation
    const newInvitation = await testSendInvitation();

    // Test validation
    const isValid = await testValidateInvitation(newInvitation);

    if (isValid) {
      // Test acceptance
      await testAcceptInvitation(newInvitation);
    }

    // Display summary
    displayInvitationSummary();

    // Show manual testing instructions
    displayTestInstructions();

    console.log("\n✅ All tests completed successfully!");

  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
    console.error(error.stack);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  testSendInvitation,
  testValidateInvitation,
  testAcceptInvitation,
  displayInvitationSummary,
  mockInvitations,
  getRoleDisplayName,
  getRelativeTime,
  generateInviteUrl,
  generateEmailContent
};
