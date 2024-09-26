using backend.DTOs;

namespace backend.Services
{
    public interface IRoomService
    {
        Task<RoomDTO> AddRoomAsync(RoomDTO roomDto);
        Task<RoomDTO> UpdateRoomAsync(RoomDTO roomDto);
        Task<bool> DeleteRoomAsync(int id);
        Task<List<RoomDTO>> GetAllRoomsAsync();
        Task<RoomDTO?> GetRoomByIdAsync(int id);
    }
}
