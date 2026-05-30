using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Todos.Models;

namespace WebApi.Todos.Services;

public class TodoService(AppDbContext db)
{
    public async Task<List<Todo>> GetAsync() =>
        await db.Todos.ToListAsync();

    public async Task<Todo> AddAsync(Todo todo)
    {
        db.Todos.Add(todo);
        await db.SaveChangesAsync();

        return todo;
    }
}
