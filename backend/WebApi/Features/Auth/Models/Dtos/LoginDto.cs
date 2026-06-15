namespace WebApi.Features.Auth.Models.Dtos;

public class LoginDto
{
    public string UsernameOrEmail { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
