using backend.Data;
using backend.DTOs.User;
using System.Data;

//Renombra para evitar conflictos con el 'User' del namespace
using UserClass = backend.Models.User;

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



        public UserClass AddUser(AddUserDTO userDto)
        {
            var user = new UserClass
             (
                username: userDto.Username,
                password: userDto.Password,
                email: userDto.Email,
                location: userDto.Location,
                role: userDto.Role
            );
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }


        //TODO -> fixear
        //public UserClass? UpdateUser(GetUserDTO userDto)
        //{
        //    var user = _context.Users.Find(userDto.Id);
        //    if (user == null)
        //    {
        //        return null;
        //    }
        //    user.Username = userDto.Username;
        //    user.Email = userDto.Email;
        //    user.Location = userDto.Location;
        //    user.Role = userDto.Role;
        //    _context.SaveChanges();
        //    return user;

        //}



        public bool DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
            return true;
        }



        public IEnumerable<GetUserDTO> GetAllUsers()
        {
            return _context.Users.Select(u => new GetUserDTO(u)).ToList();
        }



        public GetUserDTO? GetUserById(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                return new GetUserDTO(user);
            }
            return null;
        }



        public GetUserRoleDTO? GetUserRole(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                return new GetUserRoleDTO(user.Id, user.Username, user.Role);

            }
            return null;
        }
    }

 }