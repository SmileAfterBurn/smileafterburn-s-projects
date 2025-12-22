# Copilot Instructions for Інклюзивна Мапа Соціальних Послуг України

## Project Overview

This is a web application that helps people in difficult life circumstances find necessary support and social services across Ukraine. The platform provides an interactive map of service providers, a detailed table view, and an AI assistant ("пані Думка") with voice support. The application is fully localized in Ukrainian and designed with empathy and accessibility in mind.

**Key Features:**
- Interactive map with organization markers
- Searchable table view with detailed information
- AI chat assistant powered by Google Gemini with text and voice support
- Regional filtering for all Ukrainian oblasts
- Remote support directory (hotlines, legal aid, psychological counseling)
- Adaptive responsive design for mobile and desktop

**Target Users:** People in Ukraine seeking social services, humanitarian aid, and support.

**Live Demo:** https://ai.studio/apps/drive/1rVF5mtqLSXIx9Y3EpXjyAKCrDtJsTOVt

## Tech Stack

### Core Technologies
- **React 18.3.1** - UI framework with functional components and hooks
- **TypeScript 5.5.3** - Strict type checking for all code
- **Vite 5.3.1** - Build tool and development server
- **Tailwind CSS 3.4.4** - Utility-first CSS framework for styling

### Libraries & APIs
- **Leaflet 1.9.4** & **React-Leaflet 4.2.1** - Interactive maps
- **Google Gemini API (@google/genai 1.30.0)** - AI chat assistant with text and voice (Live API)
- **Lucide React 0.344.0** - Icon library

### Development Environment
- **Node.js 16+** required
- **Port 3000** for local development server
- Environment variables via `.env.local` (see Security section)

## Coding Guidelines

### TypeScript Standards
1. **Always use TypeScript** - No `.js` or `.jsx` files
2. **Strict typing** - Define interfaces for all data structures in `types.ts`
3. **No `any` types** - Use proper type definitions or `unknown` with type guards
4. **Type imports** - Import types explicitly: `import { Organization, ViewMode } from './types'`
5. **Component props** - Always define interface for component props

### React Conventions
1. **Functional components only** - Use React hooks, no class components
2. **Component structure:**
   ```tsx
   import React, { useState, useEffect } from 'react';
   import { IconName } from 'lucide-react';
   
   interface ComponentNameProps {
     // props definition
   }
   
   export const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
     // hooks
     // functions
     // JSX return
   };
   ```
3. **Hooks ordering:**
   - State hooks (`useState`)
   - Effect hooks (`useEffect`)
   - Memoization hooks (`useMemo`, `useCallback`)
   - Custom hooks
4. **Event handlers** - Use descriptive names: `handleSubmit`, `handleOrgClick`, `handleRegionChange`
5. **Conditional rendering** - Use ternary operators or logical AND for JSX conditionals

### Styling with Tailwind CSS
1. **Utility-first approach** - Use Tailwind utility classes in JSX
2. **Responsive design** - Always include mobile-first responsive classes:
   ```tsx
   <div className="w-full md:w-1/2 lg:w-1/3">
   ```
3. **Color scheme:**
   - Primary accent: `teal-600` / `teal-500`
   - Secondary: `blue-600` / `blue-500`
   - Danger/Selected: `rose-600` / `rose-500`
   - Success: `green-600` / `green-500`
4. **Consistent spacing** - Use `p-4`, `mt-2`, `mb-4`, `gap-4` pattern
5. **Dark mode support** - Not currently implemented; avoid dark: variants for now

### File Organization
1. **Components** - All React components go in `/components` directory
2. **Services** - API integrations and external services go in `/services`
3. **Types** - All TypeScript interfaces and types in `types.ts`
4. **Constants** - Configuration, regions, initial data in `constants.ts`
5. **Root files:**
   - `App.tsx` - Main application component
   - `index.tsx` - Application entry point
   - `vite.config.ts` - Vite configuration
   - `tsconfig.json` - TypeScript configuration

