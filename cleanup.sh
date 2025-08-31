#!/bin/bash

# Cleanup script to remove documentation and test files
echo "🧹 Cleaning up documentation and test files..."

# Remove documentation files (except README.md)
echo "Removing documentation files..."
rm -f CREATOR_AUTH_README.md
rm -f SETUP.md
rm -f AUTHENTICATION.md
rm -f NETWORK_FEATURE.md

# Remove test files
echo "Removing test files..."
rm -f test-creator-auth.js
rm -f test-invitations.js
rm -f test-invitations.test.js
rm -f test-network-connections.js
rm -f test-network-modal.test.js
rm -f test-view-network-integration.test.js

# Remove any other build/setup scripts that aren't needed
echo "Removing unnecessary build scripts..."
rm -f build-app.sh
rm -f build-lib.js
rm -f build-mil-can.js
rm -f create-ambassadors-page.js
rm -f create-complete-app-part1.js
rm -f create-mil-can-app.js
rm -f generate-app.js
rm -f init-project.js
rm -f install.sh
rm -f quick-setup.js
rm -f setup-complete.js
rm -f setup.sh
rm -f src-generator-1.ts

echo "✅ Cleanup complete! The directory is now lightweight and clean."
echo ""
echo "Remaining essential files:"
echo "  - Source code (app/, components/, lib/)"
echo "  - Configuration files (package.json, tsconfig.json, etc.)"
echo "  - README.md with essential documentation"
echo "  - Public assets"
