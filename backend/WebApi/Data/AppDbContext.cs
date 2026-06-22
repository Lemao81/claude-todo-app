using Microsoft.EntityFrameworkCore;
using WebApi.Features.Todos.Models;
using WebApi.Features.Users.Models;

namespace WebApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Todo> Todos => Set<Todo>();
    public DbSet<TodoList> TodoLists => Set<TodoList>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().HasIndex(user => user.UserName).IsUnique();
        modelBuilder.Entity<User>().HasIndex(user => user.EmailNormalized).IsUnique();

        modelBuilder.Entity<TodoList>()
            .HasMany(todoList => todoList.Todos)
            .WithOne(todo => todo.TodoList)
            .HasForeignKey(todo => todo.TodoListId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
