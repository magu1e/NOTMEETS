using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Repositories;


namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ApiContext _context;

        public UserService(IUserRepository userRepository, ApiContext context)
        {
            _userRepository = userRepository;
            _context = context;
        }

        public object? UserAuth(UserDTO userDto)
        {
            return _userRepository.UserAuth(userDto);
        }



        public User AddUser(UserDTO userDto)
        {
            // Valida que los campos esten completos y que no sean null
            bool invalidFields = string.IsNullOrEmpty(userDto.Username) || string.IsNullOrEmpty(userDto.Password) || string.IsNullOrEmpty(userDto.Email);
            // Busca en la base si el username ya existe
            bool userAlreadyExists = _context.Users.Any(u => u.Username == userDto.Username);
            if (invalidFields || userAlreadyExists)
            {
                if (invalidFields)
                {
                    throw new ArgumentException("Faltan completar campos.");
                }
                else
                {
                    throw new ArgumentException("El nombre de usuario ya existe.");
                }
            }
            User userAdded = _userRepository.AddUser(userDto);
            return userAdded;
        }



        public User UpdateUser(UserDTO userDto)
        {
            var user = _userRepository.GetUserById(userDto.Id);
            var newUsernameAlreadyTaken = _context.Users.Any(u => u.Username == userDto.Username && u.Id != userDto.Id); // username ya existe en la base y es de otro usuario
                      
            // Valida que exista
            if (user == null)
            {
                throw new KeyNotFoundException("No se ha encontrado el usuario.");
            }
            // Valida que no updatee por un nombre ya en uso
            if (newUsernameAlreadyTaken)
            {
                throw new ArgumentException("El nombre de usuario ya existe.");
            }

            User updatedUser = _userRepository.UpdateUser(userDto);
            return updatedUser;
        }



        public bool DeleteUser(int id)
        {
            // Valida que exista el usuario y de no existir lanza excepcion y sale 
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                throw new KeyNotFoundException("No se ha encontrado el usuario.");
            }
            bool userDeleted = _userRepository.DeleteUser(id);
            return userDeleted;
        }



        public User GetUserById(int id)
        {
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                throw new KeyNotFoundException("No se ha encontrado el usuario.");
            }
            return user;
        }



        public IEnumerable<UserDTO> GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();
            if (users.Count() == 0)
            {
                throw new KeyNotFoundException("No hay usuarios cargados.");
            }
            return users;
        }


        public UserDTO GetUserRole(int id)
        {
            var user = _userRepository.GetUserRole(id);
            if (user == null)
            {
                throw new KeyNotFoundException("No se ha encontrado el usuario.");
            }
            return user;
        }
    }
}
