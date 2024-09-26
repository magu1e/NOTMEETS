using backend.DTOs;
using backend.Models;

namespace backend.Repositories
{
    public interface IBookingRepository
    {
        Task<bool> AddBooking(List<AddBookingDTO> addBookingDTO);
        Booking? GetBookingById(int id);
        //Task<IEnumerable<Booking>> GetBookingsByRoomId(int roomId);
        //Task<Booking> UpdateBooking(Booking booking);
        bool DeleteBooking(int id);
        List<Booking> GetBookingsForRoomAtTime(int roomId, DateTime startDate, DateTime endDate);
    }
}
