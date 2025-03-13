# SQL Prime Engine

SQL Prime Engine is a Vue.js web application that provides an intuitive interface for developers to analyze and optimize their SQL queries. The frontend communicates with the backend API to process queries, visualize execution plans, and display optimization recommendations.

## Features

- **Query Editor**: Syntax-highlighted SQL editor with history and templates
- **Connection Management**: Add, edit, and delete database connections
- **Execution Plan Visualization**: Interactive visualization of query execution plans
- **Optimization Recommendations**: Get suggestions to improve query performance
- **Performance Analytics**: Track query performance over time
- **User Authentication**: Secure access with role-based permissions

## Technology Stack

- **Vue.js 3**: Frontend framework with Composition API
- **TypeScript**: For type safety and improved developer experience
- **Vite**: Build tool and development server
- **Pinia**: State management
- **Vue Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **PrimeVue**: UI component library
- **Monaco Editor**: Code editor for SQL input
- **D3.js & Chart.js**: For data visualization
- **Axios**: HTTP client for API communication

## Project Structure

The project follows a feature-based organization pattern:

```
/src
  /assets              # Static assets
  /components          # Shared components
    /common            # Truly generic components
    /layout            # Layout components
    /forms             # Form-related components
  /composables         # Shared composable functions
  /features            # Feature modules
    /auth              # Authentication feature
    /dashboard         # Dashboard feature
    /editor            # Query editor feature
    /connections       # Connection management
    /execution-plan    # Execution plan visualization
    /optimization      # Query optimization
    /analytics         # Performance analytics
    /settings          # User preferences
  /router              # Route definitions
  /stores              # Pinia stores
  /services            # API and external services
  /types               # TypeScript types and interfaces
  /utils               # Utility functions
  /views               # Page components
```

## Getting Started

### Prerequisites

- Node.js (v16.x or later)
- npm (v8.x or later) or Yarn (v1.22.x or later)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/sql-prime-engine.git
   cd sql-prime-engine
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create environment files
   ```bash
   # .env.development
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Development

### Coding Conventions

- Follow Vue.js Style Guide (Priority A & B rules)
- Use TypeScript interfaces for all data structures
- Use Composition API with `<script setup>` syntax
- Follow the naming conventions in the codebase

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run test:unit` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Lint the codebase
- `npm run format` - Format the codebase

## License

This project is licensed under the MIT License - see the LICENSE file for details.
