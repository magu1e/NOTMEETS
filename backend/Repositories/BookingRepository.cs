using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace backend.Repositories
{
    public class BookingRepository : IBookingRepository

    {
        private readonly ApiContext _context;
        private readonly DbSet<Booking> db;

        public BookingRepository(ApiContext context)
        {
            _context = context;
        }

        public async Task<bool> AddBooking(List<AddBookingDTO> addBookingDTOs)
        {
            // Guarda las salas con errores
            List<string> bookingsWithErrors = new();
            string errorMessage = string.Empty;

            // Inicia la transacción para asegurar atomicidad
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Recorre todas las reservas a agregar
                foreach (var addBookingDTO in addBookingDTOs)
                {
                    var room = await _context.Rooms.FindAsync(addBookingDTO.RoomId);
                    var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == addBookingDTO.Username);

                    if (room == null || user == null)
                    {
                        throw new ArgumentException("No se encontró la sala o el usuario.");
                    }

                    // Verifica si hay conflictos de reservas y los guarda en la lista
                    var conflictingBookings = await _context.Bookings.Where(b => b.RoomId == addBookingDTO.RoomId &&
                        (b.StartDate < addBookingDTO.EndDate && b.EndDate > addBookingDTO.StartDate)).ToListAsync();

                    // Verifica si la nueva reserva tiene conflictos con reservas existentes
                    foreach (var existingBooking in conflictingBookings)
                    {
                        // Valida prioridad
                        if (addBookingDTO.Priority > existingBooking.Priority)
                        {
                            // Cancela todas las reservas con mismo timestamp (hechas en la misma petición)
                            var bookingsToCancel = await _context.Bookings
                                .Where(b => b.Timestamp == existingBooking.Timestamp)
                                .ToListAsync();

                            // Borra las reservas a cancelar
                            _context.Bookings.RemoveRange(bookingsToCancel);
                            // TODO -> Falta notificar a los usuarios de las reservas canceladas
                        }
                        else
                        {
                            // Agrega los IDs de las salas en conflicto a la lista
                            bookingsWithErrors.Add(existingBooking.Room.Id.ToString());
                        }
                    }

                    // Si hay reservas en conflicto, no se procesan
                    if (bookingsWithErrors.Any(b => b == room.Id.ToString()))
                    {
                        string roomIds = string.Join(", ", bookingsWithErrors);
                        errorMessage = bookingsWithErrors.Count > 1
                            ? $"Las salas con IDs {roomIds} ya ha sido reservadas para ese día y horario." //TODO -> No esta devolviendo todas cuando es mas de una
                            : $"La sala con ID {roomIds} ya ha sido reservada para ese día y horario.";
                        throw new InvalidOperationException(errorMessage);
                    }

                    // Crea la nueva reserva si no hay conflictos
                    var booking = new Booking
                    (
                        startDate: addBookingDTO.StartDate,
                        endDate: addBookingDTO.EndDate,
                        room: room,
                        user: user,
                        attendees: addBookingDTO.Attendees,
                        priority: addBookingDTO.Priority,
                        timestamp: addBookingDTO.Timestamp
                    );

                    // Asegura que la entidad de la sala y el usuario no se modifiquen
                    _context.Entry(room).State = EntityState.Unchanged;
                    _context.Entry(user).State = EntityState.Unchanged;

                    await _context.Bookings.AddAsync(booking); // Agregar la nueva reserva
                }

                await _context.SaveChangesAsync(); // Guarda los cambios antes de hacer commit
                await transaction.CommitAsync(); // Confirma transacción

                return true;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(); // Si hay error en alguna, cancela y vuelve todo atrás
                throw new Exception(ex.Message);
            }
        }




        // Eliminar una reserva por su ID
        public bool DeleteBooking(int id)
        {
            var booking = _context.Bookings.Find(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                _context.SaveChanges(); // Guardar cambios en la base de datos
                return true;
            }
            return false;
        }


        // Obtener reservas creadas que coincidan con el tiempo buscado
        public List<Booking> GetBookingsForRoomAtTime(int roomId, DateTime startDate, DateTime endDate)
        {
            var bookings = _context.Bookings.Where(b => b.Room.Id == roomId && b.StartDate >= startDate && b.EndDate <= endDate);
            return bookings.ToList();
        }


        // Obtener una reserva por su ID
        public Booking? GetBookingById(int id)
        {
            var booking = _context.Bookings.FirstOrDefault(b => b.Id == id);
            if (booking != null)
            {
                return booking;
            }
            return null;
        }

        public async Task<List<Booking>> GetBookingsByUsername(string username)
        {
            var booking = await _context.Bookings
                .Where(b => b.User.Username == username).ToListAsync();

            return booking;
        }
    }
}