### Naming Conventions
1. **Files:**
   - Components: `PascalCase.tsx` (e.g., `MapView.tsx`, `GeminiChat.tsx`)
   - Services: `camelCase.ts` (e.g., `geminiService.ts`)
   - Types: `types.ts` (single file)
   - Constants: `constants.ts` (single file)
2. **Variables & Functions:**
   - camelCase for variables, functions: `selectedOrgId`, `handleClick`
   - PascalCase for component names: `MapView`, `TableView`
3. **Constants:**
   - UPPER_SNAKE_CASE for top-level constants: `INITIAL_ORGANIZATIONS`, `REGION_CONFIG`
4. **Types & Interfaces:**
   - PascalCase: `Organization`, `ViewMode`, `RegionName`
   - Prefix interfaces with 'I' is NOT used

### Code Quality & Best Practices
1. **Error handling:**
   - Always wrap API calls in try-catch blocks
   - Provide user-friendly error messages in Ukrainian
   - Log errors to console for debugging: `console.error()`
2. **Performance:**
   - Use `useMemo` for expensive computations
   - Use `useCallback` for event handlers passed to child components
   - Lazy load components when appropriate
3. **Accessibility:**
   - Use semantic HTML elements
   - Include `aria-label` for icon-only buttons
   - Ensure keyboard navigation works
4. **Comments:**
   - Use comments sparingly; prefer self-documenting code
   - Use comments for complex logic or Ukrainian-specific context
   - Use TSDoc-style comments for exported functions:
     ```ts
     /**
      * Analyzes user query against organization data using Gemini AI
      * @param query - User's question in Ukrainian
      * @param organizations - List of organizations to search
      * @returns AI-generated response in Ukrainian
      */
     ```

### Localization
1. **Language:** All user-facing text MUST be in Ukrainian
2. **Format:**
   - Use Ukrainian date/time formats
   - Phone numbers: `+38(0)XX XXX XX XX` format
   - Addresses: Ukrainian address format (місто, вулиця, будинок)
3. **Tone:** Empathetic, supportive, and accessible
4. **AI Assistant (пані Думка):** Maternal, warm, and empathetic tone in Ukrainian

### Security Guidelines
1. **Environment Variables:**
   - NEVER commit API keys to Git
   - Use `.env.local` for sensitive data
   - Access via `process.env.VITE_GEMINI_API_KEY`
   - Always check `.gitignore` includes `*.local`
2. **API Keys:**
   - Google Gemini API key is required
   - Validate API key existence before making calls
3. **User Data:**
   - Do not store personal information
   - Respect user privacy
4. **External Links:**
   - Validate URLs before rendering
   - Use `target="_blank"` with `rel="noopener noreferrer"` for external links

## Project Structure

```
.
├── .github/                    # GitHub configuration
│   └── copilot-instructions.md # This file
├── components/                 # React components
│   ├── AboutModal.tsx         # About/Info modal
│   ├── GeminiChat.tsx         # AI assistant chat interface
│   ├── IntroModal.tsx         # Welcome modal
│   ├── MapView.tsx            # Interactive Leaflet map
│   ├── ReferralModal.tsx      # Referral services modal
│   ├── RemoteSupportModal.tsx # Remote support directory
│   └── TableView.tsx          # Organizations table view
├── services/
│   └── geminiService.ts       # Google Gemini API integration
├── App.tsx                    # Main application component
├── constants.ts               # Configuration, regions, organizations
├── index.html                 # HTML entry point
├── index.tsx                  # React entry point
├── organizations.ts           # Organization data (legacy)
├── types.ts                   # TypeScript type definitions
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
├── .env.local                # Environment variables (DO NOT COMMIT)
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
```

### Key Files Explained
- **App.tsx:** Main component with view mode state, search, filters, and layout
- **types.ts:** Core TypeScript interfaces (Organization, RegionName, ViewMode, etc.)
- **constants.ts:** INITIAL_ORGANIZATIONS data and REGION_CONFIG
- **geminiService.ts:** Google Gemini integration for text chat and Live API voice

