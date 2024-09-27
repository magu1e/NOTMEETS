import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService, ApiResponse } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { format, parseISO } from 'date-fns';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalService } from '../../shared/modal/modal.service';
import { AuthService } from '../../services/auth.service';


export interface Booking {
  id: number,
  roomId: number,
  startDate: string,
  endDate: string,
  username: string,
  priority: number,
  attendees: number,
  timestamp: number
}

export interface Rooms {
  id: number,
  name: string,
  location: number,
  capacity: number,
  bookings: Booking[],
  [key: string]: any //Permite incluir props nuevas al obj
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FormsModule, ModalComponent],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})


export class BookingsComponent {
  rooms: Rooms[] = [];

  //Filtros
  roomFilters!: FormGroup;
  booking!: FormGroup;
  currentDate = format(new Date(), 'yyyy-MM-dd')
  initialFilterValues!: any;

  //Seleccion de salas
  selectedRooms: Rooms[] = [];
  filteredRooms = [...this.rooms]; //Inicialmente muestra en la tabla todas las salas
  roomsSelected = false;

  //Seleccion de horarios
  schedules = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  //Booking
  invalidBooking: string | null = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private modalService: ModalService, private authService: AuthService) {
    this.roomFilters = this.formBuilder.group({
      date: this.currentDate,
      startTime: '',
      endTime: '',
      capacity: '',
    });

    this.booking = this.formBuilder.group({
      priority: 1,
    });
  }

  ngOnInit() {
    //Valida que este logueado y redirige automaticamente a bookings
    if (this.authService.isAuthenticated()) {
      this.authService.redirect(['/bookings'])
    }
    this.initialFilterValues = this.roomFilters.value;
    this.getAllRooms();
  }

  selectionPropsInit() {
    this.rooms.forEach((room) => {
      room['selectedDate'] = this.currentDate;
      room['selectedStartTime'] = '09:00';
      room['selectedEndTime'] = '';
      room['selected'] = false;
      room['filteredStartSchedules'] = [...this.schedules];
      room['filteredEndSchedules'] = [...this.schedules];
    });
  }




  // ROOMS
  //Obtener la lista de rooms
  getAllRooms() {
    this.apiService.getAllRoomsRequest().subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.rooms = response.body;
        this.selectionPropsInit();
        this.filterRooms();
      } else {
        console.log(response);
      }
    })
  }


  filterRooms() {
    //Ordena segun filtros
    this.sortRooms();
    //Setea la fecha actual, si no filtra por fecha
    this.rooms.forEach(room => {
      room['selectedDate'] = this.roomFilters.get('date')?.value || this.currentDate;
    });
  }

  //Limpiar los roomFilters
  restoreInitialFilters() {
    this.roomFilters.setValue(this.initialFilterValues);
    this.sortByConflictOrCapacity();
  }

  //Ordena las salas segun conflictos, y de no tener segun capacidad
  sortByConflictOrCapacity() {
    this.rooms.sort((a, b) => {
      // Compara el número de conflictos
      if (a['conflicts'] !== b['conflicts']) {
        return a['conflicts'] - b['conflicts']; // Menor número de conflictos primero
      }
      // Si ambos tienen el mismo número de conflictos, ordena por capacidad
      const selectedCapacity = this.roomFilters.get('capacity')?.value || 0; // Valor por defecto 0 si no se establece capacidad
      return Math.abs(a.capacity - selectedCapacity) - Math.abs(b.capacity - selectedCapacity);
    });
  }

  //Formatea fecha de la db: "2024-10-18T09:00:40.542Z" -> "2024-10-18 09:00" y obtiene timestamp
  formatDate(dbDate: string, timestamp: boolean) {
    const date = parseISO(dbDate);
    let formattedDate = format(date, 'yyyy-MM-dd HH:mm');
    if (timestamp) {
      return date.getTime();
    }
    return formattedDate;
  }

  sortRooms() {
    const { date, startTime, endTime } = this.roomFilters.value;
    const startTimestamp = this.formatDate(`${date} ${startTime}`, true)
    const endTimestamp = this.formatDate(`${date} ${endTime}`, true)

    this.rooms = this.rooms.map(room => {
      const conflictingBookings = room.bookings.filter(booking => {
        const bookingStartTimestamp = this.formatDate(booking.startDate, true)
        const bookingEndTimestamp = this.formatDate(booking.endDate, true)
        // Comparación de fecha y hora en timestamps
        return (
          (startTimestamp >= bookingStartTimestamp && startTimestamp < bookingEndTimestamp) || // Si el inicio está dentro del rango del booking
          (endTimestamp > bookingStartTimestamp && endTimestamp <= bookingEndTimestamp) || // Si el final está dentro del rango del booking
          (startTimestamp <= bookingStartTimestamp && endTimestamp >= bookingEndTimestamp) // Si el horario seleccionado engloba una reserva completa
        );
      });
      //Devuelve los room con el numero de conflicts
      return { ...room, conflicts: conflictingBookings.length };
    });
    this.sortByConflictOrCapacity();
    console.log('Salas ordenadas')
  }



  // SELECT ROOMS/TIME VALIDATIONS
  // Recorta opciones superiores al horario de fin
  updateStartOptions(room: Rooms, hour: string) {
    const endIndex = this.schedules.indexOf(hour);
    return room['filteredStartSchedules'] = this.schedules.slice(0, endIndex + 1);
  }

  // Recorta opciones anteriores a la hora de inicio
  updateEndOptions(room: Rooms, hour: string) {
    const startIndex = this.schedules.indexOf(hour);
    return room['filteredEndSchedules'] = this.schedules.slice(startIndex);
  }

  //Logica para seleccionar horarios en el dropdown
  selectTime(room: Rooms, time: string, hour: string) {
    let startTime = room['selectedStartTime'];
    let endTime = room['selectedEndTime'];
    if (time === 'start') {
      room['selectedStartTime'] = hour; // Actualiza el horario de inicio seleccionado
      return this.updateEndOptions(room, hour);
    } else {
      room['selectedEndTime'] = hour; // Actualiza el horario de fin seleccionado

      //Valida que la startTime no sea superior a endTime (como se recortan las opciones solo pasa cuando startTime y enDate son iguales)
      if (startTime && endTime && startTime >= endTime) {
        console.log('La fecha de inicio debe ser superior a la de fin')
        //this.toastService.showToast('La hora de inicio no puede ser igual a la de fin', 'error'); // TODO -> Implementar toast
      }
      return this.updateStartOptions(room, hour);
    }
  }

  //Updatea lista de salas elegidas para la reserva
  updatePreBooking(room: Rooms) {
    if (room['selected']) {
      this.selectedRooms.push(room);
    } else {
      // Arma un nuevo array de selectedRooms excluyendo a las salas que no sean room['selected']
      this.selectedRooms = this.selectedRooms.filter(item => item.id !== room.id);
    }
    // Verifica si hay eleementos en selectedRooms para devolver true/false en roomsSelected
    this.roomsSelected = this.selectedRooms.length > 0;
    console.log(this.selectedRooms);
  }

  //Resetea seleccion
  clearSelections() {
    this.selectedRooms = [];
    this.roomsSelected = false;
    this.selectionPropsInit()
    this.sortRooms();
    console.log('Seleccion disuelta')
  }





  //BOOKING
  openModalBooking() {
    this.resetBookingForm();
    this.modalService.openModal('modalBooking');
  }

  closeModalBooking() {
    this.resetBookingForm();
    this.modalService.closeModal('modalBooking')
  }

  //Reset form prioridad y errores
  resetBookingForm() {
    setTimeout(() => {
      this.invalidBooking = null;
      this.booking.get('priority')?.reset(1);
    }, 150)
  }

  //Devuelve la fecha a formato ISO para enviar al back
  toFormatISO = (date: string, time: string) => {
    const mergedDateTime = `${date}T${time}`;
    const dateObject = new Date(mergedDateTime + 'Z'); // Ajusta zona horaria UTC
    return new Date(dateObject).toISOString();
  };

  //Obtiene usuario guardado en localstorage
  getLoggedInUser() {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    return { username, role };
  }

  setRequest(rooms: Rooms[]) {
    let newBookings: any[] = [];

    const priority = this.booking.get('priority')!.value;
    const attendees = this.roomFilters.get('capacity')?.value | 1;

    // Obtiene timesatmp para relacionar todas las reservas de un mismo evento
    let timestamp = new Date().getTime()
    rooms.map(room => {

      const formattedStartDate = this.toFormatISO(room['selectedDate'], room['selectedStartTime']);
      const formattedEndDate = this.toFormatISO(room['selectedDate'], room['selectedEndTime']);

      newBookings.push(
        {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          username: this.getLoggedInUser().username,
          roomId: room.id,
          priority: priority,
          attendees: attendees,
          timestamp: timestamp
        })
    });
    console.log(newBookings)
    return newBookings;
  }

  addBookings() {
    const newBookings = this.setRequest(this.selectedRooms);
    console.log(newBookings)
    this.apiService.addBookingRequest(newBookings)
      .subscribe({
        next: (response: ApiResponse) => {
          if (response.status === 200) {
            console.log('Reserva creada exitosamente', response.status);
            this.modalService.closeModal('modalBooking');
            this.clearSelections();
          }
        },
        error: (error) => {
          console.error(error.message);
          this.invalidBooking = error.message;
        }
      });
  }
}