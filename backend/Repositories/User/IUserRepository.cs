﻿using backend.DTOs.User;

namespace backend.Repositories.User
{
    public interface IUserRepository
    {
        //Firmas de los metodos de consulta del UserRepository
        bool UserAuth(AuthUserDTO userDto); //Auth usuario
        void AddUser(AddUserDTO userDto); //Registro usuario
        void UpdateUser(GetUserDTO userDto); //Modificaicon usuario
        void DeleteUser(int id); //Borrado usuario
        IEnumerable<GetUserDTO> GetAllUsers(); //Obtener todos los usuarios
        GetUserDTO? GetUserById(int id); //Obtener un usuario 
        GetUserRoleDTO? GetUserRole(int id); //Obtener rol del usuario

        // IEnumerable<GetUserBookingsDTO> GetUserBookings() // Obtener lista de reservas del usuario
        // IEnumerable<GetUserNotificationsDTO> GeUserNotifications(); //Obtener lista de notificaciones del usuario
    }
}