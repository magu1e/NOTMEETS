using Microsoft.EntityFrameworkCore;
using backend.Models;


namespace backend.Data
{
    public class ApiContext : DbContext
    {

        // DbSet que representa la tabla de usuarios en la base de datos
        public DbSet<User> Users { get; set; }

        public ApiContext(DbContextOptions<ApiContext> options) : base(options)
        {
            Users = Set<User>();
        }


    }
}
