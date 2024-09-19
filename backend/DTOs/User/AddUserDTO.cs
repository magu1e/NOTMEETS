namespace backend.DTOs.User
{
    public class AddUserDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }

        //public string Role { get; set; } setear rol por defecto????
    }
}
