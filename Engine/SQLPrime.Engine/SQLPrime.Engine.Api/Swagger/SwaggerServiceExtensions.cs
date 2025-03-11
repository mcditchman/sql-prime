using Asp.Versioning.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using SQLPrime.Engine.Api.Filters;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;

namespace SQLPrime.Engine.Api.Swagger;

public static class SwaggerServiceExtensions
{
    /// <summary>
    /// Adds and configures Swagger services
    /// </summary>
    public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.ConfigureOptions<ConfigureSwaggerOptions>();

        return services;
    }

    /// <summary>
    /// Configures Swagger middleware
    /// </summary>
    public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app, IApiVersionDescriptionProvider provider)
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            // Build a swagger endpoint for each discovered API version
            foreach (var description in provider.ApiVersionDescriptions)
            {
                options.SwaggerEndpoint(
                    $"/swagger/{description.GroupName}/swagger.json",
                    $"SQLPrime API {description.GroupName.ToUpperInvariant()}");

                options.RoutePrefix = string.Empty;
            }

            options.DisplayRequestDuration();
            options.EnableDeepLinking();
            options.DefaultModelsExpandDepth(-1); // Hide models section by default
        });

        return app;
    }
}
