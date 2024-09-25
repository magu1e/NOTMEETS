using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class NewBookingDTO
    {
        
        public int Id { get; set; }
        public string? User { get; set; }
        public int UserId { get; set; }
        public int RoomId { get; set; } // Agregar esta propiedad para poder buscar la sala por id en el BookingService
        public string? RoomName { get; set; } 
        public string? Priority { get; set; } // "LOW", "MEDIUM", "HIGH"

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime EndDate { get; set; }

        // Número de asistentes para la reserva nuevo 
        [Range(1, int.MaxValue, ErrorMessage = "Debe haber al menos un asistente.")]
        public int Attendees { get; set; }
        
    }
}
