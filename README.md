# 🚀 Article Publishing Platform - Frontend

<p align="center">
  <img src="https://img.shields.io/badge/Angular-21-red" />
  <img src="https://img.shields.io/badge/Standalone-Architecture-success" />
  <img src="https://img.shields.io/badge/Angular%20Material-UI-blue" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue" />
  <img src="https://img.shields.io/badge/JWT-Authentication-success" />
  <img src="https://img.shields.io/badge/RxJS-Reactive-purple" />
  <img src="https://img.shields.io/badge/Build-Angular%20CLI-dd0031" />
</p>

A modern and scalable frontend application for the **Article Publishing Platform** built using **Angular Standalone Architecture**.

This frontend provides authentication, article publishing, nested comments, likes, draft management, route protection, JWT-based authorization, and seamless integration with the Spring Boot backend.

Built with reusable standalone components and modern Angular best practices.

---

# ✨ Features

## 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT Token-based Authentication
* Route Protection using Auth Guards
* HTTP Interceptor for Automatic JWT Injection

---

## 📰 Article Features

* Create Articles
* Edit Articles
* Delete Articles
* View Article Details
* Article Listing
* Draft Article Management

---

## 💬 Comment System

* Nested Comments
* Recursive Comment Rendering
* Add Comments
* Dynamic Comment Updates

---

## ❤️ Like System

* Like Articles
* Real-time Like Count Updates
* Like State Management

---

## ⚡ Modern Angular Features

* Angular Standalone Components
* Angular Routing
* Reactive HTTP Services
* Environment-based Configuration
* Modular Service Architecture

---

## 🎨 UI Features

* Responsive Layout
* Angular Material Integration
* Reusable UI Components
* Clean Component-driven Design

---

# 🏗️ Architecture

The frontend follows a scalable component-driven architecture.

```text
Client
   ↓
Angular Components
   ↓
Services Layer
   ↓
HTTP Interceptor
   ↓
Spring Boot Backend API
```

---

# 🛠️ Tech Stack

| Category             | Technology             |
| -------------------- | ---------------------- |
| Framework            | Angular 21             |
| Language             | TypeScript             |
| Styling              | CSS + Angular Material |
| Authentication       | JWT                    |
| HTTP Client          | Angular HttpClient     |
| Routing              | Angular Router         |
| Reactive Programming | RxJS                   |
| Build Tool           | Angular CLI            |

---

# 📂 Project Structure

```text
src
│
├── app
│   ├── components
│   │   ├── articles
│   │   │   ├── create
│   │   │   ├── detail
│   │   │   ├── drafts
│   │   │   ├── edit
│   │   │   └── list
│   │   │
│   │   ├── comments
│   │   ├── likes
│   │   ├── login
│   │   └── register
│   │
│   ├── guards
│   ├── interceptors
│   ├── models
│   └── services
│
├── environments
│
├── styles.css
└── main.ts
```

---

# 🔐 Authentication Flow

```text
User Login
     ↓
Backend Generates JWT
     ↓
Frontend Stores JWT
     ↓
Auth Interceptor Adds Token
     ↓
Protected API Access
```

---

# ⚙️ Prerequisites

Before running the project, install:

* Node.js
* Angular CLI
* Article Platform Backend

---

# 📥 Install Node.js

Download Node.js:

https://nodejs.org/

Verify installation:

```bash
node -v
npm -v
```

---

# 📥 Install Angular CLI

Install globally:

```bash
npm install -g @angular/cli
```

Verify installation:

```bash
ng version
```

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/sahasayan421-git/article-platform-frontend-public.git
cd article-platform-frontend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Update:

```text
src/environments/environment.ts
```

Example:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080'
};
```

---

## 4️⃣ Start Development Server

```bash
ng serve
```

Once the server starts, open:

```text
http://localhost:4200
```

The application automatically reloads when source files change.

---

# 🔗 Backend Integration

Ensure the Spring Boot backend is running at:

```text
http://localhost:8080
```

Frontend communicates with backend APIs using Angular services and HttpClient.

---

# 🛡️ Route Protection

Protected routes are secured using:

* `auth-guard.ts`
* `auth-interceptor.ts`

Features:

* Prevent unauthorized access
* Automatic JWT injection
* Token-based authentication flow

---

# 📦 Core Services

| Service        | Responsibility          |
| -------------- | ----------------------- |
| AuthService    | Authentication handling |
| ArticleService | Article CRUD operations |
| CommentService | Comment management      |
| LikeService    | Like functionality      |
| UserService    | User APIs & mentions    |

---

# 🧩 Core Components

## Authentication

* Login Component
* Register Component

## Article Components

* Create Article
* Edit Article
* Article Detail
* Article List
* Draft Management

## Engagement Components

* Comment Component
* Like Component

---

# 🌍 Environment Configuration

## Development

```typescript
environment.development.ts
```

## Production

```typescript
environment.ts
```

Used for:

* API URLs
* Production configuration
* Environment-specific settings

---

# 🎨 Angular Material Setup

The project includes Angular Material configuration via:

```text
material-theme.scss
```

Provides:

* Modern UI Components
* Responsive Design
* Improved User Experience

---

# 🧪 Running Tests

To execute unit tests:

```bash
ng test
```

This project uses:

* Vitest
* Angular Testing Utilities

---

# 🏗️ Building the Project

To build the project:

```bash
ng build
```

Build artifacts are stored in:

```text
dist/
```

Production builds are optimized for:

* Performance
* Tree-shaking
* Bundle optimization

---

# ⚙️ Code Scaffolding

Angular CLI provides powerful scaffolding utilities.

Generate a new component:

```bash
ng generate component component-name
```

Generate other Angular artifacts:

```bash
ng generate --help
```

---

# 🧪 End-to-End Testing

Run e2e tests:

```bash
ng e2e
```

Angular CLI does not include an e2e framework by default.

You may integrate:

* Cypress
* Playwright
* Selenium

---

# 📊 Implemented Frontend Concepts

* Standalone Angular Architecture
* JWT Authentication
* Angular Route Guards
* HTTP Interceptors
* Reactive Programming with RxJS
* REST API Integration
* Environment Configuration
* Modular Service Layer
* Recursive Component Rendering

---

# 🔥 Highlights

## ✅ Standalone Angular Architecture

Uses modern Angular standalone components without NgModules.

## ✅ Secure Authentication

Integrated JWT authentication with automatic token handling.

## ✅ Protected Routes

Authenticated route access using Angular guards.

## ✅ Backend Integration

Fully integrated with Spring Boot REST APIs.

## ✅ Reusable Component Design

Scalable and maintainable frontend architecture.

---

# 📈 Future Enhancements

* Rich Text Editor
* Dark Mode
* Real-time Notifications
* WebSocket Integration
* Image Upload Support
* Infinite Scrolling
* State Management with NgRx
* Progressive Web App (PWA)
* Docker Deployment
* Angular SSR Support

---

# 📚 Additional Resources

For more information on Angular CLI:

* https://angular.dev/tools/cli
* https://angular.dev

---

# 🤝 Contributing

Contributions are welcome.

## Steps

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push changes
5. Create a Pull Request

---

# 👨‍💻 Author

## Sayan Saha

Full Stack Developer passionate about scalable frontend and backend applications.

### GitHub

https://github.com/sahasayan421-git

---
