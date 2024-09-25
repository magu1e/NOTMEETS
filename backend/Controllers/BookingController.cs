using backend.Data;
using backend.DTOs;
using backend.Models;
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
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] NewBookingDTO newBookingDto)
        {
            try
            {
                var booking = _bookingService.CreateBooking(newBookingDto);
                return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, booking);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
            // GET: api/Booking/5
            [HttpGet("{id}")]
            public async Task<IActionResult> GetBooking(int id)
            {
                var booking = _bookingService.GetBookingById(id);
                if (booking == null)
                {
                    return NotFound();
                }
                return Ok(booking);
            }

            // PUT: api/Booking/5
            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateBooking(int id, [FromBody] NewBookingDTO updatedBooking)
            {
                try
                {
                    var booking = _bookingService.UpdateBooking(id, updatedBooking);
                    if (booking == null)
                    {
                        return NotFound();
                    }
                    return Ok(booking);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            // DELETE: api/Booking/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteBooking(int id)
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
         