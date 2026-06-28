using System.Security.Claims;
using WebApi.Features.Todos.Models.Dtos;
using WebApi.Features.Todos.Services;

namespace WebApi.Features.Todos.Endpoints;

public static class TodoListEndpoints
{
    public static IEndpointRouteBuilder MapTodoListEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/todolists").RequireAuthorization();

        group.MapGet(
            "", async (ClaimsPrincipal user, TodoService todoService) =>
            {
                if (!TryGetUserId(user, out var userId))
                {
                    return Results.Unauthorized();
                }

                var lists = await todoService.GetListsAsync(userId);
                var dtos = lists.Select(TodoListDto.FromTodoList);

                return Results.Ok(dtos);
            });

        group.MapGet(
            "/{id:int}", async (int id, ClaimsPrincipal user, TodoService todoService) =>
            {
                if (!TryGetUserId(user, out var userId))
                {
                    return Results.Unauthorized();
                }

                var list = await todoService.GetListAsync(id, userId);

                return list is not null ? Results.Ok(TodoListDto.FromTodoList(list)) : Results.NotFound();
            });

        return app;
    }

    private static bool TryGetUserId(ClaimsPrincipal user, out Guid userId) =>
        Guid.TryParse(user.FindFirstValue(ClaimTypes.NameIdentifier), out userId);
}
