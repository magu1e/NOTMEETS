using backend.Controllers;

namespace backend.DTOs
{
    public class RoomWithBookingsDTO
    {
        public int RoomId { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public int Capacity { get; set; }
        public List<BookingDTO> Bookings { get; set; }







    }
}
