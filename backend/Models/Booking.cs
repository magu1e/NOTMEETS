using backend.Data;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Booking
    {
        //id
        public int Id { get; set; }
      
        public string User { get; set; }

        //Almacenar el ID de la sala
        public int RoomId { get; set; }

        //Sala de reserva 
        public Room Room { get; set; }
        //Prioridad de la reserva
        public string Priority { get; set; } // "LOW", "MEDIUM", "HIGH"

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; } 

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime EndDate { get; set; }

        // Propiedad para verificar el número de asistentes contra la capacidad de la sala
        [Range(1, int.MaxValue, ErrorMessage = "Debe haber al menos un asistente.")]
        public int Attendees { get; set; }

        // Constructor para inicializar Booking, agregue el RoomId
        public Booking(string user, Room room, int roomId, string priority, DateTime startDate, DateTime endDate, int attendees)
        {
            User = user;
            Room = room;  
            RoomId = roomId;
            Priority = priority;
            StartDate = startDate;
            EndDate = endDate;

            // Validar que el número de asistentes no exceda la capacidad de la sala
        if (attendees > room.Capacity)
            {
                throw new ArgumentException($"El número de asistentes ({attendees}) excede la capacidad de la sala ({room.Capacity}).");
            }
            Attendees = attendees;

            }

        
    }
}



