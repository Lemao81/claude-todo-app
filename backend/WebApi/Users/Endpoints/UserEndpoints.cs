using WebApi.Users.Models.Dtos;
using WebApi.Users.Services;

namespace WebApi.Users.Endpoints;

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
