using backend.DTOs.User;
//Renombra para evitar conflictos con el 'User' del namespace
using UserClass = backend.Models.User;

namespace backend.Repositories.User
{
    public interface IUserRepository
    {
        //Firmas de los metodos de consulta del UserRepository
        bool UserAuth(AuthUserDTO userDto); //Auth usuario
        UserClass AddUser(AddUserDTO userDto); //Registro usuario
        //TODO -> fixear
        //UserClass? UpdateUser(GetUserDTO userDto); //Modificaicon usuario
        bool DeleteUser(int id); //Borrado usuario
        IEnumerable<GetUserDTO> GetAllUsers(); //Obtener todos los usuarios
        GetUserDTO? GetUserById(int id); //Obtener un usuario 
        GetUserRoleDTO? GetUserRole(int id); //Obtener rol del usuario

        // IEnumerable<GetUserBookingsDTO> GetUserBookings() // Obtener lista de reservas del usuario
        // IEnumerable<GetUserNotificationsDTO> GeUserNotifications(); //Obtener lista de notificaciones del usuario
    }
}
