# Copilot Instructions for Social Service Map Ukraine

## Project Overview

This is **Інклюзивна Мапа Соціальних Послуг України** (Inclusive Social Services Map of Ukraine) - a web application that helps people in difficult life circumstances find necessary support and humanitarian aid across Ukraine. The platform features:

- 🗺️ Interactive map of service provider organizations
- 📊 Detailed table view of organizations
- 🤖 AI assistant "пані Думка" (Ms. Dumka) with voice support
- 🌐 Regional filtering across all Ukrainian oblasts
- 📞 Remote support services (hotlines, legal aid, psychological counseling)

**Target Audience:** Ukrainian citizens seeking humanitarian aid and social services  
**Language:** Fully localized in Ukrainian  
**Live Demo:** https://ai.studio/apps/drive/1rVF5mtqLSXIx9Y3EpXjyAKCrDtJsTOVt

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI framework |
| TypeScript | 5.5.3 | Type safety |
| Vite | 7.3.0 | Build tool and dev server |
| Tailwind CSS | 3.4.4 | Styling |
| Leaflet | 1.9.4 | Interactive maps |
| React Leaflet | 4.2.1 | React bindings for Leaflet |
| Google Gemini API | 1.30.0 | AI assistant |
| Lucide React | 0.344.0 | Icons |
| Jest | 30.2.0 | Testing framework |
| ts-jest | 29.4.6 | TypeScript support for Jest |

## Coding Standards

### TypeScript
- **Always use TypeScript** for all new code
- **Explicit types** are preferred over `any` (using `any` triggers a warning)
- Use **interfaces** for object shapes and public APIs
- Use **type aliases** for unions, intersections, and utility types
- Enable strict mode features in `tsconfig.json`
- Use optional chaining (`?.`) and nullish coalescing (`??`) where appropriate

### React
- Use **functional components** with hooks (no class components)
- Follow **React Hooks rules** (use linter recommendations)
- No need to import React in JSX files (automatic JSX runtime)
- Use `React.FC` type for component definitions
- Prefer named exports over default exports for components

### Code Style (Prettier + ESLint)
- **Semicolons:** Always use semicolons
- **Quotes:** Single quotes for strings
- **Print width:** 100 characters max
- **Tab width:** 2 spaces (no tabs)
- **Trailing commas:** ES5 style
- **Arrow functions:** Avoid parentheses around single parameters (`avoid`)
- **Line endings:** LF (Unix style)

### Naming Conventions
- **Components:** PascalCase (e.g., `MapView.tsx`, `GeminiChat.tsx`)
- **Files:** PascalCase for components, camelCase for utilities
- **Variables/Functions:** camelCase
- **Constants:** UPPER_SNAKE_CASE (e.g., `INITIAL_ORGANIZATIONS`)
- **Types/Interfaces:** PascalCase (e.g., `Organization`, `ViewMode`)
- **Props interfaces:** Component name + `Props` (e.g., `MapViewProps`)

## Project Structure

```
.
├── components/              # React components
│   ├── MapView.tsx         # Leaflet interactive map
│   ├── TableView.tsx       # Organizations table
│   ├── GeminiChat.tsx      # AI assistant chat interface
│   ├── IntroModal.tsx      # Welcome modal
│   ├── RemoteSupportModal.tsx # Remote support services
│   ├── ReferralModal.tsx   # Referral services modal
│   └── AboutModal.tsx      # About information
├── services/
│   └── geminiService.ts    # Google Gemini API integration
├── utils/
│   └── validateConfig.ts   # Configuration validation utilities
├── __tests__/              # Test files
│   └── validateConfig.test.ts
├── App.tsx                 # Main application component
├── types.ts                # TypeScript type definitions
├── constants.ts            # Constants (regions, organizations)
├── organizations.ts        # Organization data
├── index.tsx               # Application entry point
├── .env.local              # Environment variables (NOT committed)
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── jest.config.js          # Jest testing configuration
├── .eslintrc.json          # ESLint rules
└── .prettierrc.json        # Prettier formatting rules
```

## Key Patterns and Architecture

### State Management
- Use React `useState` for local component state
- Use `useMemo` for expensive computations
- Use `useEffect` for side effects (API calls, event listeners)
- Props are passed explicitly (no global state management library)

### Component Organization
- **Smart components** in root (e.g., `App.tsx`) manage state
- **Presentational components** in `/components` receive props
- Separate business logic from presentation
- Keep components focused and single-purpose

### Type System
- All organization data uses the `Organization` interface from `types.ts`
- View modes are defined in the `ViewMode` enum
- Regional data uses `RegionName` type for type-safe region handling
- Path aliases: `@/*` maps to root directory

### Icons
- Use Lucide React icons for UI elements
- Custom `Tryzub` (Ukrainian trident) icon is defined in `App.tsx`
- Region icons mapped in `ICON_COMPONENTS` object

### Map Implementation
- Leaflet is used for interactive maps
- OpenStreetMap tiles are the base layer
- Organization markers are placed using lat/lng coordinates
- Map view is synchronized with table selection

## Development Workflow

### Setup
```bash
# Install dependencies
npm install

# Create environment file (required)
# Create .env.local and add GEMINI_API_KEY=your_api_key_here

# Start development server
npm run dev  # Runs on http://localhost:5173
```

