using Microsoft.EntityFrameworkCore;
using WebApi.Features.Todos.Models;
using WebApi.Features.Users.Models;

namespace WebApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Todo> Todos => Set<Todo>();
    public DbSet<User> Users => Set<User>();
}
