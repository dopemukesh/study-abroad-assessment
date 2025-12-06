# Study Abroad Frontend Assessment

## Project Overview
This project is a frontend assessment built using Next.js 14, designed to demonstrate proficiency in modern React development with a focus on state management, authentication, and UI design. It connects to the DummyJSON API to manage users and products, featuring protected routes, dynamic pagination, and responsive design. The application emphasizes performance optimization through caching, memoization, and debouncing techniques.

## Technology Stack
- Next.js 14 (App Router)
- Material-UI v5
- Zustand (state management and caching)
- DummyJSON API

## Setup Instructions
- Run `npm install` to install dependencies
- Run `npm run dev` to start the development server

## Demo Credentials
- Username: emilys
- Password: emilyspass

## Implemented Features
- Authentication integrated with NextAuth and Zustand for global state
- Dashboard routes protected with authentication guards
- User management: pagination, search, and detailed user views
- Product management: pagination, search, category filtering, and grid layout display
- Fully responsive interface designed with Material-UI components
- Client-side data caching using Zustand with persistence enabled
- Performance optimizations including memoization and debounced search inputs

## Why Zustand?
Zustand is a lightweight (1KB) and efficient global state management library. It supports asynchronous actions, persistence, and developer tools out of the box. Compared to React Context, it prevents unnecessary re-renders, making it an ideal choice for scalable and performant applications.
