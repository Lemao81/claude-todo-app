using WebApi.Features.Auth.Services;

namespace UnitTests.Auth;

public class PasswordHasherV1Tests
{
    private readonly PasswordHasherV1 _hasher = new();

    [Fact]
    public void Hash_ReturnsStringInExpectedFormat()
    {
        var result = _hasher.Hash("correct horse battery staple");

        var parts = result.Split(':');

        Assert.Equal(3, parts.Length);
        Assert.Equal("v1", parts[0]);
        Assert.Equal(16, Convert.FromHexString(parts[1]).Length);
        Assert.Equal(32, Convert.FromHexString(parts[2]).Length);
    }

    [Fact]
    public void Hash_ProducesDifferentOutputForSamePassword()
    {
        var first = _hasher.Hash("same-password");
        var second = _hasher.Hash("same-password");

        Assert.NotEqual(first, second);
    }

    [Fact]
    public void Verify_ReturnsTrue_ForMatchingPassword()
    {
        const string password = "s3cr3t!";
        var hash = _hasher.Hash(password);

        Assert.True(_hasher.Verify(password, hash));
    }

    [Fact]
    public void Verify_ReturnsFalse_ForNonMatchingPassword()
    {
        var hash = _hasher.Hash("correct-password");

        Assert.False(_hasher.Verify("wrong-password", hash));
    }

    [Theory]
    [InlineData("")]
    [InlineData("v1")]
    [InlineData("v1:onlytwoparts")]
    [InlineData("v1:a:b:c")]
    public void Verify_ReturnsFalse_WhenPartCountIsNotThree(string passwordHash)
    {
        Assert.False(_hasher.Verify("password", passwordHash));
    }

    [Fact]
    public void Verify_ReturnsFalse_WhenVersionPrefixIsInvalid()
    {
        var hash = _hasher.Hash("password");
        var tampered = $"v2:{hash.Split(':', 2)[1]}";

        Assert.False(_hasher.Verify("password", tampered));
    }
}
