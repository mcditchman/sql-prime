## Conclusion

This document outlines the coding conventions and best practices for the SQLPrime application, focusing on a balanced CQRS approach with Dapper for data access. By following these guidelines, we ensure that our codebase is consistent, maintainable, and optimized for performance.

The balanced approach leverages:
1. Direct SQL for read operations - optimizing performance for complex queries
2. Dapper for basic CRUD operations - providing lightweight ORM capabilities
3. Stored procedures for complex operations - leveraging database-specific optimizations

This strategy aligns perfectly with our application's focus on SQL query optimization, allowing us to demonstrate best practices for SQL performance in our own codebase.

Remember that these conventions should be applied consistently, and code reviews should verify adherence to these standards. As our application evolves, we may revisit and update these conventions to incorporate lessons learned and new best practices.

### SQL Helper/Extension Methods

```csharp
/// <summary>
/// Extensions for working with SQL in Dapper
/// </summary>
public static class SqlExtensions
{
    /// <summary>
    /// Builds a SQL WHERE clause from a set of filter conditions
    /// </summary>
    /// <param name="filters">Dictionary of column names and their filter values</param>
    /// <returns>SQL WHERE clause and parameters</returns>
    public static (string Sql, DynamicParameters Parameters) BuildWhereClause(
        Dictionary<string, object> filters)
    {
        if (filters == null || !filters.Any())
            return (string.Empty, new DynamicParameters());
            
        var parameters = new DynamicParameters();
        var clauses = new List<string>();
        
        foreach (var filter in filters)
        {
            if (filter.Value == null)
            {
                clauses.Add($"{filter.Key} IS NULL");
                continue;
            }
            
            var paramName = $"@{filter.Key.Replace(".", "_")}";
            
            if (filter.Value is string stringValue && stringValue.Contains("%"))
            {
                // LIKE query
                clauses.Add($"{filter.Key} LIKE {paramName}");
            }
            else if (filter.Value is IList list && list.Count > 0)
            {
                // IN query
                clauses.Add($"{filter.Key} IN {paramName}");
            }
            else
            {
                // Equals query
                clauses.Add($"{filter.Key} = {paramName}");
            }
            
            parameters.Add(paramName, filter.Value);
        }
        
        return (clauses.Any() ? $"WHERE {string.Join(" AND ", clauses)}" : string.Empty, parameters);
    }
    
    /// <summary>
    /// Adds pagination to a SQL query
    /// </summary>
    /// <param name="sql">The base SQL query</param>
    /// <param name="orderBy">Column to order by</param>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Page size</param>
    /// <param name="parameters">Parameters to add pagination to</param>
    /// <returns>SQL with pagination</returns>
    public static string AddPagination(
        string sql, 
        string orderBy, 
        int page, 
        int pageSize, 
        DynamicParameters parameters)
    {
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 20;
        if (pageSize > 100) pageSize = 100; // Safety limit
        
        parameters.Add("Offset", (page - 1) * pageSize);
        parameters.Add("PageSize", pageSize);
        
        // Ensure we have an ORDER BY clause as it's required for OFFSET-FETCH
        if (!sql.Contains("ORDER BY", StringComparison.OrdinalIgnoreCase))
        {
            sql += $" ORDER BY {orderBy}";
        }
        
        return sql + " OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";
    }
    
    /// <summary>
    /// Creates a count query from a SELECT query
    /// </summary>
    /// <param name="sql">The original SQL query</param>
    /// <returns>A count query</returns>
    public static string CreateCountQuery(string sql)
    {
        // Simple approach - works for basic queries
        var fromPos = sql.IndexOf("FROM", StringComparison.OrdinalIgnoreCase);
        var wherePos = sql.IndexOf("WHERE", StringComparison.OrdinalIgnoreCase);
        
        if (fromPos <= 0)
            throw new ArgumentException("Invalid SQL query - cannot find FROM clause");
            
        var countSql = "SELECT COUNT(*) " + sql.Substring(fromPos);
        
        // Remove any ORDER BY clauses as they don't affect counts
        var orderByPos = countSql.IndexOf("ORDER BY", StringComparison.OrdinalIgnoreCase);
        if (orderByPos > 0)
        {
            // Check if there's an OFFSET/FETCH after the ORDER BY
            var offsetPos = countSql.IndexOf("OFFSET", StringComparison.OrdinalIgnoreCase);
            if (offsetPos > 0)
                countSql = countSql.Substring(0, orderByPos) + countSql.Substring(offsetPos);
            else
                countSql = countSql.Substring(0, orderByPos);
        }
        
        return countSql;
    }
}
```

### Stored Procedure Example

