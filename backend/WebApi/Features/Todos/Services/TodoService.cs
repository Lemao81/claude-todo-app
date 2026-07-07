using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Features.Todos.Models;

namespace WebApi.Features.Todos.Services;

public class TodoService(AppDbContext db)
{
    public async Task<List<TodoList>> GetListsAsync(Guid userId) =>
        await db.TodoLists
            .Where(list => list.UserId == userId)
            .OrderBy(list => list.Id)
            .ToListAsync();

    public async Task<TodoList?> GetListAsync(int id, Guid userId) =>
        await db.TodoLists.FirstOrDefaultAsync(list => list.Id == id && list.UserId == userId);

    public async Task<TodoList> AddListAsync(string name, Guid userId)
    {
        var list = new TodoList { Name = name, UserId = userId };

        db.TodoLists.Add(list);
        await db.SaveChangesAsync();

        return list;
    }

    public async Task<bool> DeleteListAsync(int id, Guid userId)
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

    public async Task<List<Todo>> GetAsync(int? todoListId = null) =>
        await db.Todos
            .Where(todo => todoListId == null || todo.TodoListId == todoListId)
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

    public async Task ReorderAsync(int[] orderedIds)
    {
        var todos = await db.Todos
            .Where(todo => orderedIds.Contains(todo.Id))
            .ToListAsync();

        foreach (var todo in todos)
        {
            todo.Order = Array.IndexOf(orderedIds, todo.Id) + 1;
        }

        await db.SaveChangesAsync();
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
