namespace backend.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public int Capacity { get; set; }

        

        //Lista de reservar 
        public List<Booking> Bookings { get; set; } = new List<Booking>();


        // Constructor para inicializar
        public Room(string name, string location, int capacity, List<Booking>? bookings = null)
        {
            Name = name;
            Location = location; 
            Capacity = capacity;
            // Asigna la lista de reservas, si es nula crea una lista vacía
            Bookings = bookings ?? new List<Booking>(); 
        }
    }
}
