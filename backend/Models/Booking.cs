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

        // Nueva propiedad para almacenar el ID de la sala
        public int RoomId { get; set; }

        //El error se soluciono 
        public Room Room { get; set; }

        public string Priority { get; set; } // "LOW", "MEDIUM", "HIGH"

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; } 

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime EndDate { get; set; }

        

        // Constructor para inicializar agregue el RoomId
        public Booking(string user, Room room, int roomId, string priority, DateTime startDate, DateTime endDate)
        {
            User = user;
            Room = room;  
            RoomId = roomId;
            Priority = priority;
            StartDate = startDate;
            EndDate = endDate;
        }
        
    }
}
