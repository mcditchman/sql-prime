using Asp.Versioning;
using Asp.Versioning.ApiExplorer;
using SQLPrime.Engine.Api.Configuration;
using SQLPrime.Engine.Api.Extensions;
using SQLPrime.Engine.Api.Swagger;

var builder = WebApplication.CreateBuilder(args);

// Add configuration and dependencies
builder.Services
    .AddAppConfiguration(builder.Configuration)
    .AddControllers()
    .Services
    .AddEndpointsApiExplorer()
    .AddSwaggerDocumentation()
    .AddApiVersioning(options =>
    {
        options.DefaultApiVersion = new ApiVersion(1, 0);
        options.AssumeDefaultVersionWhenUnspecified = true;
        options.ReportApiVersions = true;
    }).AddApiExplorer(options =>
    {
        options.GroupNameFormat = "'v'VVV";
        options.SubstituteApiVersionInUrl = true;
    });

var app = builder.Build();
var apiVersionDescriptionProvider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();
var appSettings = app.Services.GetRequiredService<AppSettings>();

// Configure middleware using AppSettings
if (appSettings.Swagger.Enable)
{
    app.UseSwaggerDocumentation(apiVersionDescriptionProvider);
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
