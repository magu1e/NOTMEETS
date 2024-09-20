namespace backend.DTOs.User
{
    public class GetUserRoleDTO
    {
        public int Id { get; }
        public string Username { get; set; }
        public string Role { get; set; }


        public GetUserRoleDTO(int id, string username, string role)
        {
            Id = id;
            Username = username;
            Role = role;
        }
    }
}
