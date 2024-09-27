using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly ApiContext _context;



        public BookingService(IBookingRepository bookingRepository, IUserRepository userRepository, ApiContext context)
        {
            _bookingRepository = bookingRepository;
            _context = context;

        }


        public async Task<bool> AddBooking(List<AddBookingDTO> addBookingDTOs)
        {
            if (addBookingDTOs == null || !addBookingDTOs.Any())
            {
                throw new ArgumentException("La lista de reservas no puede estar vacía.");
            }

            // Llamar al método AddBooking para cada AddBookingDTO individualmente
            await _bookingRepository.AddBooking(addBookingDTOs);


            return true;
        }



        public bool DeleteBooking(int id)
        {
            // Valida que exista el booking y de no existir lanza excepcion y sale 
            var booking = _bookingRepository.GetBookingById(id);
            if (booking == null)
            {
                throw new KeyNotFoundException("No se ha encontrado la reserva.");
            }
            bool bookingDeleted = _bookingRepository.DeleteBooking(id);
            return bookingDeleted;
        }


        public Booking? GetBookingById(int id)
        {
            return _bookingRepository.GetBookingById(id);
        }

        public async Task<List<Booking>> GetBookingsByUsername(string username)
        {
            return await _bookingRepository.GetBookingsByUsername(username);
        }


        public List<Booking> GetBookingsForRoomAtTime(int roomId, DateTime startDate, DateTime endDate)
        {
            return _bookingRepository.GetBookingsForRoomAtTime(roomId, startDate, endDate).ToList();
        }

        //public Booking UpdateBooking(int id, AddBookingDTO updatedBooking)
        //{
        //    throw new NotImplementedException();
        //}



// Método para notificar al usuario
//private Notification NotifyUser(User user, Booking canceledBooking)
//{
//    if (user != null)
//    {
//        // Aquí se puede implementar el envío de un correo electrónico o notificación al usuario //ver si se usa
//        Console.WriteLine($"Notificación enviada a {user.Email}: Su reserva ha sido cancelada.");

//        //   var newNotification = new Notification(
//        //       canceledBooking.User,
//        //       description: ($"Tus reservas de id {canceledBooking.Id} ha sido cancelada debido a otra reserva de mayor prioridad",
//        //       bookingId: canceledBooking.Id,
//        //       createdDate: DateTime.Now

//        //);
//    }
//}

