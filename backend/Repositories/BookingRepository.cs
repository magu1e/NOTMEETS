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

        public BookingRepository(ApiContext context)
        {
            _context = context;
        }


        public async Task<bool> AddBooking(AddBookingDTO addBookingDTO)
        {
            List<string> bookingsWithErrors = new List<string>(); // Almacena las salas con errores
            string errorMessage = string.Empty;

            // Iniciar una transacción para asegurar atomicidad
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var room = await _context.Rooms.FindAsync(addBookingDTO.RoomId);
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == addBookingDTO.Username);

                if (room == null || user == null)
                {
                    throw new Exception("No se encontró la sala o el usuario.");
                }

                // Verificar si hay conflictos de reservas
                var conflictingBookings = await
                    _context.Bookings.Where(b => b.RoomId == addBookingDTO.RoomId &&
                    (b.StartDate < addBookingDTO.EndDate && b.EndDate > addBookingDTO.StartDate)).ToListAsync();

                foreach (var existingBooking in conflictingBookings)
                {
                    if (addBookingDTO.Priority > existingBooking.Priority)
                    {
                        // Si la nueva reserva tiene mayor prioridad, cancela la existente
                        _context.Bookings.Remove(existingBooking);
                        // NotifyUser(existingBooking.User, existingBooking); // TODO -> REVISAR
                    }
                    else
                    {
                        // Agregar los IDs de las salas en conflicto a la lista
                        bookingsWithErrors.Add(existingBooking.Room.Id.ToString());
                    }
                }

                // Generar el mensaje de error dependiendo de la cantidad de salas en conflicto
                if (bookingsWithErrors.Count == 1)
                {
                    errorMessage = $"La sala con ID {bookingsWithErrors[0]} ya ha sido reservada para ese día y horario.";
                }
                else if (bookingsWithErrors.Count > 1)
                {
                    string roomIds = string.Join(", ", bookingsWithErrors);
                    errorMessage = $"Las salas con IDs {roomIds} tienen conflictos y no pueden ser reservadas.";
                }

                // Si hay salas con conflictos, lanza la excepción
                if (bookingsWithErrors.Count > 0)
                {
                    throw new Exception(errorMessage);
                }

                // Crear la nueva reserva
                var booking = new Booking
                (
                    startDate: addBookingDTO.StartDate,
                    endDate: addBookingDTO.EndDate,
                    room: room,
                    user: user,
                    attendees: addBookingDTO.Attendees,
                    priority: addBookingDTO.Priority
                );

                // Asegura que la entidad de la sala y el usuario no se modifiquen
                _context.Entry(room).State = EntityState.Unchanged;
                _context.Entry(user).State = EntityState.Unchanged;

                await _context.Bookings.AddAsync(booking); // Agregar la nueva reserva
                await _context.SaveChangesAsync(); // Guardar los cambios antes de hacer commit
                await transaction.CommitAsync(); // Confirmar transacción

                return true;
            }
            catch (Exception ex)
            {
                // Revertir la transacción si ocurre un error
                await transaction.RollbackAsync();
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
                //_context.SaveChanges(); // Guardar cambios en la base de datos
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
    }
}
