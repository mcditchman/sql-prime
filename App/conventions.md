# SQLPrime Frontend Conventions - React & Next.js

This document outlines our coding conventions and best practices for the SQLPrime frontend built with React, Next.js, and TypeScript. These guidelines ensure consistency, maintainability, and high code quality across the project.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Component Patterns](#component-patterns)
3. [TypeScript Usage](#typescript-usage)
4. [State Management](#state-management)
5. [Styling Conventions](#styling-conventions)
6. [API Communication](#api-communication)
7. [Testing Standards](#testing-standards)
8. [Performance Optimization](#performance-optimization)
9. [Accessibility](#accessibility)
10. [Code Quality Tools](#code-quality-tools)

## Project Structure

```
/src
  /app                 # Next.js app directory
    /api               # API routes
    /auth              # Authentication pages
    /dashboard         # Dashboard page
    /{feature}         # Feature-based pages
    /layout.tsx        # Root layout
    /page.tsx          # Home page
  /components          # Shared components
    /common            # Generic UI components
    /{feature}         # Feature-specific components
  /hooks               # Custom React hooks
  /lib                 # Utility functions
  /services            # API services
  /store               # State management (Redux)
  /types               # TypeScript types
```

- Follow the Next.js 13+ App Router pattern
- Group code by feature/domain when possible
- Keep all feature-specific components close to where they're used

## Component Patterns

### Component File Structure

```tsx
// Button.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import type { ButtonProps } from './Button.types';

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded font-medium',
        {
          'bg-blue-600 text-white': variant === 'primary',
          'bg-gray-200 text-gray-800': variant === 'secondary',
          'px-2 py-1 text-sm': size === 'small',
          'px-4 py-2': size === 'medium',
          'px-6 py-3 text-lg': size === 'large',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Component Guidelines

- Use functional components with hooks
- Extract complex logic into custom hooks
- Keep components focused on a single responsibility
- Use named exports for components
- Create separate type files for complex component props

## TypeScript Usage

### Type Definitions

```tsx
// User.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export type UserCreatePayload = Omit<User, 'id' | 'createdAt'>;

export type UserUpdatePayload = Partial<UserCreatePayload>;
```

### TypeScript Best Practices

- Define explicit interfaces/types for all data structures
- Use TypeScript's utility types when appropriate (Partial, Omit, Pick)
- Avoid using `any` type - use `unknown` instead when type is truly unknown
- Use type guards to narrow types when necessary
- Use discriminated unions for state management

```tsx
// Using discriminated unions for state
type FetchState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

## State Management

### Local Component State

- Use `useState` for simple component state
- Use `useReducer` for complex state logic

```tsx
// Simple state
const [isOpen, setIsOpen] = useState(false);

// Complex state
const [state, dispatch] = useReducer(reducer, initialState);
```

### Global State Management

- Use React Query for server state (data fetching, caching, synchronization)
- Use Redux Toolkit for client state (auth, UI preferences, feature flags)
- Keep Redux store modular with slice pattern

```tsx
// Redux slice example
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
```

## Styling Conventions

### Tailwind CSS Usage

- Use Tailwind utility classes for most styling needs
- Group related classes together
- Create component abstractions for repeated patterns

```tsx
// Consistent grouping order
<div 
  className="
    flex items-center justify-between  /* Layout */
    p-4 mb-3                          /* Spacing */
    bg-white dark:bg-gray-800         /* Colors */
    rounded-lg shadow-sm               /* Visual effects */
    hover:shadow-md transition-shadow  /* Interactivity */
  "
>
```

### Component-specific Styling

- Use the `cn()` utility to conditionally apply classes
- Use CSS Modules or styled-components for complex components if needed
- Define design tokens/theme variables in a central location

## API Communication

### API Service Pattern

```tsx
// userService.ts
import { axiosInstance } from '@/lib/axios';
import type { User, UserCreatePayload, UserUpdatePayload } from '@/types';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get('/users');
    return response.data;
  },
  
  getUserById: async (id: string): Promise<User> => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },
  
  createUser: async (user: UserCreatePayload): Promise<User> => {
    const response = await axiosInstance.post('/users', user);
    return response.data;
  },
  
  updateUser: async (id: string, user: UserUpdatePayload): Promise<User> => {
    const response = await axiosInstance.put(`/users/${id}`, user);
    return response.data;
  },
  
  deleteUser: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/users/${id}`);
  }
};
```

### React Query Usage

```tsx
// Using React Query hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';

// Fetch users
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers
  });
};

// Create user mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });
};
```

## Testing Standards

### Component Testing

- Use React Testing Library for component tests
- Test behavior, not implementation
- Use data-testid attributes for test selectors

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test Coverage Requirements

- Aim for >80% test coverage
- Test all user interactions
- Test loading, error, and success states
- Use MSW (Mock Service Worker) to mock API requests

## Performance Optimization

### Memoization

- Use `useMemo` for expensive calculations
- Use `useCallback` for handler functions passed to child components
- Use React.memo for pure components that render often with the same props

```tsx
// Memoization example
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

const handleClick = useCallback(() => {
  console.log('Button clicked!');
}, []);
```

### Image Optimization

- Use Next.js Image component for optimized images
- Specify width and height attributes to avoid layout shift
- Use appropriate image formats (WebP, AVIF when supported)

```tsx
import Image from 'next/image';

// Optimized image
<Image 
  src="/profile.jpg"
  alt="User profile"
  width={200}
  height={200}
  priority={isAboveTheFold}
/>
```

## Code Quality Tools

- ESLint: Use project-specific ESLint configuration
- Prettier: Format code consistently
- Husky: Run pre-commit hooks for linting and testing
- TypeScript: Enforce strict type checking

```json
// .eslintrc.json example
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}
```

## Monaco Editor Integration

```tsx
// SQLEditor.tsx
import { Editor } from '@monaco-editor/react';

export const SQLEditor = ({ value, onChange }) => {
  return (
    <Editor
      height="300px"
      language="sql"
      theme="vs-dark"
      value={value}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        wordWrap: 'on'
      }}
    />
  );
};
```

## D3.js Visualization Pattern

```tsx
// ExecutionPlanVisualization.tsx
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import type { ExecutionPlan } from '@/types';

export const ExecutionPlanVisualization = ({ data }: { data: ExecutionPlan }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  useEffect(() => {
    if (!svgRef.current || !data) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    
    // D3 visualization code here...
    // Create hierarchical tree layout
    // Render nodes and connections
    // Add interactivity
    
  }, [data]);
  
  return (
    <div className="execution-plan-visualization">
      <svg ref={svgRef} width="100%" height="600" />
    </div>
  );
};
```

## Form Handling with React Hook Form

```tsx
// ConnectionForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const connectionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  server: z.string().min(1, 'Server is required'),
  database: z.string().min(1, 'Database is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type ConnectionFormValues = z.infer<typeof connectionSchema>;

export const ConnectionForm = ({ onSubmit }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ConnectionFormValues>({
    resolver: zodResolver(connectionSchema)
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Connection Name
        </label>
        <input
          id="name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      
      {/* Other form fields... */}
      
      <button 
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Save Connection
      </button>
    </form>
  );
};
```