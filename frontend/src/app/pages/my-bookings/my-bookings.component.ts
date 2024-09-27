import { Component } from '@angular/core';
import { Booking, Rooms } from '../bookings/bookings.component';
import { CommonModule } from '@angular/common';
import { format, parseISO } from 'date-fns';
import { ApiResponse, ApiService } from '../../services/api.service';
import { ModalService } from '../../shared/modal/modal.service';
import { ModalComponent } from '../../shared/modal/modal.component';


@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})


export class MyBookingsComponent {
  bookings: Booking[] = [];
  rooms: Rooms[] = [];
  bookingsLoading: boolean = false;
  
  selectedBooking: Booking | null = null;
  selectedBookingRoomName?: string | null = null;

  loggedInUserBookings?: Booking[] | null = null;


  constructor(private apiService: ApiService, private modalService: ModalService) { }


  ngOnInit() {
    const user = this.getLoggedInUser();
    this.getUserBookings(user.username!);
    this.getAllRooms();
    this.loadBookings();
  };

  //Obtiene usuario guardado en localstorage
  getLoggedInUser() {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    return { username, role };
  }


  //Obtiene la lista de rooms
  getAllRooms() {
    this.apiService.getAllRoomsRequest().subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.rooms = response.body;
      } else {
        console.log(response);
      }
    })
  }

  //Obtiene la lista de bookings
  getUserBookings(user: string) {
    this.apiService.getBookingsByUsernameRequest(user).subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.bookings = response.body;
      } else {
        console.log(response);
      }
    })
  }

  //Obtiene el nombre del Room a partir del roomId
  getRoomInfo(roomId: number) {
    const room = this.rooms.find(r => r.id === roomId);
    return room ? room : null;
  }

  getRoomName(roomId: number): string | undefined {
    const room = this.rooms.find(r => r.id === roomId);
    return room ? room.name : undefined;
  }


  cancelBooking(bookingId: number) {
    this.apiService.deleteBookingRequest(bookingId).subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 200) {
          this.loadBookings(); // Vuelve a cargar las reservas después de eliminar
          this.clearSelectedBooking();
          this.closeModal('deleteBookingModal');
          console.log('Reserva cancelada con éxito.')
        } else {
          console.log(response);
        }
      },
      error: (error) => {
        console.error('Error al cancelar la reserva:', error);
      }
    });
  }

  loadBookings() {
    this.bookingsLoading = true;
    this.getUserBookings(this.getLoggedInUser().username!);
  }

  clearSelectedBooking() {
    this.selectedBooking = null
  }

  //Obtiene la prioridad y la devuelve en string y con el color del badge
  getPriority(value: number): any {
    let label = '';
    let className = '';

    switch (value) {
      case 1:
        label = 'Prioridad baja';
        className = 'bg-dark';
        break;
      case 2:
        label = 'Prioridad media';
        className = 'bg-misc';
        break;
      case 3:
        label = 'Prioridad alta';
        className = 'bg-accent';
        break;
    }

    return { label, className };
  }

  //Modal
  openModalCancelBooking(booking: Booking) {
    this.selectedBooking = booking; // Guarda el usuario seleccionado
    this.selectedBookingRoomName = this.getRoomName(booking.roomId);
    this.modalService.openModal('deleteBookingModal');
  }

  //Modals
  closeModal(id: string) {
    this.modalService.closeModal(id);
  }


  formatDate(dbDate: string, timestamp?: boolean) {
    const date = parseISO(dbDate);
    let formattedDate = format(date, 'yyyy-MM-dd HH:mm') + 'hs';
    if (timestamp) {
      return date.getTime();
    }
    return formattedDate;
  }

}
