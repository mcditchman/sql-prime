# SQLPrime Style Guide for AI Code Generation

## Color System

### Primary Colors
- `--primary-dark`: #0F172A (Dark navy - sidebar background)
- `--primary-main`: #1E293B (Navy - headers, primary buttons)
- `--primary-light`: #334155 (Light navy - active states, secondary elements)

### Secondary Colors
- `--secondary-light`: #F1F5F9 (Very light blue - card backgrounds, light mode background)
- `--secondary-main`: #E2E8F0 (Light blue-gray - borders, dividers)
- `--secondary-dark`: #94A3B8 (Medium blue-gray - inactive text, disabled elements)

### Accent Colors
- `--success`: #10B981 (Green - positive actions, success states)
- `--warning`: #F59E0B (Amber - warnings, alerts)
- `--error`: #EF4444 (Red - errors, destructive actions)
- `--info`: #3B82F6 (Blue - information, links)

### Text Colors
- `--text-primary`: #0F172A (Very dark blue - primary text)
- `--text-secondary`: #64748B (Medium gray - secondary text)
- `--text-disabled`: #94A3B8 (Light gray - disabled text)
- `--text-inverse`: #FFFFFF (White - text on dark backgrounds)

### Chart Colors
- `--chart-personal`: #64748B (Blue-gray - personal wallet data)
- `--chart-corporate`: #1E40AF (Medium blue - corporate wallet data)
- `--chart-investment`: #CBD5E1 (Light gray-blue - investment wallet data)
- `--chart-accent-1`: #10B981 (Green - first accent color)
- `--chart-accent-2`: #F59E0B (Amber - second accent color)

## Typography

```css
/* Font Family */
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

/* Font Sizes */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line Heights */
--line-height-tight: 1.25;
--line-height-base: 1.5;
--line-height-loose: 1.75;
```

## Spacing

```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

## Borders and Shadows

```css
/* Borders */
--border-radius-sm: 0.125rem;  /* 2px */
--border-radius-md: 0.25rem;   /* 4px */
--border-radius-lg: 0.5rem;    /* 8px */
--border-radius-xl: 0.75rem;   /* 12px */
--border-radius-2xl: 1rem;     /* 16px */
--border-radius-full: 9999px;  /* Fully rounded (for buttons, avatars) */

--border-width-thin: 1px;
--border-width-thick: 2px;
--border-color: var(--secondary-main);

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
```

## Component-Specific Styles

### Cards
- Background: var(--secondary-light)
- Border: var(--border-width-thin) solid var(--secondary-main)
- Border-radius: var(--border-radius-lg)
- Padding: var(--space-4) var(--space-5)
- Shadow: var(--shadow-sm)
- Header font-size: var(--font-size-lg)
- Header font-weight: var(--font-weight-semibold)

### Buttons
- Primary:
  - Background: var(--primary-main)
  - Text: var(--text-inverse)
  - Hover: var(--primary-dark)
- Secondary:
  - Background: var(--secondary-main)
  - Text: var(--text-primary)
  - Hover: darken(var(--secondary-main), 5%)
- Success:
  - Background: var(--success)
  - Text: var(--text-inverse)
- Border-radius: var(--border-radius-md)
- Padding: var(--space-2) var(--space-4)
- Font-weight: var(--font-weight-medium)

### Navigation
- Sidebar width: 72px (expanded: 240px)
- Active item:
  - Background: var(--primary-light)
  - Color: var(--text-inverse)
- Inactive item:
  - Color: var(--text-secondary)
- Icon size: 24px
- Spacing between items: var(--space-4)

### Tables
- Header:
  - Background: var(--secondary-main)
  - Font-weight: var(--font-weight-semibold)
- Row borders: var(--border-width-thin) solid var(--secondary-main)
- Row padding: var(--space-3) var(--space-4)
- Alternate row background: var(--secondary-light)
- Text alignment:
  - Text columns: left
  - Numeric columns: right

### Charts
- Grid lines: var(--secondary-main)
- Axis text: var(--text-secondary)
- Font-size: var(--font-size-xs)
- Legend font-size: var(--font-size-sm)
- Tooltip background: var(--primary-dark)
- Tooltip text: var(--text-inverse)

## Responsive Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

## Animation

```css
--transition-fast: 150ms;
--transition-normal: 250ms;
--transition-slow: 350ms;
--easing-default: cubic-bezier(0.4, 0, 0.2, 1);
```

## Dark Mode Variants
(Add these as needed if implementing dark mode)

```css
--dm-background: #0F172A;
--dm-card-bg: #1E293B;
--dm-border-color: #334155;
--dm-text-primary: #F8FAFC;
--dm-text-secondary: #CBD5E1;
```

This style guide provides a comprehensive reference for AI-assisted coding, with precise color values, typography, spacing, and component-specific styles to maintain consistency throughout the SQLPrime dashboard application.
