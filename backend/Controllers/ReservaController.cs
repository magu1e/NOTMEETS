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
        public IActionResult Reserva([FromBody] NuevareservaDTO reservaDto)
        {

            if (reservaDto == null)
            {
                return BadRequest(new { message = "Datos de reseva inválidos." });

            }

            Reserva r = new Reserva();

            //query busco sala de la reserva
            r.prioridad = reservaDto.prioridad;



            r.Sala = apiContext.Salas.Where(s => s.Id == reservaDto.idsala).First();


            apiContext.Reservacioes.Add(r);

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
