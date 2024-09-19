namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public string Role { get; set; }

        //public List<Reservation> Reservations { get; set; }

        //public List<Notification> Notifications { get; set; }

        public User (int id, string username, string password, string email, string location, string role) 
        {
            Id = id;
            Username = username;
            Password = password;
            Email = email;
            Location = location;
            Role = role;
        }

    }
}
