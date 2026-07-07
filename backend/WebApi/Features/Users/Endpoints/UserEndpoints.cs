using System.Security.Claims;
using WebApi.Features.Users.Models.Dtos;
using WebApi.Features.Users.Services;

namespace WebApi.Features.Users.Endpoints;

public static class UserEndpoints
{
    private static readonly string[] AllowedAvatarContentTypes = ["image/jpeg", "image/png"];

    public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/users").RequireAuthorization();

        group.MapGet(
            "/{id:guid}", async (Guid id, UserService userService) =>
            {
                var user = await userService.GetByIdAsync(id);

                return user is not null ? Results.Ok(UserDto.FromUser(user)) : Results.NotFound();
            });

        group.MapPost(
            "/avatar", async (IFormFile file, ClaimsPrincipal user, UserService userService) =>
            {
                if (!TryGetUserId(user, out var userId))
                {
                    return Results.Unauthorized();
                }

                if (!AllowedAvatarContentTypes.Contains(file.ContentType))
                {
                    return Results.BadRequest("Only JPEG and PNG images are allowed");
                }

                using var stream = new MemoryStream();
                await file.CopyToAsync(stream);

                var updated = await userService.SetAvatarAsync(userId, stream.ToArray());

                return updated ? Results.NoContent() : Results.NotFound();
            }).DisableAntiforgery();

        return app;
    }

    private static bool TryGetUserId(ClaimsPrincipal user, out Guid userId) =>
        Guid.TryParse(user.FindFirstValue(ClaimTypes.NameIdentifier), out userId);
}
