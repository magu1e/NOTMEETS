using backend.DTOs.User;
using backend.Repositories;

namespace backend.Services
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

        public void AddUser(AddUserDTO userDto)
        {
            // Valida los datos del registro
            if (string.IsNullOrEmpty(userDto.Username) || string.IsNullOrEmpty(userDto.Password) || string.IsNullOrEmpty(userDto.Email))
            {
                throw new ArgumentException("Faltan completar campos.");
            }
            _userRepository.AddUser(userDto);
        }

        public void UpdateUser(GetUserDTO userDto)
        {
            // Valida que exista el usuario
            var user = _userRepository.GetUserById(userDto.Id);
            if (user == null)
            {
                throw new KeyNotFoundException("No se ha encontrado el usuario.");
            }
            _userRepository.UpdateUser(userDto);
        }

        public void DeleteUser(int id)
        {
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                throw new KeyNotFoundException("No se ha encontrado el usuario.");
            }
            _userRepository.DeleteUser(id);
        }

        public IEnumerable<GetUserDTO> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
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
