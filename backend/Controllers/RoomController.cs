using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly ApiContext _context;

        public RoomController(ApiContext context)
        {
            _context = context;
        }

        // GET: api/Room
        [HttpGet]
        public ActionResult<RoomWithBookingsDTO> GetAll(int Roomid)
        {
            var allbooking = _context.Bookings.Include(x => x.Room).Where(b=>b.Room.Id==Roomid).ToList();
            var roomDTo = new RoomWithBookingsDTO(){ 
            RoomId = allbooking[0].Room.Id,
            //agregar las demas propiedades del booking conusltar cuales y orden a Magui 
            Bookings = allbooking.Select(b => new BookingDTO() {Priority =b.Priority }).ToList()
            
            };

            return Ok(roomDTo);
        }

    }


}
