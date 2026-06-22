using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Features.Todos.Models;

namespace WebApi.Features.Todos.Services;

public class TodoService(AppDbContext db)
{
    public async Task<List<Todo>> GetAsync() =>
        await db.Todos
            .OrderBy(todo => todo.Order)
            .ToListAsync();

    public async Task<Todo> AddAsync(Todo todo)
    {
        var maxOrder = await db.Todos
            .Where(existing => existing.TodoListId == todo.TodoListId)
            .MaxAsync(existing => (int?)existing.Order) ?? 0;

        todo.Order = maxOrder + 1;

        db.Todos.Add(todo);
        await db.SaveChangesAsync();

        return todo;
    }

    public async Task<Todo?> SetDoneAsync(int id, bool done)
    {
        var todo = await db.Todos.FindAsync(id);
        if (todo is null)
        {
            return null;
        }

        todo.Done = done;
        await db.SaveChangesAsync();

        return todo;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var todo = await db.Todos.FindAsync(id);
        if (todo is null)
        {
            return false;
        }

        db.Todos.Remove(todo);
        await db.SaveChangesAsync();

        return true;
    }
}
