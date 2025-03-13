namespace SQLPrime.Engine.Api.Configuration;

public class AppSettings
{
    public const string SectionName = "AppSettings";
    
    public JwtSettings Jwt { get; set; } = new();
    public DatabaseSettings Database { get; set; } = new();
    public CorsSettings Cors { get; set; } = new();
    public SwaggerSettings Swagger { get; set; } = new();

    public class JwtSettings
    {
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public string Key { get; set; } = string.Empty;
        public int ExpirationMinutes { get; set; } = 60;
    }

    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public int CommandTimeout { get; set; } = 30;
    }

    public class CorsSettings
    {
        public string[] AllowedOrigins { get; set; } = Array.Empty<string>();
        public string[] AllowedMethods { get; set; } = Array.Empty<string>();
    }

    public class SwaggerSettings
    {
        public bool Enable { get; set; } = true;
        public string Title { get; set; } = "SQLPrime Engine API";
        public string Description { get; set; } = "API for SQL query analysis and optimization";
    }
}
