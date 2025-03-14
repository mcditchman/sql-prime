# SQLPrime - Backend Requirements Document

## Project Overview
The SQLPrime backend is a .NET Core Web API application that provides services for analyzing SQL queries, retrieving execution plans, and generating optimization recommendations. The backend connects to user databases, analyzes query performance, and provides actionable suggestions for improvements.

## Required Technologies

### Core Technologies
- **.NET 7.0+**: Framework for building the API
- **C# 11+**: Programming language
- **ASP.NET Core**: Web API framework
- **Dapper**: ORM for data access
- **SQL Server**: Primary database for application storage

### Database Analysis
- **Microsoft.SqlServer.TransactSql.ScriptDom**: SQL parsing library
- **Microsoft.Data.SqlClient**: SQL Server data provider
- **Database-specific providers**: For MySQL, PostgreSQL, etc.

### Authentication & Authorization
- **Microsoft Identity**: User management
- **JWT Authentication**: Token-based authentication
- **Identity Server**: For OAuth 2.0/OpenID Connect (optional for SSO)

### Caching & Performance
- **Redis**: Distributed caching
- **Polly**: Resilience and transient fault handling

### Background Processing
- **Hangfire**: Background job processing
- **MediatR**: CQRS and request/response pattern

### Testing Tools
- **xUnit**: Unit testing framework
- **Moq**: Mocking framework
- **FluentAssertions**: Assertion library
- **Testcontainers**: Integration testing with containers

### Development Tools
- **Swagger/OpenAPI**: API documentation
- **Serilog**: Structured logging
- **AutoMapper**: Object mapping
- **FluentValidation**: Request validation

## Project Setup

1. **Environment Requirements**:
   - .NET 7.0 SDK or later
   - Visual Studio 2022 or JetBrains Rider
   - SQL Server 2019 or later (local or cloud instance)
   - Git

2. **Project Initialization**:
   ```bash
   # Create solution
   dotnet new sln -n SQLPrime

   # Create Web API project
   dotnet new webapi -n SQLPrime.Api
   dotnet sln add SQLPrime.Api

   # Create supporting projects
   dotnet new classlib -n SQLPrime.Core
   dotnet new classlib -n SQLPrime.Infrastructure
   dotnet new classlib -n SQLPrime.Application
   dotnet new xunit -n SQLPrime.Tests
   
   dotnet sln add SQLPrime.Core
   dotnet sln add SQLPrime.Infrastructure
   dotnet sln add SQLPrime.Application
   dotnet sln add SQLPrime.Tests
   ```

3. **Core Dependencies Installation**:
   ```bash
   # API project dependencies
   cd SQLPrime.Api
   dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Design
   dotnet add package Swashbuckle.AspNetCore
   dotnet add package Serilog.AspNetCore
   dotnet add package Serilog.Sinks.Console
   dotnet add package Serilog.Sinks.File
   dotnet add package FluentValidation.AspNetCore
   dotnet add package MediatR.Extensions.Microsoft.DependencyInjection
   dotnet add package Hangfire.AspNetCore
   dotnet add package Hangfire.SqlServer
   dotnet add package Microsoft.Data.SqlClient
   dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
   dotnet add reference ../SQLPrime.Application

   # Application project dependencies
   cd ../SQLPrime.Application
   dotnet add package MediatR
   dotnet add package FluentValidation
   dotnet add package AutoMapper
   dotnet add package Microsoft.Extensions.Logging.Abstractions
   dotnet add reference ../SQLPrime.Core
   dotnet add reference ../SQLPrime.Infrastructure

   # Infrastructure project dependencies
   cd ../SQLPrime.Infrastructure
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.Data.SqlClient
   dotnet add package Microsoft.SqlServer.TransactSql.ScriptDom
   dotnet add package StackExchange.Redis
   dotnet add package Polly
   dotnet add package Microsoft.Extensions.Http
   dotnet add package Microsoft.Extensions.Configuration.Abstractions
   dotnet add package System.Data.SqlClient
   dotnet add package MySql.Data
   dotnet add package Npgsql
   dotnet add reference ../SQLPrime.Core

   # Core project dependencies
   cd ../SQLPrime.Core
   dotnet add package Microsoft.Extensions.DependencyInjection.Abstractions

   # Test project dependencies
   cd ../SQLPrime.Tests
   dotnet add package Moq
   dotnet add package FluentAssertions
   dotnet add package Microsoft.EntityFrameworkCore.InMemory
   dotnet add package Testcontainers.MsSql
   dotnet add reference ../SQLPrime.Api
   dotnet add reference ../SQLPrime.Core
   dotnet add reference ../SQLPrime.Infrastructure
   dotnet add reference ../SQLPrime.Application
   ```

