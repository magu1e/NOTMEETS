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

        //El error se soluciono 
        public Room Room { get; set; }

        public string Priority { get; set; } 

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; } 

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime EndDate { get; set; }

        

        // Constructor para inicializar me da error room debe crear en roon y ver que pasa aqui lo de arriba esta ok
        public Booking(string user, Room room, string priority, DateTime startDate, DateTime endDate)
        {
            User = user;
            // El error que tenia se soluciona con Room como parametro
            Room = room;  
            Priority = priority;
            StartDate = startDate;
            EndDate = endDate;
        }




    }
}
