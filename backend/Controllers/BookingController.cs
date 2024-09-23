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
        //Verificar bien esto
        public BookingController(ApiContext context)
        {
            _context = context;
        }

        public IActionResult Booking([FromBody] NewbookingDTO bookingDto)
        {
            if (bookingDto == null)
            {
                return BadRequest(new { message = "Datos de reserva inválidos." });
            }

            // Buscamos la sala en la base de datos usando el nombre o ID proporcionado
            var room = _context.Rooms.FirstOrDefault(r => r.Name == bookingDto.RoomName);

            if (room == null)
            {
                return NotFound(new { message = "Sala no encontrada." });
            }

            // Creación de la reserva (Booking) a partir del DTO y la sala encontrada
            var booking = new Booking
            {
                User = bookingDto.User,
                Room = room,
                Priority = bookingDto.Priority,
                StartDate = bookingDto.StartDate,
                EndDate = bookingDto.EndDate
            };

            // Guardar la reserva en la base de datos
            _context.Bookings.Add(booking);
            _context.SaveChanges();

            return Ok(new { message = "Reserva creada exitosamente." });




        }
        //public BookingController(ApiContext context)
        {
           // ApiContext = context;


        }
    }
}
