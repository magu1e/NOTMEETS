using backend.DTOs;
using backend.Models;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace backend.DTOs
{
    public class AddBookingDTO
    {
        public int Id { get; set; }
        public string? Username { get; set; } = String.Empty;
        public int RoomId { get; set; } // Agregar esta propiedad para poder buscar la sala por id en el BookingService
        public int Priority { get; set; } = 1;  // 1 = Low, 3 = High // Inicializa por defecto en 1
        public long Timestamp { get; set; } //Id para las reservas hechas en una misma peticion

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime EndDate { get; set; }

        // Número de asistentes para la reserva nuevo 
        [Range(1, 100, ErrorMessage = "Debe haber al menos un asistente.")]
        public int Attendees { get; set; }



        //Default constructor
        public AddBookingDTO() { }

        //AddBooking
        public AddBookingDTO(int id, DateTime startDate, DateTime endDate, int roomId, string username, int attendees, int priority, long timestamp)
        {
            Id = id;
            StartDate = startDate;
            EndDate = endDate;
            RoomId = roomId;
            Username = username;
            Attendees = attendees;
            Priority = 1;
            Timestamp = timestamp;
        }

    }
}