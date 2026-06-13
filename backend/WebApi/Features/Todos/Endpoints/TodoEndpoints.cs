using WebApi.Features.Todos.Models.Dtos;
using WebApi.Features.Todos.Services;

namespace WebApi.Features.Todos.Endpoints;

public static class TodoEndpoints
{
    public static IEndpointRouteBuilder MapTodoEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/todos").RequireAuthorization();

        group.MapGet(
            "", async (TodoService todoService) =>
            {
                var todos = await todoService.GetAsync();
                var dtos = todos.Select(TodoDto.FromTodo);

                return Results.Ok(dtos);
            });

        group.MapPost(
            "", async (CreateTodoDto dto, TodoService todoService) =>
            {
                var todo = await todoService.AddAsync(dto.ToTodo());

                return Results.Created($"/api/todos/{todo.Id}", TodoDto.FromTodo(todo));
            });

        group.MapPatch(
            "/{id:int}", async (int id, UpdateTodoDoneDto dto, TodoService todoService) =>
            {
                var todo = await todoService.SetDoneAsync(id, dto.Done);

                return todo is not null ? Results.Ok(TodoDto.FromTodo(todo)) : Results.NotFound();
            });

        group.MapDelete(
            "/{id:int}", async (int id, TodoService todoService) =>
            {
                var deleted = await todoService.DeleteAsync(id);

                return deleted ? Results.NoContent() : Results.NotFound();
            });

        return app;
    }
}
