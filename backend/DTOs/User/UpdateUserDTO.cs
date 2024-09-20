using UserClass = backend.Models.User;

namespace backend.DTOs.User
{
    public class UpdateUserDTO
    {
        public int Id { get; }
        public string Username { get; set; }
        public string Email { get; set; }
        public int Location { get; set; }
        public string Role { get; set; }

        public UpdateUserDTO(UserClass user) 
        {
            Id = user.Id;
            Username = user.Username;
            Email = user.Email;
            Location = user.Location;
            Role = user.Role;
        }
    }
}
