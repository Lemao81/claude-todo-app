using System.Security.Cryptography;

namespace WebApi.Features.Auth.Services;

public class PasswordHasherV1 : IPasswordHasher
{
    private const int SaltSize = 16;
    private const int Iterations = 100_000;
    private const int HashSize = 32;
    private static readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA512;

    public string Hash(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(SaltSize);
        var hash = Rfc2898DeriveBytes.Pbkdf2(
            password,
            salt,
            Iterations,
            Algorithm,
            HashSize);

        return $"v1:{Convert.ToHexString(salt)}:{Convert.ToHexString(hash)}";
    }

    public bool Verify(string password, string passwordHash)
    {
        var parts = passwordHash.Split(':');
        if (parts.Length != 3)
        {
            return false;
        }

        if (parts[0] != "v1")
        {
            return false;
        }

        var salt = Convert.FromHexString(parts[1]);
        var hash = Convert.FromHexString(parts[2]);

        var computedHash = Rfc2898DeriveBytes.Pbkdf2(
            password,
            salt,
            Iterations,
            Algorithm,
            hash.Length);

        return CryptographicOperations.FixedTimeEquals(computedHash, hash);
    }
}
