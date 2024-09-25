using backend.Models;

namespace backend.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public int Location { get; set; }
        public string Role { get; set; } = "user";

        //public List<Reservation>? Reservations { get; set; }

        //public List<Notification>? Notifications { get; set; }

        //Default constructor
        public UserDTO()
        {
        }

        //Auth
        public UserDTO(string username, string password)
        {
            Username = username;
            Password = password;
        }

        //Add
        public UserDTO(string username, string password, string email, int location)
        {
            Username = username;
            Password = password;
            Email = email;
            Location = location;
            Role = "user";
        }

        public UserDTO(int id)
        {
            Id = id;
        }

        //GetUser
        public UserDTO(User user)
        {
            Id = user.Id;
            Username = user.Username;
            Email = user.Email;
            Location = 0;
            Role = user.Role;
        }

        //GetUserRole
        public UserDTO(int id, string username, string role)
        {
            Id = id;
            Username = username;
            Role = role;
        }

    }

}