4. **Database Configuration**:
   - Create SQL Server database
   - Configure connection string in appsettings.json:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=SQLPrime;Trusted_Connection=True;MultipleActiveResultSets=true"
     }
   }
   ```


## Functional Requirements

### 1. User Management

- User registration and authentication
- Role-based authorization (Admin, Standard User, Premium User)
- User profile management
- Subscription and billing integration
- API key generation for programmatic access

### 2. Database Connection Management

- Secure storage of connection credentials
- Support for multiple database engines:
  - SQL Server (primary)
  - MySQL
  - PostgreSQL
  - (Future: Oracle, SQLite)
- Connection testing and validation
- Metadata retrieval (tables, views, columns)

### 3. Query Analysis

- SQL query parsing and validation
- Execution plan retrieval:
  - Estimated plans
  - Actual plans (where safe to execute)
- Plan XML/JSON parsing and object model creation
- Performance metrics extraction:
  - Estimated cost
  - I/O statistics
  - CPU usage
  - Memory grants

### 4. Bottleneck Detection

- Identification of common bottlenecks:
  - Table scans
  - Key lookups
  - Expensive sorts
  - Hash operations
  - Spills to disk
- Analysis of join operations
- Identification of parameter sniffing issues
- Non-SARGable predicate detection

### 5. Recommendation Engine

- Index recommendations:
  - Missing index detection
  - Index consolidation algorithms
  - Index impact estimation
  - DDL script generation
- Query rewrite suggestions:
  - Predicate optimization
  - Join restructuring
  - Subquery flattening
  - Appropriate use of CTEs
- Schema optimization suggestions:
  - Data type recommendations
  - Normalization/denormalization advice
  - Partitioning strategies

### 6. Historical Analysis

- Storage of query execution history
- Performance tracking over time
- Comparison between query versions
- Trend analysis for database performance
- Notification of performance degradation

### 7. Background Processing

- Asynchronous analysis for large queries
- Scheduled optimization checks
- Batch processing for multiple queries
- Email/notification generation

### 8. Reporting

- Export capabilities for analysis results
- Performance trend reports
- Database health check reports
- Custom report generation

### 9. API Integration

- RESTful API for all functionality
- Webhook support for notifications
- CI/CD pipeline integration endpoints
- Bulk analysis endpoints

## Technical Requirements

### 1. Security

- Secure storage of database credentials using encryption
- Protection against SQL injection
- Input validation for all API endpoints
- Rate limiting and brute force protection
- Audit logging of all sensitive operations
- HTTPS enforcement
- Prevention of execution of harmful operations

### 2. Performance

- Asynchronous processing for all I/O operations
- Caching strategy for expensive operations
- Query timeout and cancellation support
- Resource limiting for free-tier users
- Pagination for large result sets
- Efficient storage of execution plans

### 3. Scalability

- Stateless API design for horizontal scaling
- Database sharding strategy for large installations
- Load balancing support
- Background processing with distributed locking
- Efficient use of database connections

### 4. Monitoring & Diagnostics

- Comprehensive logging strategy
- Performance counters for key operations
- Health check endpoints
- Telemetry collection (opt-in)
- Error tracking and reporting

### 5. Data Retention

- Configurable retention policies
- Data archiving strategy
- Backup and restore capabilities
- GDPR compliance for user data
- Query anonymization for internal analysis

## Architecture Design

### 1. Solution Structure
```
SQLPrime/
├── SQLPrime.Api            # API endpoints and controllers
├── SQLPrime.Core           # Domain entities and interfaces
├── SQLPrime.Application    # Business logic and use cases
├── SQLPrime.Infrastructure # External services and data access
└── SQLPrime.Tests          # Unit and integration tests
```

### 2. Clean Architecture Pattern

The solution follows clean architecture principles:
- Core: Domain entities, interfaces, and business rules
- Application: Use cases, commands, queries, and validation
- Infrastructure: Database access, external services, and providers
- API: Controllers, filters, middleware, and configuration

### 3. Database Schema Design

#### Users and Authentication
- Users
- Roles
- UserRoles
- RefreshTokens
- ApiKeys

#### Connections
- DatabaseConnections
- ConnectionTypes
- ConnectionMetadata

#### Analysis
- Queries
- ExecutionPlans
- PlanDetails
- Bottlenecks
- Recommendations

#### Optimization
- IndexRecommendations
- QueryRecommendations
- SchemaRecommendations
- AppliedOptimizations

#### Reporting
- PerformanceMetrics
- HistoricalData
- Reports

### 4. API Design

- RESTful endpoints following consistent naming conventions
- Resource-based URL structure
- Proper HTTP verb usage
- Standardized response formats
- Pagination, filtering, and sorting support
- Versioning strategy
- Comprehensive Swagger documentation

## Service Layer Components

### 1. Query Analysis Service

```csharp
public interface IQueryAnalysisService
{
    Task<ExecutionPlanResult> GetExecutionPlanAsync(
        string query, 
        ConnectionInfo connection, 
        bool estimatedOnly = true,
        CancellationToken cancellationToken = default);
        
