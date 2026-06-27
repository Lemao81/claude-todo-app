using WebApi.Features.Todos.Models;

namespace WebApi.Features.Todos.Models.Dtos;

public class TodoListDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public static TodoListDto FromTodoList(TodoList todoList) => new()
    {
        Id = todoList.Id,
        Name = todoList.Name,
    };
}
