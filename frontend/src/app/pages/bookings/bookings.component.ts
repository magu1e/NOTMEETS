import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { roomsMock } from './salasMock.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService, ApiResponse } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { parse, format } from 'date-fns';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalService } from '../../shared/modal/modal.service';
import { AuthService } from '../../services/auth.service';


export interface Booking {
  id: number;
  room: number;
  startDate: string;
  endDate: string;
  user: string;
  priority: number;
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
  roomsMock: Rooms[] = roomsMock;

  //Filtros
  roomFilters!: FormGroup;
  booking!:FormGroup;
  currentDate = format(new Date(), 'yyyy-MM-dd')

  //Seleccion de salas
  selectedRooms: Rooms[] = [];
  roomsSelected = false;

  //Seleccion de horarios
  schedules = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  //Booking

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private modalService: ModalService, private authService: AuthService) {
    this.roomFilters = this.formBuilder.group({
      date: this.currentDate,
      startTime: '',
      endTime: '',
      capacity: '',
    });

    this.booking = this.formBuilder.group({
      priority: 3,
    });
    
    this.selectionPropsInit()
  }
  
  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.authService.redirect(['/bookings'])
    }
    this.filterRooms();
  }

  selectionPropsInit(){
    this.roomsMock.forEach((room) => {
      room['selectedDate'] = this.currentDate;
      room['selectedStartTime'] = '09:00';
      room['selectedEndTime'] = '';
      room['selected'] = false;
      room['filteredStartSchedules'] = [...this.schedules];
      room['filteredEndSchedules'] = [...this.schedules];
    });
  }
  

filterRooms() {
  //Ordena segun filtros
  this.sortRooms();
  //Setea la fecha actual, si no filtra por fecha
  this.roomsMock.forEach( room => {
    room['selectedDate'] = this.roomFilters.get('date')?.value || this.currentDate;;
  });
}


  // SORT ROOMS
  //Ordenar las salas segun conflictos, y de no tener segun capacidad
  sortByConflictOrCapacity() {
    this.roomsMock.sort((a, b) => {
      const selectedCapacity = this.roomFilters.get('capacity')?.value;
      if (a['conflicts'] === b['conflicts']) { //si ninguno tiene conflictos se fija en la capacidad
        return Math.abs(a['capacity'] - selectedCapacity) - Math.abs(b['capacity'] - selectedCapacity);
      }
      return a['conflicts'] - b['conflicts'];
    });
  }

  // Pasa a formato Date y obtiene el timestamp
  getTimeStamp(date: any) {
    return parse(date, 'yyyy-MM-dd HH:mm', new Date()).getTime();
  }

  sortRooms() {
    console.log(this.roomsMock)
    const { date, startTime, endTime } = this.roomFilters.value;
    const startTimestamp = this.getTimeStamp(`${date} ${startTime}`)
    const endTimestamp = this.getTimeStamp(`${date} ${endTime}`)

    this.roomsMock = this.roomsMock.map(room => {
      const conflictingBookings = room.bookings.filter(booking => {
        const bookingStartTimestamp = this.getTimeStamp(booking.startDate)
        const bookingEndTimestamp = this.getTimeStamp(booking.endDate)
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
    console.log(this.roomsMock);
  }



  // TIME VALIDATIONS
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
    console.log(room)
    if (time === 'start') {
      room['selectedStartTime'] = hour; // Actualiza el horario de inicio seleccionado
      return this.updateEndOptions(room, hour);
    } else {
      room['selectedEndTime'] = hour; // Actualiza el horario de fin seleccionado

      //Valida que la startTime no sea superior a endTime (como se recortan las opciones solo pasa cuando startTime y enDate son iguales)
      if (startTime && endTime && startTime >= endTime) {
        console.log('La fecha de inicio debe ser superior a la de fin')
        //this.toastService.showToast('La hora de inicio no puede ser igual a la de fin', 'error'); //Implementar toast
      }
      return this.updateStartOptions(room, hour);
    }
  }






  //BOOKING
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
    console.log('Seleccion disuelta')
    console.log(roomsMock)
  }



  formatDateTime = (date: string, time: string) => {
      const mergedDateTime = `${date} ${time}`;
      return format(new Date(mergedDateTime), 'yyyy-MM-dd HH:mm');
  };
  

  //Obtiene usuario guardado en localstorage
  getLoggedInUser() {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    return {username, role};
  }
  
  setRequest(rooms: Rooms[], priority: number) {
    let newBookings: any[] = [];
    rooms.map( room => {
      
      const formattedStartDate = this.formatDateTime(room['selectedDate'], room['selectedStartTime']);
      const formattedEndDate = this.formatDateTime(room['selectedDate'], room['selectedEndTime']);

      newBookings.push(
        {
          startDate: formattedStartDate, 
          endDate: formattedEndDate, 
          user: this.getLoggedInUser(),
          priority: priority,
          room: room.id
        })
       console.log(newBookings)
      return newBookings; 
    });
  }

  makeBookings() {
    const priority = this.booking.get('priority')!.value;
    this.setRequest(this.selectedRooms, priority);
    // this.apiService.makeBookingRequest(rooms) //TODO ENVIAR JSON FINAL POR PARAMS
    //   .subscribe((response: ApiResponse) => {
    //     if (response.status === 201) { // Manejo de respuesta exitosa
    //       console.log('Reserva creada exitosamente', response.status);
    //       //toast success // redirect mis reservas?
    //     } else { // Manejo de error
    //       //toast error -> horarios elegidos ocupados
    //       //this.invalidBooking = response.error;
    //       ;
    //     }
    //   });
    this.modalService.closeModal('modalBooking');
  }
}



  // Mando la lista de salas a reservar,
  // en la consulta del repository a la base devuelve una lista de todas las salas con los bookings creados de cada una,
  // en el service valido que en la response la fecha + rango horario entre startTime y endTime de los bookings, ninguno se pise con la fecha + rango horario que envie
  // los que tengan horarios superpuestos los separo en un array y comparo las prioridades de esos bookings con los de la request: 
  // caso 1: si es mas alta la prioridad de la request asigno ese booking a la sala, cancelo el previo y disparo la notificacion al usuario del booking cancelado
  // caso 2: si es mas baja o igual prioridad, devuelvo excepcion + objeto sala + booking/s causantes del error 
  // de no superponerse hago el add/save de la reserva en la base y devuelvo OK
