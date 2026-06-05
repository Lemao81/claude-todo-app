using Microsoft.EntityFrameworkCore;
using WebApi.Todos.Models;

namespace WebApi.Data.Seed;

public static class SeedHelper
{
    public static async Task SeedAsync(AppDbContext db)
    {
        if (await db.Todos.AnyAsync())
        {
            return;
        }

        db.Todos.AddRange(
            new Todo { Text = "Buy groceries", Description = "Milk, eggs, bread, and coffee", Done = false },
            new Todo { Text = "Walk the dog", Done = false },
            new Todo { Text = "Schedule dentist appointment", Description = "Need to book a check-up before end of month", Done = false },
            new Todo { Text = "Read a book", Done = true },
            new Todo { Text = "Fix leaking kitchen faucet", Description = "The cold-water handle drips when fully closed", Done = false },
            new Todo { Text = "Pay electricity bill", Done = true },
            new Todo { Text = "Call mom", Description = "Her birthday is coming up — don't forget to ask about the family reunion", Done = false },
            new Todo { Text = "Clean the garage", Done = false },
            new Todo { Text = "Renew car insurance", Description = "Current policy expires on July 15", Done = false },
            new Todo { Text = "Prepare presentation slides", Done = false },
            new Todo { Text = "Take out recycling", Done = true },
            new Todo { Text = "Refactor authentication module", Description = "Extract token validation into a dedicated service and add unit tests", Done = false },
            new Todo { Text = "Buy birthday gift for Alex", Done = false },
            new Todo { Text = "Review pull requests", Description = "Three PRs waiting since Monday", Done = false },
            new Todo { Text = "Water the plants", Done = true },
            new Todo { Text = "Backup laptop files", Description = "Copy documents and photos to the external drive", Done = false },
            new Todo { Text = "Research vacation destinations", Done = false },
            new Todo { Text = "Submit expense report", Description = "March and April receipts still outstanding", Done = false },
            new Todo { Text = "Do laundry", Done = true },
            new Todo { Text = "Update resume", Done = false }
        );
        await db.SaveChangesAsync();
    }
}
