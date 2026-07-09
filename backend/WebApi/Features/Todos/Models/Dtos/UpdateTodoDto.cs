namespace WebApi.Features.Todos.Models.Dtos;

public class UpdateTodoDto
{
    public bool? Done { get; set; }
    public string? Text { get; set; }
    public string? Description { get; set; }
}
