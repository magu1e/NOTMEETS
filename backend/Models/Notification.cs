namespace backend.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string Description { get; set; } = String.Empty;
        public int BookingId { get; set; }
        public DateTime CreatedDate { get; set; }


        public Notification() { }

        public Notification(User user, string description, int bookingId, DateTime createdDate)
        {
            User = user;
            Description = description;
            BookingId = bookingId;
            CreatedDate = createdDate;
        }
    }
}
