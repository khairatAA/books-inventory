# BookAdmin Frontend

## Overview

[BookAdmin](https://books-inventory-gamma.vercel.app/) is a React-based frontend for managing books.  
It integrates with a GraphQL backend using Apollo Client and handles authentication via Auth0. The UI is built with Chakra UI for a responsive and accessible design.
Live demo: https://books-inventory-gamma.vercel.app/

The app provides:

- Authentication-protected dashboard
- CRUD operations for books
- Responsive tables with pagination
- Loading, error, and empty states
- Toast notifications for actions

---

## Tech Stack

- **Framework:** React 18
- **UI:** Chakra UI
- **State Management:** React Query (`@tanstack/react-query`)
- **GraphQL Client:** Apollo Client
- **Authentication:** Auth0 (`@auth0/auth0-react`)
- **Forms & Validation:** react-hook-form + yup
- **Icons:** React Icons

---

## Features

- **Authentication:** Auth0-based login/logout with protected routes
- **Book Management:**
  - Create, Read, Update, Delete books
  - Responsive table with pagination
  - Truncated descriptions on smaller screens
- **Feedback:** Toast notifications for all major actions
- **Error Handling:** Graceful handling of loading and errors
- **Reusable Components:** BookModal, BooksTable, Navbar, SplashScreen

---

## Project Structure

```bash
src/
│
├── components/ # Reusable UI components
│ ├── dashboard/ # Dashboard-related components (BooksTable, BookModal)
│ ├── layout/ # Navbar, SplashScreen
│ └── ui/ # Toaster, form fields
│
├── hooks/ # Custom hooks (useBooks)
├── lib/ # GraphQL API hooks (useBooksApi)
├── pages/ # Page-level components (Dashboard, Login, etc.)
├── schema/ # Validation schemas (yup)
└── main.tsx # App entry, QueryClientProvider, AuthApolloProvider
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/khairatAA/books-inventory.git
cd frontend
```

2. Install dependencies:

```bash
npm install
or
yarn install
```

3. Create a .env file in the root with the following variables:

```bash
 VITE_APP_API_BASE_URL=your-graphql-api
 VITE_APP_AUTH0_DOMAIN=your-auth0-domain
 VITE_APP_AUTH0_CLIENT_ID=your-auth0-client-id
 VITE_APP_AUTH0_AUDIENCE=your-auth0-audience
```

---

## Running the App

```bash
npm install
or
yarn install
```

Visit http://localhost:5173 to view the app.

---

## Usage

- Login using Auth0 credentials
- Access the dashboard to view books
- Click Add Book to create a new book
- Use Edit and Delete buttons to modify books
- Table handles empty, loading, and error states automatically
