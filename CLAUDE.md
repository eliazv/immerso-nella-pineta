# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (starts Vite dev server)
- **Build for production**: `npm run build` (creates production build in `dist/`)
- **Build for development**: `npm run build:dev` (creates development build)
- **Lint code**: `npm run lint` (runs ESLint)
- **Preview build**: `npm run preview` (serves built files locally)


## Project Architecture

### High-Level Structure
This is a **dual-purpose vacation rental application** built with React + TypeScript + Vite:

1. **Public Website** (`/`, `/gallery`, `/attractions`, `/rules`, `/book`) - Marketing site for "Immerso nella Pineta" vacation rental in Pinarella di Cervia
2. **Backoffice System** (`/calendar`, `/dashboard`) - Private management interface for bookings and analytics with full CRUD operations
3. **Alloggiati Web Integration** (`/alloggiati`) - Guest registration system for Italian police reporting requirements

### Key Technologies
- **Frontend**: React 18 + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS + Radix UI components
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **Email**: EmailJS for contact forms and notifications
- **Data Storage**: Google Sheets integration with caching

### Architecture Patterns

**Routing Structure**: App.tsx defines clear route separation:
- Public routes render directly 
- Backoffice routes use `BackofficeLayout` wrapper with authentication

**Service Layer**: Organized services in `src/services/`:
- `alloggiatiService.ts` - Italian police reporting integration
- `authService.ts` - PIN-based authentication for backoffice
- `bookingService.ts` - Calendar and booking management
- `uploadService.ts` - File upload for guest documents
- `dashboardService.ts` - Analytics and reporting

**Component Organization**:
- `src/components/ui/` - shadcn/ui base components
- `src/components/alloggiati/` - Guest registration components
- `src/components/backoffice/` - Admin interface components
- `src/components/calendar/` - Booking calendar components
- `src/components/dashboard/` - Analytics components

**Data Layer**:
- `src/types/` - TypeScript interfaces for all data models
- `src/data/` - Static data (Italian municipalities, countries)
- Local storage for form persistence and sharing

### Critical Business Logic

**Alloggiati Web System**: Complete implementation of Italian police guest reporting:
- Generates official format files for `alloggiatiweb.poliziadistato.it`
- Multi-guest form with document validation
- Email notifications with file attachments
- URL-based data sharing between devices

**Booking Calendar**: Full-featured booking management with CRUD operations:
- OTA integration display (Booking.com, Airbnb, etc.)
- Color-coded booking status
- Full booking modification and deletion capabilities
- Tourist tax (tassa di soggiorno) tracking with collection status
- PIN-protected access
- Mobile-optimized interface

**Authentication**: Simple PIN-based system for backoffice access (managed in `authService.ts`)

## Development Guidelines

### UI Framework
- Use shadcn/ui components from `src/components/ui/`
- Follow existing Tailwind CSS patterns
- Mobile-first responsive design approach

### Form Handling
- Use React Hook Form + Zod for validation
- Follow patterns in `src/components/alloggiati/GuestForm.tsx`
- Persist form state in localStorage for user experience

### Booking Management
- Complete CRUD operations for bookings in `bookingService.ts`
- Tourist tax tracking with collection status (`SoggiornoTaxRiscossa` field)
- Google Sheets integration with local caching for performance
- Real-time updates through cache invalidation

### File Organization
- Follow existing service/component separation
- Use TypeScript interfaces in `src/types/`
- Keep Italian data (municipalities, etc.) in `src/data/`

### Email Integration
- EmailJS configured for contact forms and notifications
- Service IDs and template IDs embedded in components
- File attachment handling via cloud storage services