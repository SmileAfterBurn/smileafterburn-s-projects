---
description: "Instructions for GitHub Copilot coding agent working on the Інклюзивна Мапа Соціальних Послуг України project"
---

# Copilot Instructions for Social Service Map Ukraine

## Project Overview

This is a React + TypeScript + Vite application that provides an interactive map of social services and humanitarian aid organizations across Ukraine. The project includes:
- Interactive Leaflet map with organization markers
- Data table view with search and filtering
- AI assistant (пані Думка) powered by Google Gemini API
- Regional filtering for all Ukrainian oblasts
- Remote support services modal

**Primary Language**: Ukrainian (all UI text, comments, and user-facing content)

## Build & Development

### Setup
```bash
npm install
```

### Development Server
```bash
npm run dev
```
The app runs at `http://localhost:3000`

### Build
```bash
npm run build
```
This runs TypeScript compiler followed by Vite build.

### Preview Production Build
```bash
npm run preview
```

## Code Style & Conventions

### TypeScript
- **Target**: ES2022
- **Module**: ESNext with bundler resolution
- Always use TypeScript types - avoid `any` when possible (warning level)
- Use React functional components with TypeScript interfaces
- Leverage type inference where appropriate
- Follow existing type definitions in `types.ts`

### React Patterns
- Use functional components with hooks
- Import React hooks explicitly: `import { useState, useEffect } from 'react'`
- React 18.3+ - no need to import React for JSX
- Follow React Hooks best practices and rules

### Prettier Configuration
- **Semi-colons**: Required (`;`)
- **Quotes**: Single quotes (`'`)
- **Print Width**: 100 characters
- **Tab Width**: 2 spaces
- **Trailing Commas**: ES5 style
- **Arrow Functions**: Avoid parentheses when possible (`arrowParens: avoid`)
- **Line Endings**: LF

### ESLint Rules
- React prop-types not required (TypeScript handles this)
- Unused variables starting with `_` are allowed
- `@typescript-eslint/no-explicit-any` is a warning, not an error
- No need for `React` import in JSX scope

### File Organization
- Components go in `/components` directory
- Services go in `/services` directory
- Type definitions in `types.ts`
- Constants and initial data in `constants.ts`
- Organization data in `organizations.ts`

## Environment Variables

**CRITICAL SECURITY**: Never commit API keys or `.env.local` files!

- Required environment variable: `GEMINI_API_KEY` for Google Gemini AI integration
- The Vite config loads this as `env.GEMINI_API_KEY` (no VITE_ prefix needed)
- Always check `.gitignore` includes `.env.local`

## Project Structure

```
.
├── components/              # React components
│   ├── MapView.tsx         # Leaflet interactive map
│   ├── TableView.tsx       # Organization data table
│   ├── GeminiChat.tsx      # AI assistant chat interface
│   ├── IntroModal.tsx      # Welcome/intro modal
│   ├── RemoteSupportModal.tsx # Remote support services
│   ├── ReferralModal.tsx   # Referral information modal
│   └── AboutModal.tsx      # About the project modal
├── services/
│   └── geminiService.ts    # Google Gemini API integration
├── App.tsx                 # Main application component
├── types.ts                # TypeScript type definitions
├── constants.ts            # Constants (regions, organizations)
├── organizations.ts        # Organization data
├── index.tsx               # Application entry point
└── vite.config.ts          # Vite configuration
```

## Key Technologies

- **React** 18.3.1 - UI framework
- **TypeScript** 5.5.3 - Type safety
- **Vite** 7.3.0 - Build tool and dev server
- **Tailwind CSS** 3.4.4 - Utility-first CSS
- **Leaflet** 1.9.4 + React Leaflet 4.2.1 - Interactive maps
- **Google Gemini API** 1.30.0 - AI assistant
- **Lucide React** 0.344.0 - Icon library

## Development Guidelines

### Adding New Organizations
1. Edit `constants.ts` or `organizations.ts`
2. Follow the `Organization` interface from `types.ts`
3. Include all required fields: id, name, address, lat/lng, category, services, phone, email, status, region
4. Set appropriate region from `RegionName` type

### Working with the Map
- Map uses Leaflet with OpenStreetMap tiles
- Markers are clustered by default
- Each organization must have valid `lat` and `lng` coordinates
- Region filtering affects map marker visibility

### AI Assistant (пані Думка)
- Uses Google Gemini API for text and voice interactions
- Service layer in `services/geminiService.ts`
- Maintains empathetic, maternal tone in Ukrainian
- Can search organizations and provide recommendations

### Styling
- Primary framework: Tailwind CSS
- Use utility classes for consistency
- Follow existing color scheme (blue/purple gradient theme)
- Ensure responsive design (mobile-first approach)

### Icons
- Use Lucide React icon library
- Import only needed icons to optimize bundle size
- Custom icons (like Tryzub) follow same SVG pattern

## Testing

Currently, there are no automated tests configured. When adding tests:
- Place test files near the components they test
- Use `.test.tsx` or `.spec.tsx` extensions
- Follow React Testing Library best practices if added

## Accessibility & Localization

- All user-facing text must be in Ukrainian
- Maintain cultural context and sensitivity
- Consider accessibility best practices (WCAG guidelines)
- Ensure keyboard navigation works properly

## Security Best Practices

1. **Never commit secrets** - API keys stay in `.env.local`
2. **Validate user input** - especially in search and filter operations
3. **Sanitize data** - when displaying user-generated or external content
4. **HTTPS only** - for production deployments
5. **Keep dependencies updated** - use Dependabot alerts

## Common Tasks

### Adding a New Component
1. Create in `/components` directory with `.tsx` extension
2. Export as named export: `export const ComponentName: React.FC = () => { ... }`
3. Import into parent component
4. Follow existing component patterns

### Adding a New Service Category
1. Update types in `types.ts` if needed
2. Add category constants to `constants.ts`
3. Update filters and UI components to handle new category
4. Add appropriate icons if needed

### Modifying the Map
1. Map configuration is in `MapView.tsx`
2. Marker customization in same component
3. Consider performance with large datasets (clustering)

## Known Issues & Limitations

- No automated tests currently configured
- API keys must be obtained separately (Google Gemini)
- Map requires valid geocoordinates for all organizations
- Voice features require browser support for Web Speech API

## Contributing

When making changes:
1. Ensure TypeScript compiles without errors (`npm run build`)
2. Test in development mode (`npm run dev`)
3. Follow existing code style and conventions
4. Update this documentation if adding new patterns or requirements
5. Never break existing functionality unless explicitly fixing bugs