    Task<AnalysisResult> AnalyzeQueryAsync(
        string query,
        ConnectionInfo connection,
        AnalysisOptions options,
        CancellationToken cancellationToken = default);
        
    Task<IEnumerable<Bottleneck>> IdentifyBottlenecksAsync(
        ExecutionPlanResult plan,
        CancellationToken cancellationToken = default);
        
    Task<QueryComparisonResult> CompareQueriesAsync(
        string originalQuery,
        string modifiedQuery,
        ConnectionInfo connection,
        CancellationToken cancellationToken = default);
}
```

### 2. Recommendation Service

```csharp
public interface IRecommendationService
{
    Task<IEnumerable<IndexRecommendation>> GetIndexRecommendationsAsync(
        ExecutionPlanResult plan,
        ConnectionInfo connection,
        CancellationToken cancellationToken = default);
        
    Task<IEnumerable<QueryRecommendation>> GetQueryRewriteRecommendationsAsync(
        string query,
        ExecutionPlanResult plan,
        CancellationToken cancellationToken = default);
        
    Task<IEnumerable<SchemaRecommendation>> GetSchemaRecommendationsAsync(
        ConnectionInfo connection,
        string tableName,
        CancellationToken cancellationToken = default);
        
    Task<IEnumerable<Recommendation>> GetAllRecommendationsAsync(
        string query,
        ExecutionPlanResult plan,
        ConnectionInfo connection,
        CancellationToken cancellationToken = default);
}
```

### 3. Database Connection Service

```csharp
public interface IDatabaseConnectionService
{
    Task<bool> TestConnectionAsync(
        ConnectionInfo connection,
        CancellationToken cancellationToken = default);
        
    Task<IEnumerable<DatabaseObject>> GetDatabaseObjectsAsync(
        ConnectionInfo connection,
        DatabaseObjectType objectType,
        CancellationToken cancellationToken = default);
        
    Task<IEnumerable<IndexInfo>> GetExistingIndexesAsync(
        ConnectionInfo connection,
        string tableName,
        CancellationToken cancellationToken = default);
        
