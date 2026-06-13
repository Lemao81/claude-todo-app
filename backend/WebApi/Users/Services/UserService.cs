using WebApi.Data;
using WebApi.Users.Models;

namespace WebApi.Users.Services;

public class UserService(AppDbContext db)
{
    public async Task<User?> GetByIdAsync(Guid id) =>
        await db.Users.FindAsync(id);
}
