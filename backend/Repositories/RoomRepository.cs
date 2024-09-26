using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

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
                    RoomId = r.Id,
                    Name = r.Name,
                    Location = r.Location,
                    Capacity = r.Capacity
                    // Agregar Bookings si es necesario .Include(r => r.Bookings) antes del select
                })
                .ToListAsync();
        }

        public async Task<Room?> GetRoomById(int id)
        {
            return await _context.Rooms
                .Include(r => r.Bookings) // No se si son necesarias aca, pero asi se haría en el método anterior
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Room> UpdateRoom(RoomDTO roomDto)
        {
            var room = await _context.Rooms.FindAsync(roomDto.RoomId);
            if (room == null)
            {
                throw new KeyNotFoundException($"Room with ID {roomDto.RoomId} not found.");
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
