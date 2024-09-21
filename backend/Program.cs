using Microsoft.EntityFrameworkCore;
using backend.Data;
using Microsoft.Extensions.Configuration;
using backend.Repositories;
using backend.Services;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Acceso y direcci�n de la base de datos
            builder.Services.AddDbContext<ApiContext>(opciones =>
                opciones.UseSqlServer(builder.Configuration.GetConnectionString("BackendDb")));

            // Inyecta services
            builder.Services.AddScoped<IUserService, UserService>();
            // Inyecta repositories
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            // Inyecta controllers
            builder.Services.AddControllers();

            // Agregar CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });

            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Usar CORS
            app.UseCors("AllowAll");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
