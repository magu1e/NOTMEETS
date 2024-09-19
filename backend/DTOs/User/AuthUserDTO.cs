namespace backend.DTOs.User
{
    public class AuthUserDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        
        
        public AuthUserDTO(string username, string password)
        {
            Username = username;
            Password = password;
        }
    }

}
