# GrameenWork - Local Skills Marketplace

## Project Overview
A local services marketplace connecting customers with skilled workers in their area. Workers can create profiles showcasing their skills, rates, and availability, while customers can browse and hire local talent.

## Project Architecture
- **Frontend**: React with TypeScript, Wouter routing, TanStack Query, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect)
- **Styling**: Tailwind CSS with custom design system

## Authentication System
- Custom email/password authentication system
- Username/password authentication with bcrypt password hashing
- Workers register and login to create and manage their profiles
- Simple authentication page with login/register tabs
- Session-based authentication with PostgreSQL session storage via Passport.js

## Database Schema
- **users**: Core user table with email/password auth (id, email, password, firstName, lastName)
- **sessions**: Session storage for authentication
- **workers**: Worker profiles (name, profession, location, hourlyRate, rating, description, skills, isAvailable, phoneNumber)

## Key Features
- Public landing page with services showcase
- Worker authentication and profile creation
- Simple dashboard for workers to manage their profiles
- Skills-based worker categorization
- Location and rate filtering

## Recent Changes
- Migrated from Lovable to Replit environment
- Replaced react-router-dom with wouter routing
- Migrated from Replit Auth to custom authentication system
- Created database schema with PostgreSQL and added password column
- Built custom authentication page with login/register forms
- Updated worker dashboard to use custom auth system
- Fixed infinite authentication loops and session management
- Added proper error handling for authentication flows

## User Preferences
- Keep worker interface simple and not complicated
- Focus on easy authentication flow for workers

## Development Notes
- Uses Replit's built-in PostgreSQL database
- Custom authentication with email/password stored in database
- Authentication handled by Passport.js with session storage
- Worker dashboard protected by authentication middleware
- Auth routes: /api/register, /api/login, /api/logout, /api/user
- All API routes prefixed with /api/