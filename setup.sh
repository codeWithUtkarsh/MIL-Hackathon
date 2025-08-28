#!/bin/bash

# Create directory structure for MIL-CAN Next.js app

# Create app directories
mkdir -p app/creator/submit
mkdir -p app/creator/thanks/\[assetId\]
mkdir -p app/review/\[assetId\]
mkdir -p app/events/new
mkdir -p app/events/thanks/\[eventId\]
mkdir -p app/assets
mkdir -p app/leaderboard
mkdir -p app/kit
mkdir -p app/dashboard
mkdir -p app/admin

# Create component directories
mkdir -p components/forms
mkdir -p components/modals
mkdir -p components/tables
mkdir -p components/charts
mkdir -p components/ui

# Create lib directories
mkdir -p lib/store

# Create public directories
mkdir -p public/kit

# Create styles directory
mkdir -p styles

echo "Directory structure created successfully!"
echo "Run 'npm install' to install dependencies"
