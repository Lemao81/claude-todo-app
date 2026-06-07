using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using WebApi.Auth.Models.Dtos;

namespace WebApi.Auth.Endpoints;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/auth");

        group.MapPost(
            "/login", async (LoginDto dto, HttpContext httpContext) =>
            {
                if (!IsValidCredentials(dto.Username, dto.Password))
                {
                    return Results.Unauthorized();
                }

                var claims = new[] { new Claim(ClaimTypes.Name, dto.Username) };
                var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var principal = new ClaimsPrincipal(identity);

                await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

                return Results.Ok();
            });

        return app;
    }

    private static bool IsValidCredentials(string username, string password)
    {
        // TODO: replace with a real check against a user store once one exists
        return true;
    }
}