```sql
CREATE PROCEDURE sp_GetQueryExecutionHistory
    @QueryId UNIQUEIDENTIFIER,
    @FromDate DATETIME = NULL,
    @ToDate DATETIME = NULL,
    @Page INT = 1,
    @PageSize INT = 20
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Validate parameters
    IF @Page < 1 SET @Page = 1;
    IF @PageSize < 1 SET @PageSize = 20;
    IF @PageSize > 100 SET @PageSize = 100;
    
    -- Calculate total count
    SELECT COUNT(*)
    FROM QueryExecutions qe
    WHERE 
        qe.QueryId = @QueryId
        AND (@FromDate IS NULL OR qe.ExecutedAt >= @FromDate)
        AND (@ToDate IS NULL OR qe.ExecutedAt <= @ToDate);
    
    -- Get paged results
    SELECT
        qe.Id AS ExecutionId,
        qe.ExecutedAt,
        qe.Duration,
        qe.Status,
        ep.Id AS ExecutionPlanId,
        ep.EstimatedCost,
        ep.ActualCost
    FROM
        QueryExecutions qe
    LEFT JOIN
        ExecutionPlans ep ON qe.ExecutionPlanId = ep.Id
    WHERE
        qe.QueryId = @QueryId
        AND (@FromDate IS NULL OR qe.ExecutedAt >= @FromDate)
        AND (@ToDate IS NULL OR qe.ExecutedAt <= @ToDate)
    ORDER BY
        qe.ExecutedAt DESC
    OFFSET (@Page - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END
```

### Stored Procedure Repository Example

```csharp
public class QueryExecutionRepository : IQueryExecutionRepository
{
    private readonly IDbConnectionFactory _connectionFactory;
    
    public QueryExecutionRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    
    public async Task<(IReadOnlyList<QueryExecutionDto> Results, int TotalCount)> GetExecutionHistoryAsync(
        Guid queryId,
        DateTime? fromDate = null,
        DateTime? toDate = null,
        int page = 1,
        int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync(cancellationToken);
        
        // Execute stored procedure
        using var multi = await connection.QueryMultipleAsync(
            "sp_GetQueryExecutionHistory",
            new {
                QueryId = queryId,
                FromDate = fromDate,
                ToDate = toDate,
                Page = page,
                PageSize = pageSize
            },
            commandType: CommandType.StoredProcedure);
            
        // Read total count
        var totalCount = await multi.ReadSingleAsync<int>();
        
        // Read results
        var results = await multi.ReadAsync<QueryExecutionDto>();
        
        return (results.ToList(), totalCount);
    }
    
    public async Task<Guid> RecordExecutionAsync(
        QueryExecution execution,
        CancellationToken cancellationToken = default)
    {
        const string sql = @"
            INSERT INTO QueryExecutions (
                Id,
                QueryId,
                ExecutionPlanId,
                ExecutedAt,
                Duration,
                Status,
                ErrorMessage
            ) VALUES (
                @Id,
                @QueryId,
                @ExecutionPlanId,
                @ExecutedAt,
                @Duration,
                @Status,
                @ErrorMessage
            )";
            
        using var connection = await _connectionFactory.CreateConnectionAsync(cancellationToken);
        await connection.ExecuteAsync(sql, new {
            execution.Id,
            execution.QueryId,
            execution.ExecutionPlanId,
            execution.ExecutedAt,
            execution.Duration,
            Status = execution.Status.ToString(),
            execution.ErrorMessage
        });
        
        return execution.Id;
    }
}
```
### Complex Query Example with Dynamic Parameters

```csharp
public class QuerySearchRepository : IQuerySearchRepository
{
    private readonly IDbConnectionFactory _connectionFactory;
    
    public QuerySearchRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    
    public async Task<(IReadOnlyList<QuerySearchResultDto> Results, int TotalCount)> SearchAsync(
        QuerySearchParameters parameters,
        CancellationToken cancellationToken = default)
    {
        // Build query dynamically based on search parameters
        var sql = new StringBuilder();
        var countSql = new StringBuilder();
        var queryParams = new DynamicParameters();
        
        // Base query
        sql.Append(@"
            SELECT 
                q.Id,
                q.Name,
                q.QueryText,
                q.CreatedAt,
                c.Name AS ConnectionName,
                c.ServerName,
                c.DatabaseName,
                (SELECT COUNT(*) FROM QueryExecutions qe WHERE qe.QueryId = q.Id) AS ExecutionCount
            FROM 
                Queries q
            INNER JOIN 
                Connections c ON q.ConnectionId = c.Id
            WHERE 
                q.CreatedBy = @UserId
                AND q.IsDeleted = 0");
                
        // Base count query
        countSql.Append(@"
            SELECT 
                COUNT(*)
            FROM 
                Queries q
            INNER JOIN 
                Connections c ON q.ConnectionId = c.Id
            WHERE 
                q.CreatedBy = @UserId
                AND q.IsDeleted = 0");
                
        // Add parameters
        queryParams.Add("UserId", parameters.UserId);
        
        // Apply filters
        if (!string.IsNullOrEmpty(parameters.SearchText))
        {
            sql.Append(" AND (q.Name LIKE @SearchText OR q.QueryText LIKE @SearchText)");
            countSql.Append(" AND (q.Name LIKE @SearchText OR q.QueryText LIKE @SearchText)");
            queryParams.Add("SearchText", $"%{parameters.SearchText}%");
        }
        
        if (parameters.ConnectionId.HasValue)
        {
            sql.Append(" AND q.ConnectionId = @ConnectionId");
            countSql.Append(" AND q.ConnectionId = @ConnectionId");
            queryParams.Add("ConnectionId", parameters.ConnectionId.Value);
        }
        
        if (parameters.FromDate.HasValue)
        {
            sql.Append(" AND q.CreatedAt >= @FromDate");
            countSql.Append(" AND q.CreatedAt >= @FromDate");
            queryParams.Add("FromDate", parameters.FromDate.Value);
        }
        
        if (parameters.ToDate.HasValue)
        {
            sql.Append(" AND q.CreatedAt <= @ToDate");
            countSql.Append(" AND q.CreatedAt <= @ToDate");
            queryParams.Add("ToDate", parameters.ToDate.Value);
        }
        
        // Add sorting
        sql.Append(" ORDER BY ");
        switch (parameters.SortBy?.ToLower())
        {
            case "name":
                sql.Append("q.Name ");
                break;
            case "connection":
                sql.Append("c.Name ");
                break;
            case "executioncount":
                sql.Append("ExecutionCount ");
                break;
            default:
                sql.Append("q.CreatedAt ");
                break;
        }
        
        sql.Append(parameters.SortDescending ? "DESC" : "ASC");
        
        // Add pagination
        sql.Append(" OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY");
        queryParams.Add("Offset", (parameters.Page - 1) * parameters.PageSize);
        queryParams.Add("PageSize", parameters.PageSize);
        
        // Execute queries
        using var connection = await _connectionFactory.CreateConnectionAsync(cancellationToken);
        
        // Execute count query first
        var totalCount = await connection.ExecuteScalarAsync<int>(countSql.ToString(), queryParams);
        
        // Execute search query
        var results = await connection.QueryAsync<QuerySearchResultDto>(sql.ToString(), queryParams);
        
        return (results.ToList(), totalCount);
    }
}
```
### Write Repository Implementation Example with Dapper

