using Microsoft.EntityFrameworkCore;
using WebApi.Features.Auth.Services;
using WebApi.Features.Todos.Models;
using WebApi.Features.Users.Models;

namespace WebApi.Data.Seed;

public static class SeedHelper
{
    private static readonly Guid AdminUserId = new("cc6aead7-855c-4410-bb4b-2067f5738528");
    private static readonly Guid JohnDoeUserId = new("298c7978-451b-469a-8fdd-ca1f672c300e");

    public static async Task SeedAsync(AppDbContext db, IPasswordHasher passwordHasher)
    {
        await SeedUsersAsync(db, passwordHasher);
        await SeedTodosAsync(db);
    }

    private static async Task SeedTodosAsync(AppDbContext db)
    {
        if (await db.TodoLists.AnyAsync())
        {
            return;
        }

        TodoList[] adminTodoLists =
        [
            new()
            {
                Name = "General",
                Todos =
                [
                    new Todo { Text = "Schedule dentist appointment", Description = "Need to book a check-up before end of month", Done = false },
                    new Todo { Text = "Read a book", Done = true },
                    new Todo { Text = "Call mom", Description = "Her birthday is coming up — don't forget to ask about the family reunion", Done = false },
                    new Todo { Text = "Renew car insurance", Description = "Current policy expires on July 15", Done = false },
                    new Todo { Text = "Research vacation destinations", Done = false },
                    new Todo { Text = "Update resume", Done = false }
                ]
            },
            new()
            {
                Name = "Groceries",
                Todos =
                [
                    new Todo { Text = "Buy groceries", Description = "Milk, eggs, bread, and coffee", Done = false },
                    new Todo { Text = "Buy birthday gift for Alex", Done = false },
                    new Todo { Text = "Pick up coffee beans", Done = true },
                    new Todo { Text = "Get fresh vegetables", Description = "Carrots, spinach, and tomatoes", Done = false }
                ]
            },
            new()
            {
                Name = "Chores",
                Todos =
                [
                    new Todo { Text = "Walk the dog", Done = false },
                    new Todo { Text = "Fix leaking kitchen faucet", Description = "The cold-water handle drips when fully closed", Done = false },
                    new Todo { Text = "Clean the garage", Done = false },
                    new Todo { Text = "Take out recycling", Done = true },
                    new Todo { Text = "Water the plants", Done = true },
                    new Todo { Text = "Do laundry", Done = true }
                ]
            }
        ];

        TodoList[] johnDoeTodoLists =
        [
            new()
            {
                Name = "Work",
                Todos =
                [
                    new Todo { Text = "Prepare quarterly report", Description = "Include sales figures for Q2", Done = false },
                    new Todo { Text = "Reply to client emails", Done = true },
                    new Todo { Text = "Book flight for conference", Description = "Conference is the first week of August", Done = false }
                ]
            },
            new()
            {
                Name = "Home",
                Todos =
                [
                    new Todo { Text = "Mow the lawn", Done = false },
                    new Todo { Text = "Assemble new bookshelf", Description = "Tools are in the garage", Done = false },
                    new Todo { Text = "Pay electricity bill", Done = true }
                ]
            }
        ];

        AssignSeedData(adminTodoLists, AdminUserId);
        AssignSeedData(johnDoeTodoLists, JohnDoeUserId);

        db.TodoLists.AddRange(adminTodoLists);
        db.TodoLists.AddRange(johnDoeTodoLists);

        await db.SaveChangesAsync();
    }

    private static void AssignSeedData(TodoList[] todoLists, Guid userId)
    {
        foreach (var todoList in todoLists)
        {
            todoList.UserId = userId;
            var order = 1;
            foreach (var todo in todoList.Todos)
            {
                todo.Order = order++;
            }
        }
    }

    private static async Task SeedUsersAsync(AppDbContext db, IPasswordHasher passwordHasher)
    {
        if (await db.Users.AnyAsync())
        {
            return;
        }

        db.Users.AddRange(
            CreateUser(AdminUserId, "admin", "admin@test.com", "Ada", "Admin", "password", passwordHasher),
            CreateUser(JohnDoeUserId, "jdoe", "jdoe@test.com", "John", "Doe", "password", passwordHasher),
            CreateUser(new Guid("d0f35cb0-3722-4bb9-a383-0653ea0c6453"), "asmith", "alice.smith@test.com", "Alice", "Smith", "password", passwordHasher),
            CreateUser(new Guid("6f5a1105-e94d-4080-ba21-d3eda369512f"), "bwayne", "bruce.wayne@test.com", "Bruce", "Wayne", "password", passwordHasher),
            CreateUser(new Guid("d69caa5f-7295-4850-be6d-d636671934c0"), "cjones", "carol.jones@test.com", "Carol", "Jones", "password", passwordHasher)
        );

        await db.SaveChangesAsync();
    }

    private static User CreateUser(
        Guid id,
        string userName,
        string email,
        string firstName,
        string lastName,
        string password,
        IPasswordHasher passwordHasher) =>
        new()
        {
            Id = id,
            UserName = userName,
            Email = email,
            EmailNormalized = email.ToUpperInvariant(),
            EmailConfirmed = true,
            FirstName = firstName,
            LastName = lastName,
            PasswordHash = passwordHasher.Hash(password),
        };
}
