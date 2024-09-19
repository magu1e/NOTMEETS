using backend.DTOs.User;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

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
                return BadRequest("Datos de usuario inválidos.");
            }

            var isAuthenticated = _userService.UserAuth(userDto);

            if (isAuthenticated)
            {
                return Ok("Autenticacion exitosa.");
            }
            else
            {
                return Unauthorized("Ha fallado la autenticación");
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
                _userService.AddUser(userDto);
                return CreatedAtAction(nameof(GetUserById), new { id = userDto.Id }, userDto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //hasta aca

        [HttpPut("update")]
        public IActionResult Update([FromBody] GetUserDTO userDto)
        {
            if (userDto == null)
            {
                return BadRequest("Invalid user data.");
            }

            try
            {
                _userService.UpdateUser(userDto);
                return NoContent(); // No content to return after successful update
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }



        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _userService.DeleteUser(id);
                return NoContent(); // No content to return after successful deletion
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }



        [HttpGet("all")]
        public IActionResult GetAllUsers()
        {
            var users = _userService.GetAllUsers();
            return Ok(users);
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
