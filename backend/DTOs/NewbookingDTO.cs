namespace backend.DTOs
{
    public class NewbookingDTO
    {
        //public int Id { get; set; }
        //public int Idroom { get; set; }
        //public int Priority { get; set; }
        // public DateTime Satardate { get; set; }
        //
        public int Id { get; set; }
        public string? User { get; set; }
        public string? RoomName { get; set; } 
        public string? Priority { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }


    }
}
