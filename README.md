# Scout AI

Scout AI is an Opportunity Intelligence Platform. It continuously discovers information using Anakin Universal Crawl, converts websites into structured data using Wire API, reasons over the extracted information, and presents Opportunities, Threats, Trends, and Actions personalized to the user's profile.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Shadcn UI
- Zod & React Hook Form
- Supabase (Database)
- Anakin API (Universal Crawl, Wire API)

## Getting Started

1. Copy `.env.example` to `.env.local` and add your API keys.
2. Run `npm install`
3. Run `npm run dev` to start the development server.

## Architecture
- `/app` - Next.js App Router pages and layouts
- `/components` - React components (ui, layout, shared)
- `/services` - Business logic and external API integrations (Anakin, AI, Database)
- `/types` - Strict TypeScript interfaces (Anakin API schemas, Data models)
- `/lib` - Utilities and constants
