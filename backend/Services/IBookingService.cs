using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface IBookingService
    {
        Booking CreateBooking(NewbookingDTO newBookingDTO);
        List<Booking> GetBookingsForRoom(int roomId);
        Booking GetBookingById(int id);
        void CancelBooking(int id);
    }
}
