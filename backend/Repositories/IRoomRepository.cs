using backend.DTOs;
using backend.Models;

namespace backend.Repositories
{
    public interface IRoomRepository
    {

        Task<Room> AddRoom(RoomDTO roomDto);
        Task<Room> UpdateRoom(RoomDTO roomDto);
        Task<bool> DeleteRoom(int id);
        Task<List<RoomDTO>> GetAllRooms();
        Task<RoomDTO?> GetRoomById(int id);

    }
}
