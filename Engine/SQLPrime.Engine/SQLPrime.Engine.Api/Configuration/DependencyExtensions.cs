using Microsoft.Extensions.Options;

namespace SQLPrime.Engine.Api.Configuration;

public static class DependencyExtensions
{
    public static IServiceCollection AddAppConfiguration(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Bind AppSettings configuration
        services.Configure<AppSettings>(
            configuration.GetSection(AppSettings.SectionName));
            
        // Register AppSettings as singleton
        services.AddSingleton(sp => 
            sp.GetRequiredService<IOptions<AppSettings>>().Value);

        return services;
    }
}
