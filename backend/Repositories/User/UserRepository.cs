using backend.Data;
using backend.DTOs.User;

namespace backend.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        private readonly ApiContext _context;

        // Constructor para inyectar el contexto de base de datos
        public UserRepository(ApiContext context)
        {
            _context = context;
        }



        public bool UserAuth(AuthUserDTO userDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == userDto.Username && u.Password == userDto.Password);
            return user != null;
        }



        public void AddUser(AddUserDTO userDto)
        {
            var user = new User
            {
                Username = userDto.Username,
                Password = userDto.Password,
                Email = userDto.Email,
                Location = userDto.Location,
            };
            _context.Users.Add(user);
            _context.SaveChanges();
        }



        public void UpdateUser(GetUserDTO userDto)
        {
            var user = _context.Users.Find(userDto.Id);
            if (user != null)
            {
                user.Username = userDto.Username;
                user.Email = userDto.Email;
                user.Location = userDto.Location;
                user.Role = userDto.Role;
                _context.SaveChanges();
            }
        }


        public void DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }



        public IEnumerable<GetUserDTO> GetAllUsers()
        {
            return _context.Users.Select(u => new GetUserDTO
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Location = u.Location,
                Role = u.Role,
            }).ToList();
        }



        public GetUserDTO? GetUserById(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                return new GetUserDTO
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    Location = user.Location,
                    Role = user.Role,
                };
            }
            return null;
        }



        public GetUserRoleDTO? GetUserRole(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                return new GetUserRoleDTO
                {
                    Id = user.Id,
                    Role = user.Role
                };
            }
            return null;
        }
    }
}

