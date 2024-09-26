
namespace backend.DTOs
{
    public class RoomDTO
    {
        public int RoomId { get; set; }
        public string Name { get; set; } = String.Empty;
        public int Location { get; set; }
        public int Capacity { get; set; }
        public List<AddBookingDTO>? Bookings { get; set; }


        public RoomDTO()
        {
        }
    

        public RoomDTO(string name, int location, int capacity, List<AddBookingDTO> bookings)
        {
            Name = name;
            Location = location;
            Capacity = capacity;
            Bookings = bookings.ToList();
        }

    }

}