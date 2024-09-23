namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int Location { get; set; }
        public string Role { get; set; }

        public List<Booking> Bookings { get; set; }

        //public List<Notification> Notifications { get; set; }

        public User (string username, string password, string email, int location, string role, List<Booking> bookigns) 
        {
            Username = username;
            Password = password;
            Email = email;
            Location = location;
            Role = role;
            Bookings = bookings;

        }

    }
}
