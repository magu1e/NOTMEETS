
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class RoomDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido.")]
        public string Name { get; set; } = String.Empty;


        [Required(ErrorMessage = "La ubicación es requerida.")]
        public int Location { get; set; }


        [Required(ErrorMessage = "La capacidad es requerida.")]
        [Range(1, int.MaxValue, ErrorMessage = "La capacidad no puede ser inferior a 1.")]
        public int Capacity { get; set; }

        public List<AddBookingDTO>? Bookings { get; set; }


        public RoomDTO()
        {
        }

        public RoomDTO(int id, string name, int location, int capacity, List<AddBookingDTO> bookings)
        {
            Id = id;
            Name = name;
            Location = location;
            Capacity = capacity;
            Bookings = bookings.ToList();
        }

        public RoomDTO(string name, int location, int capacity, List<AddBookingDTO> bookings)
        {
            Name = name;
            Location = location;
            Capacity = capacity;
            Bookings = bookings.ToList();
        }

    }

}