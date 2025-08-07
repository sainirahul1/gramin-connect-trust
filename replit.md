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
- Integrated Replit Auth for secure user authentication
- Workers must login to create and manage their profiles  
- Simple dashboard interface for worker profile management
- Session-based authentication with PostgreSQL session storage

## Database Schema
- **users**: Core user table for Replit Auth (id, email, firstName, lastName, profileImageUrl)
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
- Implemented Replit Auth authentication system
- Created database schema with PostgreSQL
- Built worker dashboard with profile management
- Added authentication-aware navbar with login/logout

## User Preferences
- Keep worker interface simple and not complicated
- Focus on easy authentication flow for workers

## Development Notes
- Uses Replit's built-in PostgreSQL database
- Authentication redirects handled by server routes (/api/login, /api/logout)
- Worker dashboard protected by authentication middleware
- All API routes prefixed with /api/