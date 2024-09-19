using backend.DTOs.User;

namespace backend.Services
{
    public interface IUserService
    {
        //Firmas de los metodos de las peticiones del controller
        bool UserAuth(AuthUserDTO userDto); //Login usuario
        void AddUser(AddUserDTO userDto); //Registro usuario
        void UpdateUser(GetUserDTO userDto); //Modificaicon usuario
        void DeleteUser(int id); //Borrado usuario
        IEnumerable<GetUserDTO> GetAllUsers(); //Obtener todos los usuarios
        GetUserDTO? GetUserById(int id); //Obtener un usuario
        GetUserRoleDTO? GetUserRole(int id); //Obtener rol del usuario

        // IEnumerable<GetUserBookingsDTO>? GetUserBookings() // Obtener lista de reservas del usuario
        // IEnumerable<GetUserNotificationsDTO>? GeUserNotifications(); //Obtener lista de notificaciones del usuario
    }
}
