using backend.DTOs;
using backend.Repositories;

namespace backend.Services
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;

        public RoomService(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }

        public async Task<RoomDTO> AddRoomAsync(RoomDTO roomDto)
        {
            var room = await _roomRepository.AddRoom(roomDto);
            return new RoomDTO
            {
                Id = room.Id,
                Name = room.Name,
                Location = room.Location,
                Capacity = room.Capacity
            };
        }

        public async Task<bool> DeleteRoomAsync(int id)
        {
            // Validaciones ??
            return await _roomRepository.DeleteRoom(id);
        }

        public async Task<List<RoomDTO>> GetAllRoomsAsync()
        {
            return await _roomRepository.GetAllRooms();
        }

        public async Task<RoomDTO?> GetRoomByIdAsync(int id)
        {
            var room = await _roomRepository.GetRoomById(id);
            if (room == null)
            {
                return null;
            }
            return room;
        }



        //public UserDTO GetUserById(int id)
        //{
        //    var user = _userRepository.GetUserById(id);
        //    if (user == null)
        //    {
        //        throw new KeyNotFoundException("No se ha encontrado el usuario.");
        //    }
        //    return user;
        //}



        //public IEnumerable<UserDTO> GetAllUsers()
        //{
        //    var users = _userRepository.GetAllUsers();
        //    if (!users.Any())
        //    {
        //        throw new KeyNotFoundException("No hay usuarios cargados.");
        //    }
        //    return users;
        //}






        public async Task<RoomDTO> UpdateRoomAsync(RoomDTO roomDto)
        {
            //Validaciones ??
            var updatedRoom = await _roomRepository.UpdateRoom(roomDto);
            return new RoomDTO
            {
                Id = updatedRoom.Id,
                Name = updatedRoom.Name,
                Location = updatedRoom.Location,
                Capacity = updatedRoom.Capacity
            };
        }
    }
}
