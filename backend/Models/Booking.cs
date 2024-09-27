using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; } //Sala de reserva 
        public int Priority { get; set; } //Prioridad de la reserva
        public long Timestamp { get; set; } //Id para las reservas hechas en una misma peticion


        [Required]
        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; } 

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime EndDate { get; set; }

        // Propiedad para verificar el número de asistentes contra la capacidad de la sala
        [Range(1, 100, ErrorMessage = "Debe haber al menos un asistente.")]
        public int Attendees { get; set; }


        public Booking() { }

        // Constructor para inicializar Booking, agregue el RoomId
        public Booking(DateTime startDate, DateTime endDate, Room room, User user, int attendees, int priority, long timestamp)
        {
            StartDate = startDate;
            EndDate = endDate;
            RoomId = room.Id;
            UserId = user.Id;
            Room = room;
            User = user;
            Attendees = attendees;
            Priority = priority;
            Timestamp = timestamp;
        }
    }
}