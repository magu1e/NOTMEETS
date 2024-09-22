using backend.Data;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class Reserva
    {
        public int Id { get; set; }

        public Sala Sala { get; set; }

        public int prioridad { get; set; }
        public User usuario { get; set; }
        public DateTime fechainico { get; set; }
        public DateTime fechafin { get; set; }


    }

    

}
