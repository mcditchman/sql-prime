# SQLPrime Project Directory Structure

This document outlines the recommended directory structure for each project in the SQLPrime solution, following clean architecture principles and CQRS pattern.

## Solution Structure

```
SQLPrime/
├── SQLPrime.Engine.Api            # API endpoints and controllers
├── SQLPrime.Engine.Core           # Domain entities and interfaces
├── SQLPrime.Engine.Application    # Business logic and use cases
├── SQLPrime.Engine.Infrastructure # External services and data access
└── SQLPrime.Engine.Tests          # Unit and integration tests
└── SQLPrime.Engine.Database       # SSDT Project for SQL Schema files
```

## SQLPrime.Engine.Core

```
SQLPrime.Engine.Core/
├── Entities/              # Domain entities
│   ├── Connections/       # Connection-related entities
│   ├── Queries/           # Query-related entities
│   ├── Analysis/          # Analysis-related entities
│   ├── Recommendations/   # Recommendation-related entities
│   └── Users/             # User-related entities
├── Interfaces/            # Core interfaces
│   ├── Repositories/      # Repository interfaces
│   ├── Services/          # Service interfaces
│   └── Infrastructure/    # Infrastructure interfaces
├── Enums/                 # Enumeration types
├── Exceptions/            # Custom domain exceptions
└── ValueObjects/          # Value objects
```

## SQLPrime.Engine.Application

```
SQLPrime.Engine.Application/
├── Common/                # Common application components
│   ├── Behaviors/         # Pipeline behaviors (validation, logging)
│   ├── Exceptions/        # Application-specific exceptions
│   ├── Interfaces/        # Application interfaces
│   └── Models/            # Shared models/DTOs
├── Features/              # Feature-organized commands and queries
│   ├── Connections/       # Connection management
│   │   ├── Commands/      # Commands for connections
│   │   ├── Queries/       # Queries for connections
│   │   └── Validators/    # Validators for connection operations
│   ├── QueryAnalysis/     # Query analysis feature
│   ├── Recommendations/   # Recommendation feature
│   ├── Users/             # User management
│   └── Dashboard/         # Dashboard features
├── Mappings/              # AutoMapper profiles
├── DTOs/                  # Data Transfer Objects
│   ├── Connections/
│   ├── Queries/
│   ├── Analysis/
│   └── Recommendations/
└── Services/              # Application services
```

## SQLPrime.Engine.Infrastructure

```
SQLPrime.Engine.Infrastructure/
├── Data/                  # Data access
│   ├── ConnectionFactories/ # Database connection factories
│   ├── Context/           # EF Core DbContext (if used)
│   ├── Migrations/        # Database migrations
│   ├── Repositories/      # Repository implementations
│   │   ├── Connections/   # Connection repositories
│   │   ├── Queries/       # Query repositories
│   │   ├── Analysis/      # Analysis repositories
│   │   └── Users/         # User repositories
│   └── Interceptors/      # Query interceptors
├── Services/              # Infrastructure service implementations
│   ├── Authentication/    # Auth services
│   ├── DatabaseAnalysis/  # Services for analyzing databases
│   ├── AI/                # AI integration services
│   ├── Cache/             # Caching services
│   └── Background/        # Background job services (Hangfire)
├── Security/              # Security implementations
│   ├── Encryption/        # Data encryption
│   └── ApiKeys/           # API key management
└── Providers/             # External providers
    ├── SQLServer/         # SQL Server provider
    ├── MySQL/             # MySQL provider
    └── PostgreSQL/        # PostgreSQL provider
```

## SQLPrime.Engine.Api

```
SQLPrime.Engine.Api/
├── Controllers/           # API controllers
│   ├── v1/                # Version 1 controllers
│   └── v2/                # Version 2 controllers (future)
├── Filters/               # Action filters
├── Middleware/            # Custom middleware
│   ├── ExceptionHandling/ # Exception handling middleware
│   ├── Authentication/    # Auth middleware
│   └── RateLimiting/      # Rate limiting middleware
├── Models/                # API-specific models
│   ├── Requests/          # Request models
│   └── Responses/         # Response models
├── Extensions/            # Extension methods
├── Swagger/               # Swagger configuration
├── HealthChecks/          # Health check endpoints
├── appsettings.json       # Configuration settings
└── Program.cs             # Application entry point
```

## SQLPrime.Engine.Tests

```
SQLPrime.Engine.Tests/
├── Core/                  # Core layer tests
├── Application/           # Application layer tests
│   ├── Features/          # Feature tests
│   │   ├── Connections/   # Connection feature tests
│   │   ├── QueryAnalysis/ # Analysis feature tests
│   │   └── Recommendations/ # Recommendation feature tests
│   ├── Validators/        # Validator tests
│   └── Behaviors/         # Pipeline behavior tests
├── Infrastructure/        # Infrastructure layer tests
│   ├── Data/              # Data access tests
│   │   ├── Repositories/  # Repository tests
│   │   └── Migrations/    # Migration tests
│   └── Services/          # Service tests
├── Api/                   # API layer tests
│   ├── Controllers/       # Controller tests
│   ├── Middleware/        # Middleware tests
│   └── Integration/       # API integration tests
├── Common/                # Common test utilities
│   ├── Fixtures/          # Test fixtures
│   ├── Builders/          # Test data builders
│   └── Mocks/             # Common mocks
└── TestUtilities/         # Test helper classes
```

## SQLPrime.Engine.Database
```
SQLPrime.Database/
├── Schema/                # Table definitions
│   ├── dbo/               # Default schema
│   │   ├── Tables/        # Table creation scripts
│   │   ├── Views/         # View creation scripts
│   │   └── Types/         # User-defined types
├── StoredProcedures/      # Organized by feature
│   ├── Connections/       # Connection-related procedures
│   ├── Queries/           # Query-related procedures
│   ├── Analysis/          # Analysis-related procedures
│   └── Recommendations/   # Recommendation-related procedures
├── Functions/             # SQL functions
├── Migrations/            # Versioned migration scripts
│   ├── V1.0.0/            # Initial schema
│   └── V1.1.0/            # Schema updates
└── Scripts/               # Utility scripts
    ├── Post-Deployment/   # Scripts to run after deployment
    └── Pre-Deployment/    # Scripts to run before deployment
```

The structure above follows clean architecture principles with a clear separation of concerns between layers. It is organized to support the CQRS pattern with feature-based organization within each layer, which aligns with the project roadmap stages and allows for incremental implementation of features.
