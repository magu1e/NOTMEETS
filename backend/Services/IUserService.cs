using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        //Firmas de los metodos con logica del UserService
        object? UserAuth(UserDTO userDto); //Login usuario
        User? AddUser(UserDTO userDto); //Registro usuario
        User UpdateUser(UserDTO userDto); //Modificaicon usuario
        bool DeleteUser(int id); //Borrado usuario
        IEnumerable<UserDTO> GetAllUsers(); //Obtener todos los usuarios
        UserDTO? GetUserById(int id); //Obtener un usuario
        UserDTO? GetUserRole(int id); //Obtener rol del usuario

        // IEnumerable<GetUserBookingsDTO>? GetUserBookings() // Obtener lista de reservas del usuario
        // IEnumerable<GetUserNotificationsDTO>? GeUserNotifications(); //Obtener lista de notificaciones del usuario
    }
}
