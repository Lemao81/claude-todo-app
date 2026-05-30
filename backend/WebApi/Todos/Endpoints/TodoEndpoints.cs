using WebApi.Todos.Models.Dtos;
using WebApi.Todos.Services;

namespace WebApi.Todos.Endpoints;

public static class TodoEndpoints
{
    public static IEndpointRouteBuilder MapTodoEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/todos", () =>
        {
            return Results.Ok();
        });

        app.MapPost("/api/todos", async (CreateTodoDto dto, TodoService todoService) =>
        {
            var todo = await todoService.AddAsync(dto.ToTodo());

            return Results.Created($"/api/todos/{todo.Id}", TodoDto.FromTodo(todo));
        });

        return app;
    }
}