    Task<DatabaseMetadata> GetDatabaseMetadataAsync(
        ConnectionInfo connection,
        CancellationToken cancellationToken = default);
}
```

### 4. User Service

```csharp
public interface IUserService
{
    Task<AuthResult> RegisterUserAsync(
        RegisterUserCommand command,
        CancellationToken cancellationToken = default);
        
    Task<AuthResult> AuthenticateAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default);
        
    Task<AuthResult> RefreshTokenAsync(
        string refreshToken,
        CancellationToken cancellationToken = default);
        
    Task<bool> ChangePasswordAsync(
        Guid userId,
        string currentPassword,
        string newPassword,
        CancellationToken cancellationToken = default);
        
    Task<UserProfile> GetUserProfileAsync(
        Guid userId,
        CancellationToken cancellationToken = default);
}
```

## Development Guidelines

### 1. Code Style

- Follow C# coding conventions
- Use consistent naming (PascalCase for public members, camelCase for parameters)
- Keep methods small and focused
- Use meaningful names for variables and methods
- Add XML documentation for public API

### 2. Error Handling

- Use exceptions for exceptional cases only
- Return appropriate result objects for expected failures
- Implement global exception handling middleware
- Log all errors with appropriate context
- Return consistent error responses

### 3. Testing Strategy

- Unit tests for all business logic
- Integration tests for database and external services
- Use in-memory database for repository tests
- Use test containers for database integration tests
- Mock external dependencies

### 4. Logging Guidelines

- Log all significant application events
- Use structured logging with context
- Include correlation IDs for request tracing
- Use appropriate log levels:
  - Debug: Detailed information for debugging
  - Info: Normal application flow
  - Warning: Potential issues but not errors
  - Error: Runtime errors
  - Critical: Application failures

### 5. Database Access

- Use EF Core for application database
- Use ADO.NET/Dapper for analyzing user databases
- Implement repository pattern
- Use migrations for schema changes
- Implement optimistic concurrency where needed

## Deployment & DevOps

### 1. CI/CD Pipeline

- Automated build on commit
- Run unit and integration tests
- Code quality analysis
- Vulnerability scanning
- Automated deployment to staging
- Manual approval for production

### 2. Docker Support

- Dockerfiles for all components
- Docker Compose for local development
- Kubernetes manifests for production

### 3. Environment Configuration

- Development, testing, staging, and production environments
- Environment-specific configuration
- Secrets management
- Feature flags for progressive rollout

## Delivery Timeline

1. **Core Architecture & Setup**: 3 weeks
   - Project structure and CI/CD
   - Database schema and migrations
   - Authentication system
   - Basic API endpoints

2. **Database Connection Management**: 2 weeks
   - Connection storage and encryption
   - Connection testing
   - Multiple database provider support
   - Metadata retrieval

3. **Query Analysis Engine**: 4 weeks
   - SQL parsing and validation
   - Execution plan retrieval
   - Plan object model
   - Performance metrics extraction

4. **Bottleneck Detection & Analysis**: 3 weeks
   - Pattern recognition for common issues
   - Cost analysis algorithms
   - Operation classification
   - Performance impact estimation

5. **Recommendation Engine**: 4 weeks
   - Index recommendation algorithms
   - Query rewrite generation
   - Schema optimization detection
   - Impact estimation

6. **Historical Analysis**: 2 weeks
   - Query history storage
   - Performance tracking
   - Trend analysis
   - Comparison tools

7. **Background Processing**: 2 weeks
   - Job scheduling
   - Asynchronous processing
   - Notification system
   - Email integration

8. **API Integration & Documentation**: 2 weeks
   - API documentation
   - Integration endpoints
   - Webhook support
   - SDK generation

9. **Testing & Performance Optimization**: 3 weeks
   - Comprehensive test coverage
   - Performance testing
   - Load testing
   - Security testing

10. **Deployment & Production Readiness**: 2 weeks
    - Production deployment
    - Monitoring setup
    - Backup and disaster recovery
    - Performance tuning

**Total Estimated Timeline**: 27 weeks
