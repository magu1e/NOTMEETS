using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

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
        public IActionResult UserAuth([FromBody] UserDTO userDto)
        {
            if (userDto == null)
            {
                return BadRequest(new { message = "Datos de usuario inválidos." });
            }

            var user = _userService.UserAuth(userDto);

            if (user != null )
            {
                return Ok( new { message = "Autenticacion exitosa.", user });
            }
            else
            {
                return Unauthorized(new { message = "No existe el usuario o los datos incorrectos." });
            }
        }



        [HttpPost("register")]
        public IActionResult AddUser([FromBody] UserDTO userDto)
        {
            if (userDto == null)
            {
                return BadRequest(new { message = "Datos de usuario inválidos." });
            }

            try
            {
                User user = _userService.AddUser(userDto);              
                return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user); // Indica que la operacion fue exitosa y devuelve el usuario creado
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("update")]
        public IActionResult Update([FromBody] UserDTO userDto)
        {
            if (userDto == null)
            {
                return BadRequest("Datos de usuario inválidos.");
            }

            try
            {
                _userService.UpdateUser(userDto);
                return Ok(new { message = "Datos del usuario actualizados." });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }



        [HttpDelete("delete/{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _userService.DeleteUser(id);
                return Ok(new { message = "Usuario eliminado" });
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



        [HttpGet("{id:int}")]
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



        [HttpGet("role/{id:int}")]
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
