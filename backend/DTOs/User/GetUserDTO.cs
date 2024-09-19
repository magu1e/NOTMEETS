namespace backend.DTOs.User
{
    public class GetUserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public string Role { get; set; }

        //public List<Reservation> Reservations { get; set; }

    }
}
