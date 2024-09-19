namespace backend.DTOs.User
{
    public class UpdateUserDTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public string Role { get; set; }


        public UpdateUserDTO(string username, string email, string location, string role) 
        {
            Username = username;
            Email = email;
            Location = location;
            Role = role;
        }
    }
}
