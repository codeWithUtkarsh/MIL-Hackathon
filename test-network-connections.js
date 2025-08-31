// Test helper to verify network connections are working properly
// Run this in browser console to debug network visualization issues

window.testNetworkConnections = async function() {
  console.log("🧪 Testing Network Connections...");
  console.log("=====================================");

  // Check if required services are available
  const store = window.__ZUSTAND_STORE__ || null;

  if (!store) {
    console.error("❌ Store not available. Make sure you're on the app page.");
    return;
  }

  console.log("1. 📊 Current Store State:");
  console.log("   Members:", store.getState().members.length);
  console.log("   Networks:", store.getState().networks.length);
  console.log("   Current User:", store.getState().currentUser);

  console.log("\n2. 👥 All Members:");
  store.getState().members.forEach(member => {
    console.log(`   - ${member.name} (${member.role}) - ${member.email}`);
  });

  console.log("\n3. 🌐 All Networks:");
  store.getState().networks.forEach(network => {
    const ambassador = store.getState().members.find(m => m.id === network.ambassadorId);
    const creator = store.getState().members.find(m => m.id === network.creatorId);
    console.log(`   - ${ambassador?.name || 'Unknown'} → ${creator?.name || 'Unknown'} (${network.status})`);
  });

  console.log("\n4. 🎯 Network Creators for Current User:");
  const networkCreators = store.getState().getNetworkCreators();
  console.log(`   Found ${networkCreators.length} creators:`);
  networkCreators.forEach(creator => {
    console.log(`   - ${creator.name} (@${creator.handle}) - ${creator.campus}`);
  });

  console.log("\n5. 🔍 Auth vs Store User Comparison:");
  const authUser = JSON.parse(localStorage.getItem('mil-can-auth-user') || 'null');
  const currentUser = store.getState().currentUser;

  console.log("   Auth User:", authUser);
  console.log("   Store Current User:", currentUser);

  if (authUser && currentUser) {
    console.log("   Email Match:", authUser.email === currentUser.email ? "✅" : "❌");
  }

  console.log("\n6. 💾 LocalStorage Data:");
  console.log("   Auth Token:", localStorage.getItem('mil-can-auth-token') ? "Present" : "Missing");
  console.log("   Auth User:", localStorage.getItem('mil-can-auth-user') ? "Present" : "Missing");
  console.log("   Store State:", localStorage.getItem('mil-can-store') ? "Present" : "Missing");

  console.log("\n7. 🧪 Test Results:");

  const hasMembers = store.getState().members.length > 0;
  const hasNetworks = store.getState().networks.length > 0;
  const hasCurrentUser = !!store.getState().currentUser;
  const hasNetworkCreators = networkCreators.length > 0;

  console.log(`   ✅ Has Members: ${hasMembers ? "YES" : "NO"}`);
  console.log(`   ✅ Has Networks: ${hasNetworks ? "YES" : "NO"}`);
  console.log(`   ✅ Has Current User: ${hasCurrentUser ? "YES" : "NO"}`);
  console.log(`   ✅ Has Network Creators: ${hasNetworkCreators ? "YES" : "NO"}`);

  if (hasMembers && hasNetworks && hasCurrentUser && hasNetworkCreators) {
    console.log("\n🎉 SUCCESS: Network connections should work!");
    console.log("   Try clicking the 'View Network' button now.");
  } else {
    console.log("\n❌ ISSUES DETECTED:");

    if (!hasMembers) {
      console.log("   - No members found. Sample data might not be loaded.");
    }

    if (!hasNetworks) {
      console.log("   - No networks found. Network connections not created.");
    }

    if (!hasCurrentUser) {
      console.log("   - No current user set. Authentication sync issue.");
    }

    if (!hasNetworkCreators) {
      console.log("   - No network creators found for current user.");
      console.log("   - Check if current user ID matches any ambassador IDs in networks.");
    }

    console.log("\n🔧 Suggested Fixes:");
    console.log("   1. Try: localStorage.clear(); location.reload();");
    console.log("   2. Or: window.resetDemoData() (if available)");
    console.log("   3. Check browser console for errors during data loading");
  }

  console.log("\n=====================================");
};

// Utility functions for debugging
window.resetNetworkData = function() {
  console.log("🔄 Resetting network data...");
  localStorage.removeItem('mil-can-store');
  localStorage.removeItem('mil-can-auth-token');
  localStorage.removeItem('mil-can-auth-user');
  console.log("✅ Data cleared. Reload the page to reinitialize.");
  location.reload();
};

window.forceReseed = function() {
  console.log("🌱 Forcing reseed of sample data...");
  if (window.resetDemoData) {
    window.resetDemoData();
  } else {
    console.log("❌ resetDemoData function not available. Try reloading the page first.");
  }
};

window.showNetworkDebug = function() {
  console.log("🐛 Network Debug Info:");

  // Add to window for easy access
  if (typeof window !== 'undefined') {
    console.log("Available debug functions:");
    console.log("  - testNetworkConnections(): Test network setup");
    console.log("  - resetNetworkData(): Clear all data and reload");
    console.log("  - forceReseed(): Force reseed sample data");
    console.log("  - showNetworkDebug(): Show this help");
  }
};

// Auto-run basic check when script loads
console.log("🔧 Network Testing Tools Loaded!");
console.log("Run: testNetworkConnections() to check network setup");
console.log("Run: showNetworkDebug() to see available functions");
