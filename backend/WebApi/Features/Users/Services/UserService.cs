using WebApi.Data;
using WebApi.Features.Users.Models;

namespace WebApi.Features.Users.Services;

public class UserService(AppDbContext db)
{
    public async Task<User?> GetByIdAsync(Guid id) =>
        await db.Users.FindAsync(id);
}
