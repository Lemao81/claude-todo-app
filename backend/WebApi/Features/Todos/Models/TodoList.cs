using WebApi.Features.Users.Models;

namespace WebApi.Features.Todos.Models;

public class TodoList
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public ICollection<Todo> Todos { get; set; } = [];
}
