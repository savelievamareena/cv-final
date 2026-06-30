# Employees Management App

A web application for managing employees, their CVs and skills. Users can maintain
profiles, build and preview CVs, manage projects, and administer reference data such
as departments, positions, skills and languages.

Built with React, TypeScript and Apollo Client on top of a GraphQL API.

## Features

- Authentication (sign up, log in, email verification)
- User profiles with skills and languages
- CV management: details, skills, projects and a printable preview
- Project management
- Admin reference data: departments, positions, skills, languages
- Bulk delete, breadcrumbs and notifications
- Light/dark theme and i18n (English / Russian)

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for bundling and dev server
- [Apollo Client](https://www.apollographql.com/docs/react/) + [GraphQL](https://graphql.org/)
- [Ant Design](https://ant.design/) for UI components
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for forms and validation
- [React Router](https://reactrouter.com/) for routing
- [i18next](https://www.i18next.com/) for internationalization
- SCSS modules for styling

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root (see `.env.example`):

```
VITE_GRAPHQL_URL=<your GraphQL API endpoint>
```

### Development

```bash
npm run dev
```

The app will be available at the URL printed by Vite (default `http://localhost:5173`).

## Available Scripts

| Script             | Description                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Start the development server with HMR        |
| `npm run build`    | Type-check and build for production          |
| `npm run preview`  | Preview the production build locally         |
| `npm run lint`     | Run ESLint                                   |
| `npm run lint:fix` | Run ESLint and automatically fix issues      |

## Project Structure

```
src/
├── api/          # Shared GraphQL queries and mutations
├── components/   # Reusable UI components
├── constants/    # App-wide constants
├── graphql/      # Apollo Client setup
├── helpers/      # Utility helpers (breadcrumbs, notifications, etc.)
├── hooks/        # Shared hooks
├── modules/      # Feature modules (auth, cvs, users, projects, ...)
├── pages/        # Route-level pages
├── router/       # Routing configuration
├── services/     # App services (auth, theme, dialog, storage, ...)
└── scss/         # Global styles, mixins and variables
```
