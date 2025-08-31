# Creator Authentication System Documentation

## Overview

The MIL-CAN application now supports a complete Creator authentication system alongside the existing Ambassador authentication. This document outlines the implementation and usage of the creator sign-in and sign-up functionality.

## Features Implemented

### 1. Creator Sign-In
- Dedicated sign-in interface for creators
- Secure password-based authentication
- Session management with localStorage
- Automatic redirection to creator dashboard upon successful login

### 2. Creator Sign-Up
- Multi-step registration form for new creators
- Collects essential information:
  - Personal details (name, email, password)
  - Professional information (handle, campus, languages)
  - Bio and expertise areas
- Email validation and password confirmation
- Automatic account creation

### 3. Database Schema

#### Creators Table
```sql
CREATE TABLE creators (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  handle TEXT NOT NULL,
  campus TEXT NOT NULL,
  languages TEXT NOT NULL, -- JSON array
  points INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  is_active INTEGER DEFAULT 1
)
```

#### Ambassador-Creator Network Table
```sql
CREATE TABLE ambassador_creator_network (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ambassador_id INTEGER NOT NULL,
  creator_id INTEGER NOT NULL,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT CHECK(status IN ('active', 'inactive')) DEFAULT 'active',
  notes TEXT,
  FOREIGN KEY (ambassador_id) REFERENCES users(id),
  FOREIGN KEY (creator_id) REFERENCES creators(id),
  UNIQUE(ambassador_id, creator_id)
)
```

### 4. Relationship Management
- One ambassador can have multiple creators
- Creators are linked to ambassadors through the network table
- Network relationships can be activated or deactivated
- Tracking of when creators were added to an ambassador's network

## Components

### CreatorSigninPopup (`/components/CreatorSigninPopup.tsx`)
- Modal interface for creator sign-in
- Email and password validation
- Error handling and loading states
- "Remember me" functionality
- Link to sign-up for new creators

### CreatorSignupPopup (`/components/CreatorSignupPopup.tsx`)
- Multi-step registration wizard
- Form validation at each step
- Progress indicator
- Terms and conditions acceptance
- Seamless transition to sign-in after successful registration

### CreatorAuthService (`/lib/creator-auth-service.ts`)
- Core authentication logic
- Password hashing and validation
- Session management
- Creator-Ambassador relationship management
- Points tracking

## Demo Accounts

For testing purposes, the following demo creator accounts are available:

### Creator 1
- **Email:** john.doe@example.com
- **Password:** creator123
- **Ambassador:** Utkarsh Sharma
- **Campus:** Harvard University
- **Languages:** English, Spanish

### Creator 2
- **Email:** jane.smith@example.com
- **Password:** creator123
- **Ambassador:** Utkarsh Sharma
- **Campus:** MIT
- **Languages:** English, French

### Creator 3
- **Email:** alex.j@example.com
- **Password:** creator123
- **Ambassador:** Farheen Imam
- **Campus:** Stanford University
- **Languages:** English, Mandarin

## Usage Guide

### For Users

#### Signing In as a Creator
1. Navigate to the home page
2. Click on "Creator Sign In" button
3. Enter your email and password
4. Click "Sign In"
5. You'll be redirected to the Creator Dashboard

#### Signing Up as a New Creator
1. Navigate to the home page
2. Click on "New Creator? Sign Up" button
3. Complete the multi-step registration:
   - Step 1: Personal Information
   - Step 2: Professional Details
   - Step 3: Security & Terms
4. Click "Create Account"
5. You'll be automatically signed in

### For Developers

#### Using the Creator Auth Service

```typescript
import { getCreatorAuthService } from "../lib/creator-auth-service";

const creatorAuthService = getCreatorAuthService();

// Sign in
const response = await creatorAuthService.signin(email, password);
if (response.success) {
  console.log("Signed in as:", response.user);
}

// Sign up
const signupData = {
  name: "John Doe",
  email: "john@example.com",
  password: "securepass123",
  handle: "@johndoe",
  campus: "University Name",
  languages: ["English", "Spanish"]
};
const signupResponse = await creatorAuthService.signup(signupData);

// Check authentication status
if (creatorAuthService.isAuthenticated()) {
  const currentCreator = creatorAuthService.getCurrentCreator();
  console.log("Current creator:", currentCreator);
}

// Link to ambassador
creatorAuthService.linkToAmbassador(ambassadorId, "Optional notes");

// Get ambassador info
const ambassador = creatorAuthService.getMyAmbassador();

// Logout
creatorAuthService.logout();
```

## API Methods

### CreatorAuthService Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `signin(email, password)` | Authenticate a creator | email: string, password: string | CreatorAuthResponse |
| `signup(data)` | Register a new creator | data: CreateCreatorData | CreatorAuthResponse |
| `logout()` | Sign out current creator | none | void |
| `getCurrentCreator()` | Get current authenticated creator | none | CreatorUser \| null |
| `isAuthenticated()` | Check if creator is signed in | none | boolean |
| `updateCreatorPoints(points)` | Update creator's points | points: number | void |
| `linkToAmbassador(id, notes)` | Link creator to ambassador | id: number, notes?: string | boolean |
| `unlinkFromAmbassador()` | Remove ambassador link | none | boolean |
| `getMyAmbassador()` | Get linked ambassador info | none | Ambassador \| null |
| `getAllCreators()` | Get all creators | none | CreatorWithNetwork[] |
| `getCreatorsByAmbassador(id)` | Get creators by ambassador | id: number | CreatorWithNetwork[] |

## Security Considerations

1. **Password Storage**: Passwords are hashed before storage (using base64 for demo, should use bcrypt in production)
2. **Session Management**: Sessions are stored in localStorage (consider using httpOnly cookies in production)
3. **Input Validation**: All forms include client-side validation
4. **SQL Injection Prevention**: Uses prepared statements for database queries
5. **Authentication State**: Managed through React context and service singleton

## Testing

Run the creator authentication test:

```bash
node test-creator-auth.js
```

This will verify:
- Sign-in with valid credentials
- Sign-in rejection with invalid credentials
- Sign-up functionality
- Creator-Ambassador relationships

## Future Enhancements

1. **Password Recovery**: Implement forgot password functionality
2. **Email Verification**: Add email verification for new signups
3. **OAuth Integration**: Support sign-in with Google/GitHub
4. **Two-Factor Authentication**: Add 2FA for enhanced security
5. **Profile Management**: Allow creators to update their profiles
6. **Activity Logging**: Track creator activities and contributions
7. **Advanced Search**: Search creators by skills, languages, campus
8. **Bulk Operations**: Allow ambassadors to manage multiple creators at once

## Troubleshooting

### Common Issues

1. **"Invalid email or password" error**
   - Verify the email address is correct
   - Check password (demo accounts use "creator123")
   - Ensure the account exists

2. **Creator not linked to ambassador**
   - Check the ambassador_creator_network table
   - Verify both ambassador and creator IDs exist
   - Ensure the relationship status is "active"

3. **Session not persisting**
   - Check localStorage is enabled in browser
   - Verify no browser extensions are blocking storage
   - Check for JavaScript errors in console

## Support

For issues or questions about the creator authentication system:
1. Check this documentation
2. Review the test file: `test-creator-auth.js`
3. Check the browser console for errors
4. Contact the development team

## License

This authentication system is part of the MIL-CAN project and follows the same licensing terms.