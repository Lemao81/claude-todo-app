using WebApi.Features.Todos.Models.Dtos;
using WebApi.Features.Todos.Services;

namespace WebApi.Features.Todos.Endpoints;

public static class TodoListEndpoints
{
    public static IEndpointRouteBuilder MapTodoListEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/todolists").RequireAuthorization();

        group.MapGet(
            "", async (TodoService todoService) =>
            {
                var lists = await todoService.GetListsAsync();
                var dtos = lists.Select(TodoListDto.FromTodoList);

                return Results.Ok(dtos);
            });

        group.MapGet(
            "/{id:int}", async (int id, TodoService todoService) =>
            {
                var list = await todoService.GetListAsync(id);

                return list is not null ? Results.Ok(TodoListDto.FromTodoList(list)) : Results.NotFound();
            });

        return app;
    }
}
