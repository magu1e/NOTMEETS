using backend.Models;

namespace backend.Repositories
{
    public interface IBookingRepository
    {
        List<Booking> GetBookingsForRoomAndTime(int roomId, DateTime startDate, DateTime endDate);
        Booking AddBooking(Booking booking);
        void DeleteBooking(int id);
        Booking GetBookingById(int id);
    }
}
