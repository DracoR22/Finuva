<a href="https://finuva.vercel.app">
  <img src="/public/banner.png">
  <h1 align="center">Finuva 🦄</h1>
</a>

<p align="center">
  Efficiently manage your finances with this platform that optimizes spending, analyzes investments, and crafts tailored financial plans.
</p>

### 💡 Key Features

- 💸 Spending Optimization: Seamlessly track and optimize your spending habits.
- 📈 Investment Analysis: Gain insights into your investments for informed decision-making.
- 📋 Financial Planning: Create personalized financial plans to meet your goals.

### 🔧 Technology Stack

- 🌐 Next.js: Utilize the benefits of server-side rendering and React for a dynamic web experience.
- 🐘 Postgres: Store and manage financial data securely with a robust relational database.
- 💼 DrizzleORM: Simplify database operations and interactions within the application.
- 🔥 Hono: Ultrafast & Lightweight web framework
- 🔑 Authentication using Clerk
- 🌓 Light and Dark Mode: Customize your viewing experience with light and dark themes.

### Upload your transactions or manage them manually
<img src="/public/banner2.png">


### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/DracoR22/Finuva
```

### Install packages

```shell
pnpm install
```

### Setup .env file

```js
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

CLERK_PUBLISHABLE_KEY=

DATABASE_URL=

NEXT_PUBLIC_APP_URL=
```

### Start the app

```shell
pnpm dev
```

## Available commands

Running commands with npm `pnpm [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
| `build` | Build project                            |
| `lint`  | Check lint for project                   |