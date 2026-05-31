using WebApi.Todos.Models;

namespace WebApi.Todos.Models.Dtos;

public class TodoDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool Done { get; set; }
    public string? Description { get; set; }

    public static TodoDto FromTodo(Todo todo) => new()
    {
        Id = todo.Id,
        Text = todo.Text,
        Done = todo.Done,
        Description = todo.Description,
    };
}
