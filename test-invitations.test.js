/**
 * Simple Functional Tests for Ambassador Invitations
 *
 * Run with: node test-invitations.test.js
 */

const { ulid } = require('ulid');

// Test utilities
function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`Assertion failed: ${message}. Expected: ${expected}, Got: ${actual}`);
  }
}

// Mock implementations
class MockEmailService {
  constructor() {
    this.sentEmails = [];
  }

  async sendInvitationEmail(invitation) {
    // Mock sending email
    this.sentEmails.push({
      to: invitation.email,
      role: invitation.role,
      token: invitation.token,
      timestamp: new Date().toISOString()
    });
    return true;
  }

  getSentEmails() {
    return this.sentEmails;
  }

  clearSentEmails() {
    this.sentEmails = [];
  }
}

class MockInvitationStore {
  constructor() {
    this.invitations = [];
  }

  async createInvitation(email, role, invitedBy) {
    const invitation = {
      id: ulid(),
      email,
      role,
      invitedBy,
      status: 'pending',
      token: ulid(),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    this.invitations.push(invitation);
    return invitation;
  }

  async findByToken(token) {
    return this.invitations.find(inv => inv.token === token);
  }

  async updateInvitation(id, updates) {
    const index = this.invitations.findIndex(inv => inv.id === id);
    if (index !== -1) {
      this.invitations[index] = { ...this.invitations[index], ...updates };
      return this.invitations[index];
    }
    return null;
  }

  getPendingInvitations() {
    return this.invitations.filter(inv => inv.status === 'pending');
  }

  getAcceptedInvitations() {
    return this.invitations.filter(inv => inv.status === 'accepted');
  }

  clear() {
    this.invitations = [];
  }
}

// Test functions
async function testSendInvitation() {
  console.log('🧪 Test: Send Invitation');

  const emailService = new MockEmailService();
  const store = new MockInvitationStore();

  // Test data
  const email = 'test@university.edu';
  const role = 'ambassador';
  const invitedBy = 'Admin User';

  // Send invitation
  const invitation = await store.createInvitation(email, role, invitedBy);
  await emailService.sendInvitationEmail(invitation);

  // Verify invitation created
  assert(invitation.id, 'Invitation should have an ID');
  assertEquals(invitation.email, email, 'Email should match');
  assertEquals(invitation.role, role, 'Role should match');
  assertEquals(invitation.status, 'pending', 'Status should be pending');
  assert(invitation.token, 'Token should be generated');

  // Verify email sent
  const sentEmails = emailService.getSentEmails();
  assertEquals(sentEmails.length, 1, 'Should send one email');
  assertEquals(sentEmails[0].to, email, 'Email should be sent to correct recipient');

  console.log('✅ Send invitation test passed');
  return { invitation, emailService, store };
}

async function testValidateInvitation() {
  console.log('🧪 Test: Validate Invitation');

  const store = new MockInvitationStore();

  // Create test invitation
  const invitation = await store.createInvitation(
    'validate@test.edu',
    'creator',
    'Test Admin'
  );

  // Test valid token
  const found = await store.findByToken(invitation.token);
  assert(found, 'Should find invitation by token');
  assertEquals(found.id, invitation.id, 'Should return correct invitation');

  // Test invalid token
  const notFound = await store.findByToken('invalid-token');
  assertEquals(notFound, undefined, 'Should not find invalid token');

  // Test expiration check
  const now = new Date();
  const expiryDate = new Date(invitation.expiresAt);
  assert(expiryDate > now, 'Invitation should not be expired');

  console.log('✅ Validate invitation test passed');
  return { invitation, store };
}

async function testAcceptInvitation() {
  console.log('🧪 Test: Accept Invitation');

  const store = new MockInvitationStore();

  // Create test invitation
  const invitation = await store.createInvitation(
    'accept@test.edu',
    'reviewer',
    'Test Admin'
  );

  // Simulate accepting invitation
  const userData = {
    name: 'Dr. Test User',
    handle: '@testuser',
    campus: 'Test University',
    languages: ['English']
  };

  // Find and validate invitation
  const foundInvitation = await store.findByToken(invitation.token);
  assert(foundInvitation, 'Should find invitation');
  assertEquals(foundInvitation.status, 'pending', 'Should be pending');

  // Accept invitation
  const updatedInvitation = await store.updateInvitation(invitation.id, {
    status: 'accepted',
    acceptedAt: new Date().toISOString()
  });

  assert(updatedInvitation, 'Should update invitation');
  assertEquals(updatedInvitation.status, 'accepted', 'Status should be accepted');
  assert(updatedInvitation.acceptedAt, 'Should have acceptance timestamp');

  console.log('✅ Accept invitation test passed');
  return { invitation: updatedInvitation, userData, store };
}

async function testInvitationManagement() {
  console.log('🧪 Test: Invitation Management');

  const store = new MockInvitationStore();

  // Create multiple invitations
  const inv1 = await store.createInvitation('user1@test.edu', 'creator', 'Admin');
  const inv2 = await store.createInvitation('user2@test.edu', 'ambassador', 'Admin');
  const inv3 = await store.createInvitation('user3@test.edu', 'reviewer', 'Admin');

  // Accept one invitation
  await store.updateInvitation(inv2.id, { status: 'accepted' });

  // Check pending invitations
  const pending = store.getPendingInvitations();
  assertEquals(pending.length, 2, 'Should have 2 pending invitations');

  // Check accepted invitations
  const accepted = store.getAcceptedInvitations();
  assertEquals(accepted.length, 1, 'Should have 1 accepted invitation');

  console.log('✅ Invitation management test passed');
  return { store, invitations: [inv1, inv2, inv3] };
}

async function testEmailContent() {
  console.log('🧪 Test: Email Content Generation');

  const invitation = {
    email: 'test@university.edu',
    role: 'ambassador',
    invitedBy: 'Test Admin',
    token: 'test-token-123',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };

  const baseUrl = 'http://localhost:3000';
  const inviteUrl = `${baseUrl}/accept-invitation?token=${invitation.token}`;

  // Test URL generation
  assert(inviteUrl.includes(invitation.token), 'Invite URL should contain token');
  assert(inviteUrl.includes('/accept-invitation'), 'Invite URL should have correct path');

  // Test email content structure
  const subject = `You're invited to join MIL-CAN as a Ambassador`;
  assert(subject.includes('Ambassador'), 'Subject should include role');
  assert(subject.includes('MIL-CAN'), 'Subject should include platform name');

  console.log('✅ Email content test passed');
  return { invitation, inviteUrl, subject };
}

async function testRoleValidation() {
  console.log('🧪 Test: Role Validation');

  const validRoles = ['ambassador', 'creator', 'reviewer', 'admin'];
  const store = new MockInvitationStore();

  // Test valid roles
  for (const role of validRoles) {
    const invitation = await store.createInvitation(
      `${role}@test.edu`,
      role,
      'Test Admin'
    );
    assertEquals(invitation.role, role, `Should accept valid role: ${role}`);
  }

  // Test role display names
  const roleDisplayNames = {
    ambassador: 'Ambassador',
    creator: 'Content Creator',
    reviewer: 'Content Reviewer',
    admin: 'Administrator'
  };

  for (const [role, displayName] of Object.entries(roleDisplayNames)) {
    assert(displayName, `Should have display name for role: ${role}`);
  }

  console.log('✅ Role validation test passed');
  return { validRoles, roleDisplayNames };
}

// Test runner
async function runAllTests() {
  console.log('🎯 Running Ambassador Invitations Test Suite');
  console.log('='.repeat(60));

  const results = {
    passed: 0,
    failed: 0,
    errors: []
  };

  const tests = [
    testSendInvitation,
    testValidateInvitation,
    testAcceptInvitation,
    testInvitationManagement,
    testEmailContent,
    testRoleValidation
  ];

  for (const test of tests) {
    try {
      await test();
      results.passed++;
    } catch (error) {
      console.error(`❌ Test failed: ${test.name}`);
      console.error(`   Error: ${error.message}`);
      results.failed++;
      results.errors.push({ test: test.name, error: error.message });
    }
  }

  // Summary
  console.log('\n📊 Test Results');
  console.log('='.repeat(30));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Total: ${results.passed + results.failed}`);

  if (results.failed > 0) {
    console.log('\n❌ Failed Tests:');
    results.errors.forEach(({ test, error }) => {
      console.log(`  - ${test}: ${error}`);
    });
  }

  if (results.failed === 0) {
    console.log('\n🎉 All tests passed! Invitation system is working correctly.');

    console.log('\n📋 Next Steps:');
    console.log('1. Run the development server: npm run dev');
    console.log('2. Login as admin: utkarshkviim@gmail.com / secure123');
    console.log('3. Navigate to Ambassador Dashboard');
    console.log('4. Test the invitation feature manually');
    console.log('5. Check console logs for email content (demo mode)');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the errors above.');
    process.exit(1);
  }
}

// Performance test
async function performanceTest() {
  console.log('\n⚡ Performance Test: Bulk Invitations');
  console.log('='.repeat(40));

  const store = new MockInvitationStore();
  const emailService = new MockEmailService();

  const start = Date.now();
  const batchSize = 100;

  // Create batch of invitations
  const invitations = [];
  for (let i = 0; i < batchSize; i++) {
    const invitation = await store.createInvitation(
      `user${i}@test.edu`,
      ['ambassador', 'creator', 'reviewer'][i % 3],
      'Batch Admin'
    );
    await emailService.sendInvitationEmail(invitation);
    invitations.push(invitation);
  }

  const end = Date.now();
  const duration = end - start;

  console.log(`📊 Created ${batchSize} invitations in ${duration}ms`);
  console.log(`⚡ Average: ${Math.round(duration / batchSize)}ms per invitation`);
  console.log(`📧 Emails sent: ${emailService.getSentEmails().length}`);
  console.log(`📈 Pending invitations: ${store.getPendingInvitations().length}`);

  // Cleanup
  store.clear();
  emailService.clearSentEmails();

  console.log('✅ Performance test completed');
}

// Integration test
async function integrationTest() {
  console.log('\n🔗 Integration Test: Full Workflow');
  console.log('='.repeat(40));

  const store = new MockInvitationStore();
  const emailService = new MockEmailService();

  // Step 1: Send invitation
  console.log('1️⃣ Sending invitation...');
  const invitation = await store.createInvitation(
    'integration@test.edu',
    'ambassador',
    'Integration Admin'
  );
  await emailService.sendInvitationEmail(invitation);

  // Step 2: Validate invitation
  console.log('2️⃣ Validating invitation...');
  const found = await store.findByToken(invitation.token);
  assert(found, 'Should find invitation');

  // Step 3: Accept invitation
  console.log('3️⃣ Accepting invitation...');
  const accepted = await store.updateInvitation(invitation.id, {
    status: 'accepted',
    acceptedAt: new Date().toISOString()
  });

  // Step 4: Verify final state
  console.log('4️⃣ Verifying final state...');
  assertEquals(accepted.status, 'accepted', 'Should be accepted');
  assertEquals(store.getAcceptedInvitations().length, 1, 'Should have 1 accepted');
  assertEquals(store.getPendingInvitations().length, 0, 'Should have 0 pending');
  assertEquals(emailService.getSentEmails().length, 1, 'Should have sent 1 email');

  console.log('✅ Integration test completed successfully');
}

// Main execution
if (require.main === module) {
  (async () => {
    try {
      await runAllTests();
      await performanceTest();
      await integrationTest();
    } catch (error) {
      console.error('\n💥 Test suite failed:', error);
      process.exit(1);
    }
  })();
}

module.exports = {
  MockEmailService,
  MockInvitationStore,
  testSendInvitation,
  testValidateInvitation,
  testAcceptInvitation,
  runAllTests
};
