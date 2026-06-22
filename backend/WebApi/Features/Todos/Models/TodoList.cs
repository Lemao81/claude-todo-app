namespace WebApi.Features.Todos.Models;

public class TodoList
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<Todo> Todos { get; set; } = [];
}