```csharp
public class ConnectionWriteRepository : IConnectionWriteRepository
{
    private readonly IDbConnectionFactory _connectionFactory;
    private readonly ILogger<ConnectionWriteRepository> _logger;
    
    public ConnectionWriteRepository(
        IDbConnectionFactory connectionFactory,
        ILogger<ConnectionWriteRepository> logger)
    {
        _connectionFactory = connectionFactory ?? throw new ArgumentNullException(nameof(connectionFactory));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }
    
    public async Task<Guid> CreateAsync(Connection connection, CancellationToken cancellationToken = default)
    {
        const string sql = @"
            INSERT INTO Connections (
                Id, 
                Name, 
                ServerName, 
                DatabaseName, 
                Type,
                ConnectionString,
                CreatedBy,
                CreatedAt,
                IsDeleted
            ) VALUES (
                @Id,
                @Name,
                @ServerName,
                @DatabaseName,
                @Type,
                @ConnectionString,
                @CreatedBy,
                @CreatedAt,
                0
            )";
            
        try
        {
            using var dbConnection = await _connectionFactory.CreateConnectionAsync(cancellationToken);
            await dbConnection.ExecuteAsync(sql, new {
                connection.Id,
                connection.Name,
                connection.ServerName,
                connection.DatabaseName,
                connection.Type,
                connection.ConnectionString,
                connection.CreatedBy,
                connection.CreatedAt
            });
            
            return connection.Id;
        }
        catch (SqlException ex) when (ex.Number == 2627 || ex.Number == 2601) // Unique constraint violation
        {
            _logger.LogWarning(ex, "Attempted to create duplicate connection {ConnectionName}", connection.Name);
            throw new DuplicateEntityException($"A connection named '{connection.Name}' already exists", ex);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating connection {ConnectionId}", connection.Id);
            throw;
        }
    }
    
    public async Task UpdateAsync(Connection connection, CancellationToken cancellationToken = default)
    {
        const string sql = @"
            UPDATE Connections 
            SET 
                Name = @Name,
                ServerName = @ServerName,
                DatabaseName = @DatabaseName,
                Type = @Type,
                ConnectionString = @ConnectionString,
                ModifiedBy = @ModifiedBy,
                ModifiedAt = @ModifiedAt
            WHERE 
                Id = @Id";
                
        using var dbConnection = await _connectionFactory.CreateConnectionAsync(cancellationToken);
        await dbConnection.ExecuteAsync(sql, new {
            connection.Id,
            connection.Name,
            connection.ServerName,
            connection.DatabaseName,
            connection.Type,
            connection.ConnectionString,
            connection.ModifiedBy,
            ModifiedAt = DateTime.UtcNow
        });
    }
    
    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        const string sql = @"
            UPDATE Connections 
            SET 
                IsDeleted = 1,
                ModifiedAt = @ModifiedAt,
                ModifiedBy = @ModifiedBy
            WHERE 
                Id = @Id";
                
        using var dbConnection = await _connectionFactory.CreateConnectionAsync(cancellationToken);
        await dbConnection.ExecuteAsync(sql, new {
            Id = id,
            ModifiedAt = DateTime.UtcNow,
            ModifiedBy = Guid.Empty // Should be the current user ID in real implementation
        });
    }
}
```

# SQLPrime Coding Conventions and Best Practices

This document outlines the coding conventions, architecture patterns, and best practices to be followed when developing the SQLPrime backend service. These guidelines ensure consistency, maintainability, and adherence to industry standards throughout the codebase.

## Table of Contents

