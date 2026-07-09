using System.Security.Claims;
using WebApi.Extensions;
using WebApi.Features.Todos.Models.Dtos;
using WebApi.Features.Todos.Services;

namespace WebApi.Features.Todos.Endpoints;

public static class TodoEndpoints
{
    public static IEndpointRouteBuilder MapTodoEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/todos").RequireAuthorization();

        group.MapGet(
            "", async (int? todoListId, ClaimsPrincipal user, TodoService todoService) =>
            {
                if (!user.TryGetUserId(out var userId))
                {
                    return Results.Unauthorized();
                }

                var todos = await todoService.GetAsync(userId, todoListId);
                var dtos = todos.Select(TodoDto.FromTodo);

                return Results.Ok(dtos);
            });

        group.MapPost(
            "", async (CreateTodoDto dto, ClaimsPrincipal user, TodoService todoService) =>
            {
                if (!user.TryGetUserId(out var userId))
                {
                    return Results.Unauthorized();
                }

                var todo = await todoService.AddAsync(dto.ToTodo(), userId);

                return todo is not null
                    ? Results.Created($"/api/todos/{todo.Id}", TodoDto.FromTodo(todo))
                    : Results.NotFound();
            });

        group.MapPatch(
            "/reorder", async (ReorderTodosDto dto, ClaimsPrincipal user, TodoService todoService) =>
            {
                if (!user.TryGetUserId(out var userId))
                {
                    return Results.Unauthorized();
                }

                await todoService.ReorderAsync(dto.OrderedIds, userId);

                return Results.NoContent();
            });

        group.MapPatch(
            "/{id:int}", async (int id, UpdateTodoDto dto, ClaimsPrincipal user, TodoService todoService) =>
            {
                if (!user.TryGetUserId(out var userId))
                {
                    return Results.Unauthorized();
                }

                var todo = await todoService.UpdateAsync(id, userId, dto.Done, dto.Text, dto.Description);

                return todo is not null ? Results.Ok(TodoDto.FromTodo(todo)) : Results.NotFound();
            });

        group.MapDelete(
            "/{id:int}", async (int id, ClaimsPrincipal user, TodoService todoService) =>
            {
                if (!user.TryGetUserId(out var userId))
                {
                    return Results.Unauthorized();
                }

                var deleted = await todoService.DeleteAsync(id, userId);

                return deleted ? Results.NoContent() : Results.NotFound();
            });

        return app;
    }
}