## Development Workflow

### Setup
```bash
npm install
# Create .env.local with VITE_GEMINI_API_KEY=your_key_here
npm run dev
```

### Build
```bash
npm run build    # TypeScript compilation + Vite build
npm run preview  # Preview production build
```

### Common Tasks
1. **Adding a new organization:**
   - Add to `INITIAL_ORGANIZATIONS` array in `constants.ts`
   - Follow the `Organization` interface in `types.ts`
   - Ensure valid coordinates for map display
   - Include region for filtering

2. **Creating a new component:**
   - Create file in `/components` directory
   - Use PascalCase naming: `ComponentName.tsx`
   - Define props interface
   - Export as named export: `export const ComponentName: React.FC<Props>`

3. **Modifying AI behavior:**
   - Edit system prompt in `geminiService.ts`
   - Maintain empathetic Ukrainian tone
   - Test with various user queries

4. **Styling changes:**
   - Use Tailwind utility classes
   - Check responsive behavior on mobile
   - Maintain consistent color scheme (teal/blue primary)

### Testing Considerations
- Manual testing is primary approach (no automated tests currently)
- Test on multiple screen sizes (mobile, tablet, desktop)
- Verify map markers render correctly
- Test AI chat with various queries in Ukrainian
- Check accessibility with keyboard navigation

## Resources & References

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Leaflet Documentation](https://leafletjs.com/)
- [React-Leaflet Documentation](https://react-leaflet.js.org/)
- [Google Gemini API Documentation](https://ai.google.dev/docs)

### Project-Specific
- Live Demo: https://ai.studio/apps/drive/1rVF5mtqLSXIx9Y3EpXjyAKCrDtJsTOVt
- Repository: https://github.com/SmileAfterBurn/smileafterburn-s-projects

### Ukrainian Context
- Understand Ukrainian oblast structure for regional filtering
- Be aware of humanitarian context and user sensitivity
- Use appropriate empathetic language for vulnerable populations

## Examples

### Example: Adding a New Organization
```typescript
// In constants.ts
{
  id: "org-123",
  name: "Назва Організації",
  address: "м. Київ, вул. Шевченка, 10",
  lat: 50.4501,
  lng: 30.5234,
  category: "Гуманітарна допомога",
  services: "Їжа, одяг, тимчасове житло",
  phone: "+38(044)123-45-67",
  email: "info@organization.ua",
  status: "Active",
  region: "Kyiv",
  driveFolderUrl: "https://drive.google.com/...",
  budget: 500000,
  workingHours: "Пн-Пт 9:00-18:00",
  website: "https://organization.ua",
  notes: "Попередній запис обов'язковий"
}
```

### Example: Creating a Modal Component
```tsx
// components/ExampleModal.tsx
import React from 'react';
import { X } from 'lucide-react';

interface ExampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ExampleModal: React.FC<ExampleModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Закрити"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {/* Modal content */}
        </div>
      </div>
    </div>
  );
};
```

### Example: API Service Function
```typescript
// In services/geminiService.ts
export const analyzeQuery = async (
  query: string,
  context: Organization[]
): Promise<string> => {
  try {
    const ai = getClient();
    const model = ai.getModel({ model: "gemini-2.0-flash-exp" });
    
    const prompt = `
      Ти - "пані Думка", AI-помічниця для пошуку соціальних послуг в Україні.
      
      Контекст організацій: ${JSON.stringify(context)}
      
      Запитання користувача: ${query}
      
      Дай емпатичну, корисну відповідь українською мовою.
    `;
    
    const response = await model.generateContent(prompt);
    return response.text();
  } catch (error) {
    console.error("Error analyzing query:", error);
    throw new Error("Не вдалося обробити запит. Спробуйте ще раз.");
  }
};
```

---

**Note:** This project serves a humanitarian purpose supporting people in Ukraine. Always maintain empathy, respect, and accessibility in all contributions.
