<div >
  <h1 align="center">Auth App</h1>
  <h3 align="center">A simple project for Basic authentication.</h3>
</div>

<div align="center" >
  <h3>Tech Stack</h3>
  <a href='https://hono.dev'><img src='frontend/src/assets/hono.svg' alt="Hono Js : Express Js alternative" width="48" height="48" /></a>
  <a href='https://react.dev'><img src='frontend/src/assets/react.svg' alt="react" width="48" height="48" /></a>
  <a href='https://vitejs.dev/'><img src='frontend/src/assets/vite.svg' alt="vite" width="48" height="48" /></a>
  <a href='https://bun.sh/'><img src='frontend/src/assets/bun.svg' alt="bunjs" width="48" height="48" /></a>
  <a href='https://lucia-auth.com/'><img src='frontend/src/assets/lucia.svg' alt="lucia auth" width="48" height="48" /></a>
  <a href='https://www.typescriptlang.org/'><img src='frontend/src/assets/typescript.svg' alt="typescript" width="48" height="48" /></a>
  <a href='https://ui.shadcn.com/'><img src='frontend/src/assets/shadcnui.svg' alt="shadcnui" width="48" height="48" /></a>
  <a href='https://zod.dev/'><img src='frontend/src/assets/zod.svg' alt="zod" width="48" height="48" /></a>
  <a href='https://tailwindcss.com/'><img src='frontend/src/assets/tailwindcss.svg' alt="tailwindcss" width="48" height="48" /></a>
  <a href='https://sqlite.org/'><img src='frontend/src/assets/sqlite.svg' alt="sqlite" width="48" height="48" /></a>
  <a href='https://reactrouter.com/'><img src='frontend/src/assets/reactrouter.svg' alt="reactrouter" width="48" height="48" /></a>
  <a href='https://www.react-hook-form.com/'><img src='frontend/src/assets/reacthookform.svg' alt="reacthookform" width="48" height="48" /></a>
  <a href='https://tanstack.com/query/latest'><img src='frontend/src/assets/reactquery.svg' alt="reactquery" width="48" height="48" /></a>
  <a href='https://www.prisma.io/docs/getting-started/quickstart'><img src='frontend/src/assets/prisma.svg' alt="prisma" width="48" height="48" /></a>
</div>

## Demo

<div align="center" >
  <img src='frontend/src/assets/demo.gif' alt="prisma"  />
</div>

## Features

- **Register:** Add a new user.
- **Login** login in existing User.
- **logout:** invalidating user session and remove session cookie
- **Validate requests** check for the session cookie, validate it.

## Learning Objectives

- Understand a basic **Session Authentication**
- **Finish** a small project in **one day**
- Be familiar with **Honojs**, **lucia** and **tanstack query**

## Instructions

### 1. Clone the repository

```shell
git clone https://github.com/onemahmoudadel/auth-app.git
```

### 2. Install server dependencies

```shell
cd auth-app
npm install
```

### 3. Initialize the database

```shell
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

### 3. Install frontend dependencies

open new terminal

```shell
cd auth-app/fontend
npm install
```

### 5. Run the dev server

```shell
npm run dev
```

### 6. Open the app in your browser

```
open http://localhost:5173
```
