using WebApi.Todos.Models;
using WebApi.Todos.Models.Dtos;

namespace WebApi.Todos.Endpoints;

public static class TodoEndpoints
{
    private static readonly List<Todo> Todos = [];
    private static int _nextId = 1;

    public static IEndpointRouteBuilder MapTodoEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/todos", () =>
        {
            var todos = Todos.Select(TodoDto.FromTodo);

            return Results.Ok(todos);
        });

        app.MapPost("/api/todos", (CreateTodoDto dto) =>
        {
            var todo = dto.ToTodo(_nextId++);
            Todos.Add(todo);

            return Results.Created($"/api/todos/{todo.Id}", TodoDto.FromTodo(todo));
        });

        return app;
    }
}
