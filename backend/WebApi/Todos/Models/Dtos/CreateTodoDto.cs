using WebApi.Todos.Models;

namespace WebApi.Todos.Models.Dtos;

public class CreateTodoDto
{
    public string Text { get; set; } = string.Empty;

    public Todo ToTodo(int id) => new()
    {
        Id = id,
        Text = Text,
        Done = false,
    };
}
