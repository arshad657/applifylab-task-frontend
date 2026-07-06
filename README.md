# Social Feed Frontend

A modern, production-style frontend for a social media experience built with Next.js, React, TypeScript, and Tailwind CSS. The application focuses on a polished authentication flow, a dynamic feed experience, and a scalable component-based frontend architecture.

## Purpose

This project delivers a full-featured frontend foundation for a social platform where users can:
- register and sign in securely,
- browse a personalized feed,
- create and interact with posts,
- explore suggested people, events, and community content,
- switch themes and manage a modern UI experience.

## Key Features Implemented

### Authentication Experience
- Login and registration views with social auth entry points
- Form validation and password strength feedback
- Protected routing for authenticated users
- Token-based authentication flow with refresh-token handling

### Social Feed Experience
- Post cards with likes, comments, and reactions
- Infinite-style post loading with a “Show More” experience
- Create-post support with image attachments and visibility toggle

### UI and Experience Enhancements
- Dark/light theme support using theme switching
- Reusable UI components built with shadcn-style primitives
- Toast notifications and polished empty states

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Redux Toolkit + RTK Query
- React Hook Form + Zod
- shadcn/ui-inspired component system
- Sonner for notifications
- Lucide React for icons

## Project Structure

```text
src/
  app/                  # App Router pages and layouts
    (auth)/             # Authentication-related routes
    feed/               # Feed page route
  components/           # Reusable UI and feature components
    feed/               # Feed, post, sidebar, and content modules
    login/              # Login UI components
    registration/       # Registration UI components
    shared/             # Shared auth/theme/form helpers
    ui/                 # Base UI primitives
    hooks/              # Custom hooks
  redux/                # Store, slices, and API integration
  lib/                  # Utility, token, and error-handling helpers
  assets/               # Icons, images, and other static assets
```

## Getting Started

### Prerequisites
- Node.js 20 or newer
- npm, pnpm, or yarn

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run ESLint checks
```

## Architecture Notes

The frontend is organized around feature-based modules to keep the codebase maintainable and production-ready. Authentication state is managed through Redux, while route protection and session handling are handled through a dedicated auth context layer. UI rendering is component-driven and designed for reuse across screens.

## Next Steps

Potential improvements for the next phase include:
- backend API integration hardening,
- real-time notifications,
- richer profile and messaging experiences,
- expanded test coverage and CI/CD setup.
