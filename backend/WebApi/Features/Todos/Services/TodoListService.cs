using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Features.Todos.Models;

namespace WebApi.Features.Todos.Services;

public class TodoListService(AppDbContext db)
{
    public async Task<List<TodoList>> GetAllAsync(Guid userId) =>
        await db.TodoLists
            .Where(list => list.UserId == userId)
            .OrderBy(list => list.Id)
            .ToListAsync();

    public async Task<TodoList?> GetAsync(int id, Guid userId) =>
        await db.TodoLists.FirstOrDefaultAsync(list => list.Id == id && list.UserId == userId);

    public async Task<TodoList> AddAsync(string name, Guid userId)
    {
        var list = new TodoList { Name = name, UserId = userId };

        db.TodoLists.Add(list);
        await db.SaveChangesAsync();

        return list;
    }

    public async Task<TodoList?> UpdateAsync(int id, Guid userId, string name)
    {
        var list = await db.TodoLists.FirstOrDefaultAsync(list => list.Id == id && list.UserId == userId);
        if (list is null)
        {
            return null;
        }

        list.Name = name;
        await db.SaveChangesAsync();

        return list;
    }

    public async Task<bool> DeleteAsync(int id, Guid userId)
    {
        var list = await db.TodoLists.FirstOrDefaultAsync(list => list.Id == id && list.UserId == userId);
        if (list is null)
        {
            return false;
        }

        db.TodoLists.Remove(list);
        await db.SaveChangesAsync();

        return true;
    }
}
