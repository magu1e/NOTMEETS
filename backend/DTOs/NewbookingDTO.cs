namespace backend.DTOs
{
    public class NewbookingDTO
    {
        
        public int Id { get; set; }
        public string? User { get; set; }
        public string? RoomName { get; set; } 
        public string? Priority { get; set; } // "LOW", "MEDIUM", "HIGH"
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }


    }
}
