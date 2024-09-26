using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface IBookingService
    {
        Task<bool> AddBooking(List<AddBookingDTO> addBookingDTO);
        //IEnumerable<Booking> GetBookingsForRoom(int roomId);
        Booking? GetBookingById(int id);
        //void CancelBooking(int id);
        //Booking UpdateBooking(int id, AddBookingDTO updatedBooking);
        bool DeleteBooking(int id);
        List<Booking> GetBookingsForRoomAtTime(int roomId, DateTime startDate, DateTime endDate);
        Task<List<Booking>> GetBookingsByUsername(string username);
    }
}
