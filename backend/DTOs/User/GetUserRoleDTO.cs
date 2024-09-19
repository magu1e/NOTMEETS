namespace backend.DTOs.User
{
    public class GetUserRoleDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }


        public GetUserRoleDTO(string username, string role)
        {
            Username = username;
            Role = role;
        }
    }
}
