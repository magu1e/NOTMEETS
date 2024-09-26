using backend.Data;
using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase

    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        //Add
        //POST: api/Booking/add
        [HttpPost("add")]
        public async Task<IActionResult> AddBooking([FromBody] List<AddBookingDTO> addBookingDTOs)
        {
            try
            {
                if (addBookingDTOs == null || !addBookingDTOs.Any())
                {
                    return BadRequest("La lista de reservas no puede estar vacía.");
                }

                await _bookingService.AddBooking(addBookingDTOs);
                return Ok("La reserva se ha creado correctamente.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }


        //GetBookingById
        //GET: api/Booking/5
        [HttpGet("{id:int}")]
        public IActionResult GetBookingById(int id)
        {
            var booking = _bookingService.GetBookingById(id);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }


        //GetBookingsForRoomAtTime
        // GET: api/Booking/date/5
        [HttpGet("date/{id:int}")]
        public IActionResult GetBookingsForRoomAtTime(int roomId, DateTime startDate, DateTime endDate)
        {
            var booking = _bookingService.GetBookingsForRoomAtTime(roomId, startDate, endDate);
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        //UpdateBooking
        // PUT: api/Booking/update/5
        //[HttpPut("update/{id:int}")]
        //public async Task<IActionResult> UpdateBooking(int id, [FromBody] AddBookingDTO updatedBooking)
        //{
        //    try
        //    {
        //        var booking = _bookingService.UpdateBooking(id, updatedBooking);
        //        if (booking == null)
        //        {
        //            return NotFound();
        //        }
        //        return Ok(booking);
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}


        //DeleteBooking
        // DELETE: api/Booking/delete/5
        [HttpDelete("delete/{id:int}")]
        public IActionResult DeleteBooking(int id)
        {
            var result = _bookingService.DeleteBooking(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
