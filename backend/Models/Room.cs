using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Room
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "La ubicación es requerida.")]
        public int Location { get; set; }

        [Required(ErrorMessage = "La capacidad es requerida.")]
        [Range(1, int.MaxValue, ErrorMessage = "La capacidad no puede ser inferior a 1.")]
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
        public List<Booking> Bookings { get; set; } = new();


        // Constructor para inicializar
        public Room(string name, int location, int capacity)
        {
            Name = name;
            Location = location; 
            Capacity = capacity;
            Bookings = new List<Booking>();
        }

        public Room()
        {
          
        }
    }
}
