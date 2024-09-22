using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservaController : Controller
    {
        public ApiContext apiContext { get; set; }
        [HttpPost("nuevareserva")]
        public IActionResult Reserva([FromBody] Reserva reservaDto)
        {
            if (reservaDto == null)
            {
                return BadRequest(new { message = "Datos de reseva inválidos." });

            }
            apiContext.Reservacioes.Add(reservaDto);

            //Con esta instrucccion guarda en base de datos//

            apiContext.SaveChanges();



            return Ok("Reseva exitosa.");
       

            
        }
        public ReservaController(ApiContext context)
        {
            apiContext = context;


        }
    }


}
