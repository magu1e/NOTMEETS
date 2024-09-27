using backend.Data;
using backend.DTOs;
using backend.Migrations;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace backend.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly ApiContext _context;
        public RoomRepository(ApiContext context)
        {
            _context = context;
        }

        public async Task<Room> AddRoom(RoomDTO roomDto)
        {
            Room room = new Room()
            {
                Name = roomDto.Name,
                Location = roomDto.Location,
                Capacity = roomDto.Capacity
            };
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
            return room;
        }

        public async Task<bool> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room != null)
            {
                _context.Rooms.Remove(room);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<List<RoomDTO>> GetAllRooms()
        {
            return await _context.Rooms
                .Include(r => r.Bookings)
                .Select(r => new RoomDTO
                {
                    Id = r.Id,
                    Name = r.Name,
                    Location = r.Location,
                    Capacity = r.Capacity,
                    Bookings = r.Bookings.Select(b => new AddBookingDTO
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
                })
                .ToListAsync();
        }


        public async Task<RoomDTO?> GetRoomById(int id)
        {
            var room = await _context.Rooms.Include(r => r.Bookings).ThenInclude(b => b.User).FirstOrDefaultAsync(r => r.Id == id);
            //var room = await _context.Rooms.Include(r => r.Bookings).Where(r => r.Id == id).Select(r => r).FirstOrDefaultAsync();
            if (room != null)
            {
                return new RoomDTO(
                    room.Id,
                    room.Name,
                    room.Location,
                    room.Capacity,
                    room.Bookings.Select(b => new AddBookingDTO
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




        public async Task<Room> UpdateRoom(RoomDTO roomDto)
        {
            var room = await _context.Rooms.FindAsync(roomDto.Id);
            if (room == null)
            {
                throw new KeyNotFoundException($"La sala con ID {roomDto.Id} no existe.");
            }

            room.Name = roomDto.Name;
            room.Location = roomDto.Location;
            room.Capacity = roomDto.Capacity;

            _context.Rooms.Update(room);
            await _context.SaveChangesAsync();
            return room;
        }
    }
}
