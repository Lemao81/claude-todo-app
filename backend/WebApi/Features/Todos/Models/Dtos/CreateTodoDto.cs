using WebApi.Features.Todos.Models;

namespace WebApi.Features.Todos.Models.Dtos;

public class CreateTodoDto
{
    public string Text { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int TodoListId { get; set; }

    public Todo ToTodo() => new()
    {
        Text = Text,
        Done = false,
        Description = Description,
        TodoListId = TodoListId,
    };
}
