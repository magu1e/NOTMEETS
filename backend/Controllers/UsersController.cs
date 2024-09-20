using backend.DTOs.User;
using backend.Services.User;
using Microsoft.AspNetCore.Mvc;
using UserClass = backend.Models.User;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("auth")]
        public IActionResult UserAuth([FromBody] AuthUserDTO userDto)
        {
            if (userDto == null)
            {
                return BadRequest(new { message = "Datos de usuario inválidos." });
            }

            var isAuthenticated = _userService.UserAuth(userDto);

            if (isAuthenticated)
            {
                return Ok( new { message = "Autenticacion exitosa." });
            }
            else
            {
                return Unauthorized(new { message = "No existe el usuario o los datos incorrectos." });
            }
        }



        [HttpPost("register")]
        public IActionResult AddUser([FromBody] AddUserDTO userDto)
        {
            if (userDto == null)
            {
                return BadRequest("Datos de usuario inválidos.");
            }

            try
            {
                UserClass user = _userService.AddUser(userDto);              
                return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user); // Indica que la operacion fue exitosa y devuelve el usuario creado
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //TODO -> fixear
        //[HttpPut("update")]
        //public IActionResult Update([FromBody] GetUserDTO userDto)
        //{
        //    if (userDto == null)
        //    {
        //        return BadRequest("Datos de usuario inválidos.");
        //    }

        //    try
        //    {
        //        _userService.UpdateUser(userDto);
        //        return NoContent(); // Indica que la operacion fue exitosa pero no devuelve nada
        //    }
        //    catch (KeyNotFoundException ex)
        //    {
        //        return NotFound(ex.Message);
        //    }
        //}



        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _userService.DeleteUser(id);
                return Ok("Usuario eliminado");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }



        [HttpGet("all")]
        public IActionResult GetAllUsers()
        {
            try
            {
                var users = _userService.GetAllUsers();
                return Ok(users);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
       
        }



        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            try
            {
                var user = _userService.GetUserById(id);
                return Ok(user);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }



        [HttpGet("role/{id}")]
        public IActionResult GetUserRole(int id)
        {
            try
            {
                var userRole = _userService.GetUserRole(id);
                return Ok(userRole);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
