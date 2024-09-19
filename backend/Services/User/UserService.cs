using backend.DTOs.User;
using backend.Repositories.User;
//Renombra para evitar conflictos con el 'User' del namespace
using UserClass = backend.Models.User;

namespace backend.Services.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public bool UserAuth(AuthUserDTO userDto)
        {
            return _userRepository.UserAuth(userDto);
        }



        public UserClass AddUser(AddUserDTO userDto)
        {
            // Valida los datos del registro y de no existir lanza excepcion y sale 
            if (string.IsNullOrEmpty(userDto.Username) || string.IsNullOrEmpty(userDto.Password) || string.IsNullOrEmpty(userDto.Email))
            {
                throw new ArgumentException("Faltan completar campos.");
            }
            UserClass userAdded = _userRepository.AddUser(userDto);
            return userAdded;
        }



        public UserClass? UpdateUser(GetUserDTO userDto)
        {
            // Valida que exista el usuario y de no existir lanza excepcion y sale 
            var user = _userRepository.GetUserById(userDto.Id);
            if (user == null)
            {
                throw new KeyNotFoundException("No se ha encontrado el usuario.");
            }
            UserClass? userUpdated = _userRepository.UpdateUser(userDto);
            return userUpdated;
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



        public GetUserDTO GetUserById(int id)
        {
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                throw new KeyNotFoundException("No se ha encontrado el usuario.");
            }
            return user;
        }



        public IEnumerable<GetUserDTO> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
        }
        public GetUserRoleDTO GetUserRole(int id)
        {
            var userRole = _userRepository.GetUserRole(id);
            if (userRole == null)
            {
                throw new KeyNotFoundException("No se ha encontrado el usuario.");
            }
            return userRole;
        }
    }
}