1. [Architecture](#architecture)
2. [Project Structure](#project-structure)
3. [Coding Style](#coding-style)
4. [Naming Conventions](#naming-conventions)
5. [Error Handling](#error-handling)
6. [Asynchronous Programming](#asynchronous-programming)
7. [Data Access with Dapper](#data-access-with-dapper)
8. [API Design](#api-design)
9. [Security](#security)
10. [Performance Considerations](#performance-considerations)
11. [Logging](#logging)
12. [Testing](#testing)
13. [Documentation](#documentation)
14. [Example Implementations](#example-implementations)

## Architecture

### Clean Architecture

SQLPrime follows a Clean Architecture approach with clearly separated layers:

1. **Core Layer** (`SQLPrime.Engine.Core`)
   - Domain entities
   - Domain interfaces
   - Business rules and logic
   - No dependencies on other project layers or external frameworks

2. **Application Layer** (`SQLPrime.Engine.Application`)
   - Use case implementations
   - Commands and queries (CQRS pattern)
   - Validators
   - Dependencies: Core layer only

3. **Infrastructure Layer** (`SQLPrime.Engine.Infrastructure`)
   - Data access implementations (repositories using Dapper)
   - External service integrations (e.g., OpenAI)
   - Database connections
   - Dependencies: Core layer and external packages

4. **API Layer** (`SQLPrime.Engine.Api`)
   - Controllers
   - Middleware
   - Request/response models
   - Dependencies: Application and Infrastructure layers

### CQRS Pattern with Balanced Approach

SQLPrime implements a balanced Command Query Responsibility Segregation pattern:

- **Commands**: Change the state of the system (void or task result)
- **Queries**: Return data without modifying state
- **MediatR**: Used for implementing the pattern

The balanced approach leverages:
- **Direct SQL with Dapper**: For optimized read operations and complex queries
- **Stored Procedures**: For performance-critical operations and complex transactions
- **Dapper ORM**: For basic CRUD operations with simple domain entities

This approach allows us to:
- Optimize read operations with hand-crafted SQL
- Maintain domain integrity for write operations
- Leverage SQL expertise where it adds the most value
- Take advantage of database-specific features when needed

Example of separation:
```csharp
// Read Repository (optimized with direct SQL)
public class QueryAnalysisReadRepository : IQueryAnalysisReadRepository
{
    private readonly IDbConnectionFactory _connectionFactory;
    
    public QueryAnalysisReadRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    
    public async Task<QueryAnalysisDto> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync(cancellationToken);
        
        var sql = @"
            SELECT
                qa.Id,
                qa.QueryText,
                qa.CreatedAt,
                c.Name AS ConnectionName,
                c.ServerName,
                c.DatabaseName
            FROM
                QueryAnalyses qa
            JOIN
                Connections c ON qa.ConnectionId = c.Id
            WHERE
                qa.Id = @Id AND qa.IsDeleted = 0";
                
        return await connection.QuerySingleOrDefaultAsync<QueryAnalysisDto>(sql, new { Id = id });
    }
}

// Write Repository (maintains domain integrity)
public class QueryAnalysisWriteRepository : IQueryAnalysisWriteRepository
{
    private readonly IDbConnectionFactory _connectionFactory;
    
    public QueryAnalysisWriteRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    
    public async Task<Guid> CreateAsync(QueryAnalysis analysis, CancellationToken cancellationToken)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync(cancellationToken);
        using var transaction = connection.BeginTransaction();
        
        try
        {
            // Insert execution plan first
            if (analysis.ExecutionPlan != null)
            {
                var planSql = @"
                    INSERT INTO ExecutionPlans (Id, PlanXml, EstimatedCost, CreatedAt)
                    VALUES (@Id, @PlanXml, @EstimatedCost, @CreatedAt)";
                    
                await connection.ExecuteAsync(planSql, new {
                    analysis.ExecutionPlan.Id,
                    analysis.ExecutionPlan.PlanXml,
                    analysis.ExecutionPlan.EstimatedCost,
                    CreatedAt = DateTime.UtcNow
                }, transaction);
            }
            
            // Then insert query analysis
            var sql = @"
                INSERT INTO QueryAnalyses 
                (Id, QueryText, ConnectionId, ExecutionPlanId, UserId, CreatedAt, IsDeleted)
                VALUES 
                (@Id, @QueryText, @ConnectionId, @ExecutionPlanId, @UserId, @CreatedAt, 0)";
                
            await connection.ExecuteAsync(sql, new {
                analysis.Id,
                analysis.QueryText,
                analysis.ConnectionId,
                ExecutionPlanId = analysis.ExecutionPlan?.Id,
                analysis.UserId,
                CreatedAt = DateTime.UtcNow
            }, transaction);
            
            transaction.Commit();
            return analysis.Id;
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }
}
```

### Dependency Injection

- Register services with appropriate lifetimes (Scoped, Singleton, Transient)
- Use constructor injection for dependencies
- Avoid service locator pattern
- Register services in specific extension methods

Example:
```csharp
public static class ApplicationServiceRegistration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddMediatR(cfg => 
            cfg.RegisterServicesFromAssembly(typeof(ApplicationServiceRegistration).Assembly));
        services.AddAutoMapper(typeof(MappingProfile).Assembly);
        services.AddValidatorsFromAssembly(typeof(ApplicationServiceRegistration).Assembly);
        
        return services;
    }
}

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services, IConfiguration configuration)
    {
        // Register database connection
        services.AddSingleton<IDbConnectionFactory>(provider => 
            new SqlConnectionFactory(configuration.GetConnectionString("DefaultConnection")));
            
        // Register repositories
        services.AddScoped<IQueryAnalysisReadRepository, QueryAnalysisReadRepository>();
        services.AddScoped<IQueryAnalysisWriteRepository, QueryAnalysisWriteRepository>();
        
        // Register other services
        services.AddScoped<IConnectionStringProtector, ConnectionStringProtector>();
        
        return services;
    }
}
```

## Project Structure

### Solution Organization

```
SQLPrime/
├── SQLPrime.Engine.Api            # API endpoints and controllers
├── SQLPrime.Engine.Core           # Domain entities and interfaces
├── SQLPrime.Engine.Application    # Business logic and use cases
├── SQLPrime.Engine.Infrastructure # External services and data access
└── SQLPrime.Engine.Tests          # Unit and integration tests
```

### File Organization

- One class per file (except for small related types)
- Group related files in folders based on feature/domain
- Interface and implementation should be in separate files

## Coding Style

### General Guidelines

- Follow [Microsoft C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- Use the latest C# language features when appropriate
- Keep methods small and focused on a single responsibility
- Maximum method length: 50 lines (excluding comments)
- Maximum file length: 500 lines
- Maximum line length: 120 characters

### Code Formatting

- Use spaces for indentation (4 spaces)
- Open braces on new line for namespaces, classes, methods
- Open braces on same line for properties, control structures (if, for, etc.)
- Use `var` when the type is obvious, explicit type declaration otherwise
- Use expression-bodied members for simple methods/properties

```csharp
// Good
public int CalculateSum(int a, int b)
{
    return a + b;
}

// Also good for simple methods
public int CalculateSum(int a, int b) => a + b;

// Avoid
public int CalculateSum(int a, int b)
{if(a<0||b<0){throw new ArgumentException("Values must be positive");}
return a+b;}
```

### Code Quality Tools

- Use EditorConfig for enforcing style
- Run Roslyn analyzers (FxCop, StyleCop)
- Maintain zero warnings policy

## Naming Conventions

### General Rules

- Use PascalCase for namespaces, classes, methods, properties
- Use camelCase for local variables and method parameters
- Use UPPER_CASE for constants
- Use `I` prefix for interfaces
- Use meaningful, descriptive names

### Specific Conventions

- **Classes**: Nouns, PascalCase (e.g., `QueryAnalyzer`)
- **Interfaces**: `I` + noun/adjective, PascalCase (e.g., `IQueryAnalyzer`)
- **Methods**: Verb or verb phrase, PascalCase (e.g., `AnalyzeQuery`)
- **Properties**: Noun or adjective, PascalCase (e.g., `QueryText`)
- **Private fields**: Underscore + camelCase (e.g., `_queryRepository`)
- **Parameters**: camelCase (e.g., `queryText`)
- **Boolean properties/variables**: Prefix with `is`, `has`, `can`, etc. (e.g., `isValid`)

### SQL and Dapper Naming Conventions

- SQL keywords should be UPPERCASE (e.g., `SELECT`, `FROM`, `WHERE`)
- Table and column names should match C# entity names and properties
- Use aliases for improved readability in JOIN queries
- Parameterized query parameters should match method parameter names

### File Naming

- Match file names to class names
- One class per file (except for nested classes)
- Interface and implementation in separate files (e.g., `IQueryAnalyzer.cs` and `QueryAnalyzer.cs`)

## Error Handling

### Exception Usage

- Use exceptions for exceptional conditions, not for normal flow control
- Create custom exception classes for domain-specific errors
- Include relevant information in exception messages

```csharp
public class QueryAnalysisException : Exception
{
    public string QueryId { get; }
    
    public QueryAnalysisException(string message, string queryId) 
        : base(message) 
    {
        QueryId = queryId;
    }
    
    public QueryAnalysisException(string message, string queryId, Exception innerException) 
        : base(message, innerException) 
    {
        QueryId = queryId;
    }
}
```

### Exception Handling

- Handle exceptions at the appropriate level
- Use try-catch blocks only where you can properly handle the exception
- Don't catch generic exceptions unless necessary (prefer specific exception types)
- Always log exceptions with context information
- Use global exception handling middleware for API controllers

```csharp
// In API layer
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        
        var response = new ErrorResponse();
        
        switch (exception)
        {
            case ValidationException validationEx:
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                response.Message = "Validation failed";
                response.Errors = validationEx.Errors;
                break;
                
            case NotFoundException notFoundEx:
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                response.Message = notFoundEx.Message;
                break;
                
            default:
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                response.Message = "An error occurred. Please try again later.";
                break;
        }
        
        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}
```

### Database Error Handling with Dapper

- Catch and handle specific database exceptions
- Provide meaningful error messages for common database issues
- Use transactions for operations that must be atomic

```csharp
public async Task<Guid> CreateConnectionAsync(Connection connection, CancellationToken cancellationToken)
{
    using var dbConnection = await _connectionFactory.CreateConnectionAsync(cancellationToken);
    using var transaction = dbConnection.BeginTransaction();
    
    try
    {
        // Insert connection
        var sql = @"
            INSERT INTO Connections (Id, Name, ServerName, DatabaseName, ConnectionString, UserId, CreatedAt)
            VALUES (@Id, @Name, @ServerName, @DatabaseName, @ConnectionString, @UserId, @CreatedAt)";
            
        await dbConnection.ExecuteAsync(sql, new {
            connection.Id,
            connection.Name,
            connection.ServerName,
            connection.DatabaseName,
            connection.ConnectionString,
            connection.UserId,
            CreatedAt = DateTime.UtcNow
        }, transaction);
        
        transaction.Commit();
        return connection.Id;
    }
    catch (SqlException ex) when (ex.Number == 2627 || ex.Number == 2601) // Unique constraint violation
    {
        transaction.Rollback();
        throw new DuplicateEntityException($"A connection named '{connection.Name}' already exists", ex);
    }
    catch (Exception ex)
    {
        transaction.Rollback();
        _logger.LogError(ex, "Error creating connection {ConnectionName}", connection.Name);
        throw;
    }
}
```

### Result Pattern

- Use Result pattern for operations that can fail for expected reasons
- Avoid throwing exceptions for expected failure cases

```csharp
public class Result<T>
{
    public bool IsSuccess { get; }
    public T Value { get; }
    public string Error { get; }
    public bool IsFailure => !IsSuccess;

    private Result(bool isSuccess, T value, string error)
    {
        IsSuccess = isSuccess;
        Value = value;
        Error = error;
    }

    public static Result<T> Success(T value) => new Result<T>(true, value, string.Empty);
    public static Result<T> Failure(string error) => new Result<T>(false, default, error);
}
```

## Asynchronous Programming

### Task Usage

- Use async/await for all IO-bound operations
- Avoid mixing async and sync code
- Use `Task.Run` only for CPU-bound operations

### Method Naming

- Suffix async methods with "Async" (e.g., `GetExecutionPlanAsync`)
- Return `Task` or `Task<T>` from async methods
- Avoid async void except for event handlers

### Cancellation Support

- Accept `CancellationToken` in all async public methods
- Pass the token to all async calls within the method
- Check for cancellation when appropriate

```csharp
public async Task<ExecutionPlanResult> GetExecutionPlanAsync(
    string query, 
    ConnectionInfo connection, 
    bool estimatedOnly = true,
    CancellationToken cancellationToken = default)
{
    cancellationToken.ThrowIfCancellationRequested();
    
    using var dbConnection = await _connectionFactory.CreateConnectionAsync(
        connection.ConnectionString, 
        cancellationToken);
        
    var planQuery = estimatedOnly 
        ? "SET SHOWPLAN_XML ON; " + query
        : "SET STATISTICS XML ON; " + query;
        
    var planXml = await dbConnection.QuerySingleAsync<string>(
        planQuery, 
        commandTimeout: 30,
        commandType: CommandType.Text);
        
    return ParseExecutionPlan(planXml);
}
```

## Data Access with Dapper

### Connection Management

- Use an `IDbConnectionFactory` to create and manage database connections
- Open connections as late as possible and close them as early as possible
- Use the `using` statement to ensure connections are properly disposed

```csharp
public interface IDbConnectionFactory
{
    Task<IDbConnection> CreateConnectionAsync(CancellationToken cancellationToken = default);
    Task<IDbConnection> CreateConnectionAsync(string connectionString, CancellationToken cancellationToken = default);
}

public class SqlConnectionFactory : IDbConnectionFactory
{
    private readonly string _connectionString;
    
    public SqlConnectionFactory(string connectionString)
    {
        _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
    }
    
    public async Task<IDbConnection> CreateConnectionAsync(CancellationToken cancellationToken = default)
    {
        var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync(cancellationToken);
        return connection;
    }
    
    public async Task<IDbConnection> CreateConnectionAsync(string connectionString, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(connectionString))
            throw new ArgumentException("Connection string cannot be null or empty", nameof(connectionString));
            
        var connection = new SqlConnection(connectionString);
        await connection.OpenAsync(cancellationToken);
        return connection;
    }
}
```

### Query Optimization

- Write optimized SQL queries with proper indexing
- Use query parameters to prevent SQL injection
- Format SQL for readability

```csharp
// Good
var sql = @"
    SELECT 
        q.Id,
        q.QueryText,
        q.CreatedAt,
        u.Username AS CreatedBy
    FROM 
        Queries q
    INNER JOIN 
        Users u ON q.UserId = u.Id
    WHERE 
        q.ConnectionId = @ConnectionId
        AND q.IsDeleted = 0
    ORDER BY 
        q.CreatedAt DESC
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY";
    
var queries = await connection.QueryAsync<QueryDto>(
    sql,
    new { ConnectionId = connectionId, Offset = (page - 1) * pageSize, PageSize = pageSize }
);

// Bad - don't do this
var badSql = $"SELECT * FROM Queries WHERE ConnectionId = '{connectionId}' LIMIT {pageSize} OFFSET {(page - 1) * pageSize}";
```

### Repository Pattern

- Use the repository pattern to abstract data access logic
- Create separate read and write repositories for CQRS
- Implement specific repository methods for complex queries

```csharp
public interface IQueryReadRepository
{
    Task<QueryDto> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<QueryDto>> GetByConnectionIdAsync(Guid connectionId, int page, int pageSize, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<QueryDto>> GetRecentByUserAsync(Guid userId, int limit, CancellationToken cancellationToken = default);
}

public interface IQueryWriteRepository
{
    Task<Guid> CreateAsync(Query query, CancellationToken cancellationToken = default);
    Task UpdateAsync(Query query, CancellationToken cancellationToken = default);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
```

### Handling Complex Queries

- Use dynamic SQL for complex or conditional queries
- Build queries with StringBuilder for readability
- Use Dapper's DynamicParameters for flexible parameter handling

```csharp
public async Task<IReadOnlyList<QueryDto>> SearchQueriesAsync(
    SearchQueryParameters parameters,
    CancellationToken cancellationToken = default)
{
    var sql = new StringBuilder(@"
        SELECT 
            q.Id,
            q.QueryText,
            q.CreatedAt,
            c.Name AS ConnectionName
        FROM 
            Queries q
        INNER JOIN 
            Connections c ON q.ConnectionId = c.Id
        WHERE 
            q.UserId = @UserId
            AND q.IsDeleted = 0");
            
    var queryParams = new DynamicParameters();
    queryParams.Add("UserId", parameters.UserId);
    
    if (!string.IsNullOrEmpty(parameters.SearchText))
    {
        sql.Append(" AND q.QueryText LIKE @SearchText");
        queryParams.Add("SearchText", $"%{parameters.SearchText}%");
    }
    
    if (parameters.ConnectionId.HasValue)
    {
        sql.Append(" AND q.ConnectionId = @ConnectionId");
        queryParams.Add("ConnectionId", parameters.ConnectionId.Value);
    }
    
    sql.Append(" ORDER BY q.CreatedAt DESC");
    
    if (parameters.Limit > 0)
    {
        sql.Append(" OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY");
        queryParams.Add("Offset", parameters.Offset);
        queryParams.Add("Limit", parameters.Limit);
    }
    
    using var connection = await _connectionFactory.CreateConnectionAsync(cancellationToken);
    var results = await connection.QueryAsync<QueryDto>(sql.ToString(), queryParams);
    return results.ToList();
}
```

### Stored Procedures

- Use stored procedures for complex database operations
- Call stored procedures using Dapper's ExecuteAsync and QueryAsync methods

```csharp
public async Task<IReadOnlyList<RecommendationDto>> GetRecommendationsForQueryAsync(
    Guid queryId,
    CancellationToken cancellationToken = default)
{
    using var connection = await _connectionFactory.CreateConnectionAsync(cancellationToken);
    
    return (await connection.QueryAsync<RecommendationDto>(
        "sp_GetRecommendationsForQuery",
        new { QueryId = queryId },
        commandType: CommandType.StoredProcedure
    )).ToList();
}
```

## API Design

### RESTful Conventions

- Use plural nouns for resource collections (e.g., `/api/queries` not `/api/query`)
- Use HTTP methods appropriately:
  - GET: Retrieve data
  - POST: Create new resources
  - PUT: Update existing resources (full update)
  - PATCH: Partial update
  - DELETE: Remove resources
- Use appropriate HTTP status codes

### Request/Response Models

- Use Data Transfer Objects (DTOs) for API requests and responses
- Never expose domain entities directly
- Use AutoMapper for mapping between entities and DTOs

```csharp
// Request DTO
public class CreateQueryCommand : IRequest<Guid>
{
    public string Name { get; set; }
    public string Text { get; set; }
    public Guid ConnectionId { get; set; }
}

// Response DTO
public class QueryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Text { get; set; }
    public DateTime CreatedAt { get; set; }
    public ConnectionDto Connection { get; set; }
}

// Mapping profile
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Query, QueryDto>();
        CreateMap<CreateQueryCommand, Query>();
        // Other mappings
    }
}
```

### Versioning

- Use URL versioning (e.g., `/api/v1/queries`)
- Never make breaking changes to existing versioned APIs
- Create a new version for incompatible changes

```csharp
[ApiController]
[Route("api/v1/[controller]")]
public class QueriesController : ControllerBase
{
    // Controller implementation
}
```

### API Documentation

- Use Swagger/OpenAPI for API documentation
- Document each endpoint with XML comments
- Include example requests and responses

```csharp
/// <summary>
/// Analyzes a SQL query and generates optimization recommendations
/// </summary>
/// <param name="command">The query analysis request</param>
/// <param name="cancellationToken">Cancellation token</param>
/// <returns>Analysis result with recommendations</returns>
/// <response code="200">Analysis completed successfully</response>
/// <response code="400">Invalid query or connection</response>
/// <response code="404">Connection not found</response>
[HttpPost("analyze")]
[ProducesResponseType(typeof(QueryAnalysisResultDto), StatusCodes.Status200OK)]
[ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
public async Task<ActionResult<QueryAnalysisResultDto>> AnalyzeQuery(
    [FromBody] AnalyzeQueryCommand command,
    CancellationToken cancellationToken)
{
    var result = await _mediator.Send(command, cancellationToken);
    return Ok(result);
}
```

## Security

### Authentication and Authorization

- Use JWT tokens for authentication
- Store user claims in tokens (not in the database)
- Implement role-based and policy-based authorization
- Use the `[Authorize]` attribute to protect endpoints

```csharp
[Authorize(Policy = "CanManageConnections")]
[HttpPost]
public async Task<ActionResult<ConnectionDto>> CreateConnection(
    [FromBody] CreateConnectionCommand command,
    CancellationToken cancellationToken)
{
    var result = await _mediator.Send(command, cancellationToken);
    return CreatedAtAction(nameof(GetConnection), new { id = result }, result);
}
```

### Data Protection

- Encrypt sensitive data in the database
- Use parameterized queries to prevent SQL injection
- Sanitize all user inputs
- Implement proper connection string management

```csharp
public class ConnectionStringProtector : IConnectionStringProtector
{
    private readonly IDataProtector _protector;
    
    public ConnectionStringProtector(IDataProtectionProvider provider)
    {
        _protector = provider.CreateProtector("SQLPrime.Engine.ConnectionStrings");
    }
    
    public string Protect(string connectionString)
    {
        return _protector.Protect(connectionString);
    }
    
    public string Unprotect(string protectedConnectionString)
    {
        return _protector.Unprotect(protectedConnectionString);
    }
}
```

### Cross-Cutting Concerns

- Implement HTTPS-only communication
- Add proper CORS configuration
- Use Content-Security-Policy headers
- Implement rate limiting for API endpoints

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // Other middleware
    
    app.UseHttpsRedirection();
    
    app.UseCors(policy => 
        policy.WithOrigins("https://app.SQLPrime.Engine.com")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("Content-Disposition")
    );
    
    app.UseAuthentication();
    app.UseAuthorization();
    
    // Rate limiting middleware
    app.UseMiddleware<RateLimitingMiddleware>();
    
    // Other middleware
}
```

## Performance Considerations

### Optimization Guidelines

- Use asynchronous programming for I/O operations
- Implement caching for expensive operations
- Use pagination for large result sets
- Optimize SQL queries (include only necessary fields)

### Caching Strategy

- Use distributed caching for shared resources
- Use memory caching for user-specific data
- Implement cache invalidation appropriately

```csharp
public class CachedExecutionPlanService : IExecutionPlanService
{
    private readonly IExecutionPlanService _decoratedService;
    private readonly IDistributedCache _cache;
    private readonly ILogger<CachedExecutionPlanService> _logger;
    
    public CachedExecutionPlanService(
        IExecutionPlanService decoratedService,
        IDistributedCache cache,
        ILogger<CachedExecutionPlanService> logger)
    {
        _decoratedService = decoratedService;
        _cache = cache;
        _logger = logger;
    }
    
    public async Task<ExecutionPlanResult> GetExecutionPlanAsync(
        string query, 
        ConnectionInfo connection, 
        bool estimatedOnly = true,
        CancellationToken cancellationToken = default)
    {
        // Create a unique cache key
        var cacheKey = $"plan_{connection.Id}_{Convert.ToBase64String(Encoding.UTF8.GetBytes(query))}_{estimatedOnly}";
        
        // Try to get from cache
        var cachedResult = await _cache.GetStringAsync(cacheKey, cancellationToken);
        if (cachedResult != null)
        {
            try
            {
                _logger.LogDebug("Cache hit for execution plan");
                return JsonSerializer.Deserialize<ExecutionPlanResult>(cachedResult);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to deserialize cached execution plan");
            }
        }
        
        // Cache miss, get from service
        _logger.LogDebug("Cache miss for execution plan");
        var result = await _decoratedService.GetExecutionPlanAsync(query, connection, estimatedOnly, cancellationToken);
        
        // Cache the result (expire after 1 hour)
        await _cache.SetStringAsync(
            cacheKey,
            JsonSerializer.Serialize(result),
            new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1) },
            cancellationToken);
            
        return result;
    }
}
```

## Logging

### Logging Guidelines

- Use structured logging with Serilog
- Log important application events at the appropriate level
- Include relevant context in log messages
- Use correlation IDs to track requests

```csharp
public class QueryAnalysisHandler : IRequestHandler<AnalyzeQueryCommand, QueryAnalysisResultDto>
{
    private readonly IQueryAnalysisService _analysisService;
    private readonly IMapper _mapper;
    private readonly ILogger<QueryAnalysisHandler> _logger;
    
    public QueryAnalysisHandler(
        IQueryAnalysisService analysisService,
        IMapper mapper,
        ILogger<QueryAnalysisHandler> logger)
    {
        _analysisService = analysisService;
        _mapper = mapper;
        _logger = logger;
    }
    
    public async Task<QueryAnalysisResultDto> Handle(
        AnalyzeQueryCommand request, 
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Starting query analysis for connection {ConnectionId}", request.ConnectionId);
        
        try
        {
            var result = await _analysisService.AnalyzeQueryAsync(
                request.QueryText,
                request.ConnectionId,
                cancellationToken);
                
            _logger.LogInformation(
                "Query analysis completed with {BottleneckCount} bottlenecks and {RecommendationCount} recommendations",
                result.Bottlenecks.Count,
                result.Recommendations.Count);
                
            return _mapper.Map<QueryAnalysisResultDto>(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Query analysis failed for connection {ConnectionId}",
                request.ConnectionId);
                
            throw;
        }
    }
}