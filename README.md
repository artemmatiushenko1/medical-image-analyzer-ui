![preview](./public/banner.png)

# HealthLens 🫀

Front-end part of the AI-based early disease diagnosis system.

## Domain

The domain of this software is healthcare, in particular, the early diagnosis of human diseases using image analysis powered by AI. The application can be used as a system for remote computer-aided diagnosis (CAD). It aims to enable users to independently conduct preliminary diagnostics of diseases using images of body parts, making medical services more accessible in the remote areas and increasing the chances of timely detection and treatment of diseases.

## Requirements

- [NodeJS](https://nodejs.org/en) (20.x.x);
- [npm](https://www.npmjs.com/) (10.x.x);

## Architecture

### Technologies

1. [React](https://react.dev/) — library for building web user interfaces
2. [Zustand](https://github.com/pmndrs/zustand) — ui state manager
3. [TanStack Query](https://tanstack.com/query/latest) — asynchrous state manager
4. [TypeScript](https://www.typescriptlang.org/) — strongly typed programming language that builds on JavaScript
5. [Vite](https://vite.dev/) — frontend build tool
6. [Material UI](https://mui.com/material-ui/) — React component library that implements Google's Material Design

### Folder structure

- `app` - entry point of the application that defines routing and other global level configuration
- `assets` - media files, such as fonts, images etc.
- `env` - app enviroment configuration files
- `i18n` - internatization scripts and ui translations
- `libs` - shared utilities and other building blocks
  - `components` - ui components (e.g. buttons, inputs)
  - `hooks` - custom React hooks
  - `enums` - shared enums
  - `helpers` - helper functions
  - `packages` - reusable libraries
  - `theme` - app theme configuration
  - `types` - utility types
- `mocks` - provides mock REST API implementation for development purposes
- `packages` - separate modules for each domain feature
- `pages` - app pages

## How to Run

1. Optionally create `.env` file based on the example at `./src/env`, otherwise the app will use development mode configuration.
2. Install dependencies.

```sh
npm install
```

3. Run the app locally.

```sh
npm run dev
```

Open http://localhost:5173/ in your browser. Voilà - the app is ready to test 🎩

## Deployment

The production deployment is provided by [Netlify](https://www.netlify.com/) and available at: https://healthlens.netlify.app/.
