using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Room
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public int Location { get; set; }
        public int Capacity { get; set; }

        // Horario de apertura de la sala
        //[Required]
        //[DataType(DataType.Time)]
        //public TimeSpan OpeningTime { get; set; }

        // Horario de cierre de la sala
        //[Required]
        //[DataType(DataType.Time)]
        //public TimeSpan ClosingTime { get; set; }

        //Lista de reservas
        public List<Booking> Bookings { get; set; }


        // Constructor para inicializar
        public Room(string name, int location, int capacity, List<Booking>? bookings = null)
        {
            Name = name;
            Location = location; 
            Capacity = capacity;
            Bookings = bookings ?? new List<Booking>(); // Asigna la lista de reservas, si es nula crea una lista vacía
        }

        public Room()
        {
          
        }
    }
}
