namespace WebApi.Features.Todos.Models;

public class Todo
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool Done { get; set; }
    public string? Description { get; set; }
}
