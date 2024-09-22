using backend.Data;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class Reserva
    {
        public int Id { get; set; }

        public Sala Sala { get; set; }


    }

    

}
