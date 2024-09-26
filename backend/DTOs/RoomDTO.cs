using backend.Models;

namespace backend.DTOs
{
    public class RoomDTO
    {
        public int RoomId { get; set; }
        public string Name { get; set; }
        public int Location { get; set; }
        public int Capacity { get; set; }
    }
}
