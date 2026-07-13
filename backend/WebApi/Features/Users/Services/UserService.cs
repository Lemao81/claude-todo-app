using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Features.Users.Models;

namespace WebApi.Features.Users.Services;

public class UserService(AppDbContext db)
{
    public async Task<User?> GetByIdAsync(Guid id) =>
        await db.Users.FindAsync(id);

    public async Task<byte[]?> GetAvatarAsync(Guid id)
    {
        var user = await db.Users.FindAsync(id);

        return user?.Avatar;
    }

    public async Task<bool> SetAvatarAsync(Guid id, byte[] avatar)
    {
        var user = await db.Users.FindAsync(id);
        if (user is null)
        {
            return false;
        }

        user.Avatar = avatar;
        await db.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAvatarAsync(Guid id)
    {
        var user = await db.Users.FindAsync(id);
        if (user is null)
        {
            return false;
        }

        user.Avatar = null;
        await db.SaveChangesAsync();

        return true;
    }

    public async Task<User?> CreateAsync(User user)
    {
        var exists = await db.Users.AnyAsync(u =>
            u.UserName == user.UserName || u.EmailNormalized == user.EmailNormalized);
        if (exists)
        {
            return null;
        }

        db.Users.Add(user);
        await db.SaveChangesAsync();

        return user;
    }

    public async Task<User?> GetByUsernameOrEmailAsync(string usernameOrEmail)
    {
        var emailNormalized = usernameOrEmail.ToUpperInvariant();
        var user = await db.Users.FirstOrDefaultAsync(u => u.EmailNormalized == emailNormalized);
        if (user is not null)
        {
            return user;
        }

        return await db.Users.FirstOrDefaultAsync(u => u.UserName == usernameOrEmail);
    }
}
