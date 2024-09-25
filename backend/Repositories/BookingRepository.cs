using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    public class BookingRepository : IBookingRepository

    {
        private readonly ApiContext _context;

        public BookingRepository(ApiContext context)
        {
            _context = context;
        }

        // Obtener reservas que se solapen con el tiempo dado para una sala específica
        public IEnumerable<Booking> GetBookingsForRoomAndTime(int roomId, DateTime startDate, DateTime endDate)
        {
            return _context.Bookings
                .Where(b => b.Room.Id == roomId &&
                            b.StartDate < endDate &&
                            b.EndDate > startDate)
                .ToList();
        }

        // Añadir una nueva reserva
        public Booking AddBooking(Booking booking)
        {
            _context.Bookings.Add(booking);
            _context.SaveChanges(); // Guardar cambios en la base de datos
            return booking;
        }

        // Eliminar una reserva por su ID
        public void DeleteBooking(int id)
        {
            var booking = _context.Bookings.Find(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                _context.SaveChanges(); // Guardar cambios en la base de datos
            }
        }

        // Obtener una reserva por su ID
        public Booking GetBookingById(int id)
        {
            return _context.Bookings.FirstOrDefault(b => b.Id == id); ///verificar esta advertencia
        }

        public Task<Booking> CreateBooking(Booking booking)
        {
            throw new NotImplementedException();
        }

        Task<Booking> IBookingRepository.GetBookingById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Booking>> GetBookingsByRoomId(int roomId)
        {
            throw new NotImplementedException();
        }

        public Task<Booking> UpdateBooking(Booking booking)
        {
            throw new NotImplementedException();
        }

        Task<bool> IBookingRepository.DeleteBooking(int id)
        {
            throw new NotImplementedException();
        }
    }
}
