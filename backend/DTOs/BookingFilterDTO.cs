namespace backend.DTOs
{
    public class BookingFilterDTO
    {
        public int? roomId { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
    }
}
