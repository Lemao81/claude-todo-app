using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using WebApi.Extensions;
using WebApi.Features.Auth.Models.Dtos;
using WebApi.Features.Auth.Services;
using WebApi.Features.Users.Models;
using WebApi.Features.Users.Models.Dtos;
using WebApi.Features.Users.Services;

namespace WebApi.Features.Auth.Endpoints;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/auth");

        group.MapPost(
            "/login",
            async (LoginDto dto, HttpContext httpContext, UserService userService, IPasswordHasher passwordHasher) =>
            {
                var user = await userService.GetByUsernameOrEmailAsync(dto.UsernameOrEmail);
                if (user is null)
                {
                    return Results.NotFound();
                }

                if (!passwordHasher.Verify(dto.Password, user.PasswordHash))
                {
                    return Results.Unauthorized();
                }

                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName)
                };
                var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var principal = new ClaimsPrincipal(identity);

                await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

                return Results.Ok(UserDto.FromUser(user));
            });

        group.MapPost(
            "/register",
            async (RegisterDto dto, UserService userService, IPasswordHasher passwordHasher) =>
            {
                if (string.IsNullOrWhiteSpace(dto.UserName)
                    || string.IsNullOrWhiteSpace(dto.Email)
                    || string.IsNullOrWhiteSpace(dto.Password))
                {
                    return Results.BadRequest();
                }

                var email = dto.Email.Trim();
                var user = new User
                {
                    UserName = dto.UserName.Trim(),
                    Email = email,
                    EmailNormalized = email.ToUpperInvariant(),
                    FirstName = dto.FirstName.Trim(),
                    LastName = dto.LastName.Trim(),
                    PasswordHash = passwordHasher.Hash(dto.Password)
                };

                var createdUser = await userService.CreateAsync(user);
                if (createdUser is null)
                {
                    return Results.Conflict();
                }

                return Results.Created($"/api/users/{createdUser.Id}", UserDto.FromUser(createdUser));
            });

        group.MapPost(
            "/logout", async (HttpContext httpContext) =>
            {
                await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

                return Results.Ok();
            });

        group.MapGet(
            "/me", async (ClaimsPrincipal principal, UserService userService) =>
            {
                if (!principal.TryGetUserId(out var userId))
                {
                    return Results.Unauthorized();
                }

                var user = await userService.GetByIdAsync(userId);

                return user is not null ? Results.Ok(UserDto.FromUser(user)) : Results.Unauthorized();
            }).RequireAuthorization();

        return app;
    }
}
