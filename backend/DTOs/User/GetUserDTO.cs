﻿using System.Data;
using UserClass = backend.Models.User;

namespace backend.DTOs.User
{
    public class GetUserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public string Role { get; set; }

        //public List<Reservation> Reservations { get; set; }
        public GetUserDTO(UserClass user)
        {
            Username = user.Username;
            Email = user.Email;
            Location = user.Location;
            Role = user.Role;
        }
    }
}
