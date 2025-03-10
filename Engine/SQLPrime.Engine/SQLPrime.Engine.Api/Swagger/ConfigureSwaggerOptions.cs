using Asp.Versioning.ApiExplorer;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using SQLPrime.Engine.Api.Filters;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;

namespace SQLPrime.Engine.Api.Swagger;

/// <summary>
/// Configures the Swagger generation options.
/// </summary>
public class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
{
    private readonly IApiVersionDescriptionProvider _provider;

    /// <summary>
    /// Initializes a new instance of the <see cref="ConfigureSwaggerOptions"/> class.
    /// </summary>
    public ConfigureSwaggerOptions(IApiVersionDescriptionProvider provider)
    {
        _provider = provider;
    }

    /// <summary>
    /// Configure Swagger options including versioning
    /// </summary>
    public void Configure(SwaggerGenOptions options)
    {
        // Add a swagger document for each discovered API version
        foreach (var description in _provider.ApiVersionDescriptions)
        {
            options.SwaggerDoc(
                description.GroupName,
                new OpenApiInfo
                {
                    Title = "SQLPrime API",
                    Version = description.ApiVersion.ToString(),
                    Description = "API for SQL query optimization and analysis",
                    Contact = new OpenApiContact
                    {
                        Name = "SQLPrime Support",
                        Email = "support@sqlprime.com"
                    }
                });
        }

        // Add XML comments
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        options.IncludeXmlComments(xmlPath);

        // Add operation filters
        options.OperationFilter<AuthorizeCheckOperationFilter>();
        options.OperationFilter<ValidationErrorResponseOperationFilter>();

        // Security definition for JWT
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        options.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
            }
        });
    }
}