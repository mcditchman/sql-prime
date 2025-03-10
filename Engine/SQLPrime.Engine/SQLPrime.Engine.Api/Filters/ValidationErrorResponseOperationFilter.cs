using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace SQLPrime.Engine.Api.Filters;

public class ValidationErrorResponseOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if (context.ApiDescription.HttpMethod is "POST" or "PUT" or "PATCH")
        {
            operation.Responses.Add("400", new OpenApiResponse 
            { 
                Description = "Validation Error",
                Content = new Dictionary<string, OpenApiMediaType>
                {
                    ["application/json"] = new OpenApiMediaType
                    {
                        Schema = context.SchemaGenerator.GenerateSchema(
                            typeof(ValidationProblemDetails), 
                            context.SchemaRepository)
                    }
                }
            });
        }
    }
}
