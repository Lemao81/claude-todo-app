using System.Security.Claims;
using WebApi.Extensions;
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

        group.MapGet(
            "/avatar", async (ClaimsPrincipal user, UserService userService) =>
            {
                if (!user.TryGetUserId(out var userId))
                {
                    return Results.Unauthorized();
                }

                var avatar = await userService.GetAvatarAsync(userId);

                return avatar is not null
                    ? Results.File(avatar, GetAvatarContentType(avatar))
                    : Results.NotFound();
            });

        group.MapPost(
            "/avatar", async (IFormFile file, ClaimsPrincipal user, UserService userService) =>
            {
                if (!user.TryGetUserId(out var userId))
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

        group.MapDelete(
            "/avatar", async (ClaimsPrincipal user, UserService userService) =>
            {
                if (!user.TryGetUserId(out var userId))
                {
                    return Results.Unauthorized();
                }

                var deleted = await userService.DeleteAvatarAsync(userId);

                return deleted ? Results.NoContent() : Results.NotFound();
            });

        return app;
    }

    private static string GetAvatarContentType(byte[] avatar) =>
        avatar is [0x89, 0x50, 0x4E, 0x47, ..] ? "image/png" : "image/jpeg";
}