### Build and Test
```bash
# Build for production
npm run build  # Runs TypeScript compiler + Vite build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Code Quality
- **Before committing:** Ensure code passes ESLint and Prettier checks
- **Run tests** to verify functionality
- **Check types:** TypeScript compilation should succeed

## Common Tasks

### Adding a New Organization
1. Edit `organizations.ts` file
2. Add a new object to the `INITIAL_ORGANIZATIONS` array
3. Include all required fields: `id`, `name`, `address`, `lat`, `lng`, `category`, `services`, `phone`, `email`, `status`, `region`
4. Validate coordinates are correct for Ukraine
5. Test the organization appears on both map and table

### Adding a New Region
1. Update `REGION_CONFIG` in `constants.ts`
2. Add appropriate icon mapping in `ICON_COMPONENTS`
3. Ensure lat/lng coordinates and zoom level are correct
4. Add region to `RegionName` type in `types.ts`

### Modifying the AI Assistant
- AI configuration is in `services/geminiService.ts`
- System prompts define the assistant's personality (empathetic, maternal)
- The assistant speaks **only in Ukrainian**
- Context includes organization data for relevant recommendations

### Updating Styles
- Use **Tailwind CSS utility classes** (preferred)
- No custom CSS files (styles are inline with Tailwind)
- Follow mobile-first responsive design
- Test on multiple screen sizes

## Testing Guidelines

### Test Structure
- Tests are in `__tests__/` directory
- Use `.test.ts` or `.test.tsx` suffix
- Follow the existing Jest + ts-jest setup
- Use `describe` blocks for grouping related tests

### What to Test
- Utility functions (validation, formatting)
- Component rendering and user interactions
- API service methods
- Data transformations

### Running Tests
```bash
npm run test                # Run all tests once
npm run test:watch         # Run tests in watch mode
npm run test -- <pattern>  # Run specific tests
```

## Security Considerations

### Environment Variables
- **NEVER commit `.env.local`** to Git (already in `.gitignore`)
- **NEVER hardcode API keys** in source code
- Environment variable `GEMINI_API_KEY` is loaded by Vite and exposed as `process.env.API_KEY` to the client
- API keys should be stored in `.env.local`:
  ```
  GEMINI_API_KEY=your_api_key_here
  ```

### API Security
- Gemini API key is required for AI assistant functionality
- Consider rate limiting for production deployments
- Validate all user inputs before processing

### Data Privacy
- No personal user data is collected or stored
- Organization contact information is public data
- Geolocation requests should be user-initiated

## Localization

### Language
- **Primary language:** Ukrainian (українська мова)
- All UI text, labels, and messages are in Ukrainian
- AI assistant speaks Ukrainian exclusively
- Comments and technical documentation may be in English

### Cultural Context
- The application serves Ukrainian citizens
- UI/UX designed for accessibility during crisis situations
- Empathetic, supportive tone throughout
- Regional names use Ukrainian oblasts

## Dependencies Management

### Adding New Dependencies
```bash
# Production dependency
npm install <package-name>

# Development dependency
npm install -D <package-name>
```

### Updating Dependencies
```bash
# Update all dependencies (be careful with breaking changes)
npm update

# Update specific package
npm update <package-name>
```

### Dependency Guidelines
- Keep dependencies minimal and focused
- Prefer well-maintained, popular packages
- Check for security vulnerabilities: `npm audit`
- Review bundle size impact for client-side packages

## Git Workflow

### Branches
- `main` - production-ready code
- Feature branches should be descriptive

### Commits
- Write clear, descriptive commit messages
- Use imperative mood ("Add feature" not "Added feature")
- Keep commits focused and atomic

### Files to Ignore
- `.env.local` - environment variables
- `node_modules/` - dependencies
- `dist/` - build output
- IDE-specific files (except `.vscode/` which is tracked)

## Resources

- **Live Demo:** https://ai.studio/apps/drive/1rVF5mtqLSXIx9Y3EpXjyAKCrDtJsTOVt
- **Repository:** https://github.com/SmileAfterBurn/smileafterburn-s-projects
- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org/docs
- **Vite Docs:** https://vitejs.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Leaflet Docs:** https://leafletjs.com
- **Google Gemini API:** https://ai.google.dev

## Best Practices

1. **Write clear, self-documenting code** - use descriptive names
2. **Keep components small** - single responsibility principle
3. **Type everything** - avoid `any`, use proper TypeScript types
4. **Test critical functionality** - especially utilities and services
5. **Follow existing patterns** - maintain consistency with codebase
6. **Consider accessibility** - semantic HTML, keyboard navigation
7. **Optimize performance** - use `useMemo`, `useCallback` appropriately
8. **Review before committing** - run linter, tests, and build
9. **Document complex logic** - add comments where necessary
10. **Think mobile-first** - responsive design is essential

## Common Issues and Solutions

### Build Fails
- Check TypeScript errors: `npm run build`
- Verify all imports are correct
- Ensure all required types are defined

### Tests Fail
- Check test file syntax matches Jest expectations
- Verify mocks are properly configured
- Ensure test environment has required dependencies

### Map Not Rendering
- Verify Leaflet CSS is imported
- Check that organization coordinates are valid
- Ensure map container has explicit height in styles

### AI Assistant Not Working
- Verify `GEMINI_API_KEY` is set in `.env.local`
- Check API key is valid and has proper permissions
- Review browser console for API errors

---

**Remember:** This project aims to help people in need. Write code with empathy, maintain high quality, and ensure accessibility for all users. 🇺🇦
