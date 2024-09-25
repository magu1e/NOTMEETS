using backend.Models;

namespace backend.Repositories
{
    public interface IBookingRepository
    {
        Booking AddBooking(Booking booking);
        Task<Booking> GetBookingById(int id);
        Task<IEnumerable<Booking>> GetBookingsByRoomId(int roomId);
        Task<Booking> UpdateBooking(Booking booking);
        Task<bool> DeleteBooking(int id);
        IEnumerable<Booking> GetBookingsForRoomAndTime(int roomId, DateTime startDate, DateTime endDate);
    }
}
