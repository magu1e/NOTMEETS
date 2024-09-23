using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase

    {
        private readonly ApiContext _context;

        //Verificar bien esto parte de validacion de reserva contra prioridad
        public BookingController(ApiContext context)
        {
            _context = context;
        }

        [HttpPost("book-room")]
        public IActionResult BookRoom([FromBody] NewbookingDTO bookingDto)
        {
            if (bookingDto == null)
            {
                return BadRequest(new { message = "Datos de reserva inválidos." });
            }

            if (bookingDto.StartDate >= bookingDto.EndDate)
            {
                return BadRequest(new { message = "El horario de inicio debe ser antes del horario de fin." });
            }

            // Buscar si existe una reserva en conflicto por horario y prioridad.
            var conflictingBooking = _context.Bookings
                .Include(b => b.Room)
                .Where(b => b.Room.Name == bookingDto.RoomName &&
                            b.StartDate < bookingDto.EndDate &&
                            b.EndDate > bookingDto.StartDate)
                .OrderByDescending(b => b.Priority) // verificar esto Ordenar por prioridad en caso de múltiples reservas.
                .FirstOrDefault();

            if (conflictingBooking != null)
            {
                // Comprobar la prioridad de la reserva existente con la nueva. Verificar el ComparePriority
                if (ComparePriority(conflictingBooking.Priority, bookingDto.Priority) >= 0)
                {
                    // Si la reserva existente tiene mayor o igual prioridad, no se puede realizar la nueva reserva.
                    return Conflict(new
                    {
                        available = false,
                        message = $"La sala ya está reservada por un usuario con prioridad igual o mayor ({conflictingBooking.Priority}).",
                        bookingDetails = conflictingBooking
                    });
                }
                else
                {
                    // Si la nueva reserva tiene mayor prioridad, cancelar la reserva existente.
                    _context.Bookings.Remove(conflictingBooking);
                }
            }

            // Crear la nueva reserva.
            var room = _context.Rooms.FirstOrDefault(r => r.Name == bookingDto.RoomName);
            if (room == null)
            {
                return BadRequest(new { message = "Sala no encontrada." });
            }
            //revisar aqui el bookingDto
            var newBooking = new Booking(
                bookingDto.User,
                room,
                bookingDto.Priority,
                bookingDto.StartDate,
                bookingDto.EndDate
            );

            // Guardar la reserva en la base de datos
            _context.Bookings.Add(newBooking);
            _context.SaveChanges();

            return Ok(new
            {
                available = true,
                message = "Reserva creada exitosamente.",
                bookingDetails = newBooking
            });
        }
        //aqui la prioridad se definio como int 
        // Método para comparar prioridades. Debe devolver un valor negativo, cero o positivo.
        //private int ComparePriority(string existingPriority, string newPriority)
        //{
            // Suponiendo que las prioridades son numéricas y pueden ser comparadas como enteros.
            // Si se utiliza otro tipo de comparación, este método debe modificarse.
           // int existing = int.TryParse(existingPriority, out int ePriority) ? ePriority : 0;
           // int incoming = int.TryParse(newPriority, out int nPriority) ? nPriority : 0;

           // return incoming.CompareTo(existing);
        }
        //Este es el metodo para prioridades definida como string revisar
        private int ComparePriority(string existingPriority, string newPriority)
        {
            // Diccionario que asigna valores a las prioridades.
            var priorityMapping = new Dictionary<string, int>
    {
        { "Alta", 3 },
        { "Media", 2 },
        { "Baja", 1 }
    };

            // Obtener el valor numérico de la prioridad existente.
            int existing = priorityMapping.ContainsKey(existingPriority)
                            ? priorityMapping[existingPriority]
                            : 0; // Valor por defecto si la prioridad no es reconocida.

            // Obtener el valor numérico de la nueva prioridad.
            int incoming = priorityMapping.ContainsKey(newPriority)
                            ? priorityMapping[newPriority]
                            : 0; // Valor por defecto si la prioridad no es reconocida.

            return incoming.CompareTo(existing);
        }
    }
}
