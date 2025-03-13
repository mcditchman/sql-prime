using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using SQLPrime.Engine.Api.Configuration;

namespace Microsoft.Extensions.DependencyInjection;

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
