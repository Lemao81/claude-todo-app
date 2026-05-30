using Microsoft.EntityFrameworkCore;
using WebApi.Todos.Models;

namespace WebApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Todo> Todos => Set<Todo>();
}
