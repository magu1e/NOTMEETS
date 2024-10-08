﻿using backend.Data;
using backend.DTOs;
using backend.Models;
using System.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApiContext _context;

        // Constructor para inyectar el contexto de base de datos
        public UserRepository(ApiContext context)
        {
            _context = context;

        }


        public object? UserAuth(UserDTO userDto)
        {
            User? user = _context.Users.FirstOrDefault(u => u.Username == userDto.Username && u.Password == userDto.Password);
            if (user == null)
            {
                return null;
            }
            return new
            {
                id = user.Id,
                username = user.Username,
                email = user.Email,
                location = user.Location,
                role = user.Role
            };
        }



        public User? AddUser(UserDTO userDto)
        {
            var user = new User
             (
                username: userDto.Username!,
                password: userDto.Password!,
                email: userDto.Email!,
                location: userDto.Location!,
                role: userDto.Role ?? "user"
            );
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }


        public User UpdateUser(UserDTO userDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userDto.Id);
            if (user == null)
            {
                throw new KeyNotFoundException("Usuario no encontrado.");
            }

            // Actualiza las propiedades del usuario con los datos de UserDTO
            user.Username = userDto.Username;
            user.Email = userDto.Email;
            user.Location = userDto.Location;
            user.Role = userDto.Role;

            _context.SaveChanges();
            return user;
        }


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



        public IEnumerable<UserDTO> GetAllUsers()
        {
            return _context.Users
                .Include(u => u.Bookings) // Incluye las reservas asociadas
                .Select(u => new UserDTO
                (
                    u,
                    u.Bookings.Select(b => new AddBookingDTO
                    (
                        b.Id,
                        b.StartDate,
                        b.EndDate,
                        b.RoomId,
                        b.User.Username,
                        b.Attendees,
                        b.Priority,
                        b.Timestamp
                    )).ToList()
                ))
                .ToList();
        }

        public UserDTO? GetUserById(int id)
        {
            var user = _context.Users.Include(u => u.Bookings).FirstOrDefault(u => u.Id == id);

            if (user != null)
            {
                return new UserDTO(
                    user,
                    user.Bookings.Select(b => new AddBookingDTO
                    (
                        b.Id,
                        b.StartDate,
                        b.EndDate,
                        b.RoomId,
                        b.User.Username,
                        b.Attendees,
                        b.Priority,
                        b.Timestamp
                    )).ToList()
                );
            }

            return null;
        }



        public UserDTO? GetUserRole(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                return new UserDTO(user.Id, user.Username, user.Role);

            }
            return null;
        }

        public User? GetUserByUsername(string username)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            return user;
        }
    }

}