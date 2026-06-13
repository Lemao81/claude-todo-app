using WebApi.Features.Users.Models.Dtos;
using WebApi.Features.Users.Services;

namespace WebApi.Features.Users.Endpoints;

public static class UserEndpoints
{
    public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/users").RequireAuthorization();

        group.MapGet(
            "/{id:guid}", async (Guid id, UserService userService) =>
            {
                var user = await userService.GetByIdAsync(id);

                return user is not null ? Results.Ok(UserDto.FromUser(user)) : Results.NotFound();
            });

        return app;
    }
}
