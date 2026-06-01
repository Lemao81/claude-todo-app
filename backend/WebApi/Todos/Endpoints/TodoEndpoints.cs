using WebApi.Todos.Models.Dtos;
using WebApi.Todos.Services;

namespace WebApi.Todos.Endpoints;

public static class TodoEndpoints
{
    public static IEndpointRouteBuilder MapTodoEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet(
            "/api/todos", async (TodoService todoService) =>
            {
                var todos = await todoService.GetAsync();
                var dtos = todos.Select(TodoDto.FromTodo);

                return Results.Ok(dtos);
            });

        app.MapPost(
            "/api/todos", async (CreateTodoDto dto, TodoService todoService) =>
            {
                var todo = await todoService.AddAsync(dto.ToTodo());

                return Results.Created($"/api/todos/{todo.Id}", TodoDto.FromTodo(todo));
            });

        app.MapDelete(
            "/api/todos/{id:int}", async (int id, TodoService todoService) =>
            {
                var deleted = await todoService.DeleteAsync(id);

                return deleted ? Results.NoContent() : Results.NotFound();
            });

        return app;
    }
}
