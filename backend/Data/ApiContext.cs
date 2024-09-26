using Microsoft.EntityFrameworkCore;
using backend.Models;


namespace backend.Data
{
    public class ApiContext : DbContext
    {

        // DbSet que representa la tabla de usuarios en la base de datos
        public DbSet<User> Users { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public ApiContext(DbContextOptions<ApiContext> options) : base(options)
        {
            Users = Set<User>();
            Bookings = Set<Booking>();
            Rooms = Set<Room>();
            Notifications = Set<Notification>();
        }

        //Relaciona las tablas en la db
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>().HasOne(b => b.Room).WithMany(r => r.Bookings).HasForeignKey(b => b.RoomId);
            modelBuilder.Entity<Booking>().HasOne(u => u.User).WithMany(r => r.Bookings).HasForeignKey(u => u.UserId);
        }

    }
}
