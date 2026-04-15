# cms-angular-auth

Angular 11 microfrontend for authentication and role-based access control in the CMS Ultra platform.

## Features

- 🔐 Sign-in form with email/password and validation
- 👥 Role management dashboard (Admin, Editor, Contributor, Viewer)
- 🛡️ Security info cards (SSO, audit logs, enterprise features)

## Live Demo

🌐 **Standalone:** https://AaqibhafeezKhan.github.io/cms-angular-auth  
🌐 **In Shell:** https://AaqibhafeezKhan.github.io/cms-root-orchestration/auth

## Local Development

```bash
npm install
npm start   # → http://localhost:8084
```

## Build

```bash
npm run build   # outputs dist/main.js as SystemJS module
```

> Uses webpack + ts-loader directly (no Angular CLI). Angular JIT compilation via `@angular/platform-browser-dynamic`.
