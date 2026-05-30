using WebApi.Todos.Models;

namespace WebApi.Todos.Models.Dtos;

public class CreateTodoDto
{
    public string Text { get; set; } = string.Empty;

    public Todo ToTodo() => new()
    {
        Text = Text,
        Done = false,
    };
}
