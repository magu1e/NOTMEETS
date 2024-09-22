import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { roomsMock } from './salasMock.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { parse, format } from 'date-fns';


interface Rooms {
  id: number,
  name: string,
  location: number,
  capacity: number,
  bookings: object[]
  [key: string]: any
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
  roomsMock: Rooms[] = roomsMock;
  roomFilters!: FormGroup;
  selectedRooms: Rooms[] = [];
  schedules = ['09:00hs', '10:00hs', '11:00hs', '12:00hs', '13:00hs', '14:00hs', '15:00hs', '16:00hs', '17:00hs', '18:00hs'];
  filteredEndSchedules: string[] = [...this.schedules];
  filteredStartSchedules: string[] = [...this.schedules];


  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.roomFilters = this.formBuilder.group({
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
    });

    this.roomsMock.forEach((room) => {
      room['selectedStartTime'] = '';
      room['selectedEndTime'] = '';
    });
  }


  // Recorta opciones superiores al horario de fin
  updateStartOptions(hour: string) {
    const endIndex = this.schedules.indexOf(hour);
    return this.filteredStartSchedules = this.schedules.slice(0, endIndex + 1);
  }

  // Recorta opciones anteriores a la hora de inicio
  updateEndOptions(hour: string) {
    const startIndex = this.schedules.indexOf(hour);
    return this.filteredEndSchedules = this.schedules.slice(startIndex);
  }

  selectTime(room: Rooms, time: string, hour: string) {
    let startDate = room['selectedStartTime'];
    let endDate = room['selectedEndTime'];
    if (time === 'start') {
      room['selectedStartTime'] = hour; // Actualiza el horario de inicio seleccionado
      return this.updateEndOptions(hour); 
    } else {
      room['selectedEndTime'] = hour; // Actualiza el horario de fin seleccionado

      //Valida que la startDate no sea superior a endDate (como se recortan las opciones solo pasa cuando startDate y enDate son iguales)
      if (startDate && endDate && startDate >= endDate) { 
        console.log('La fecha de inicio debe ser superior a la de fin')
        //this.toastService.showToast('La hora de inicio no puede ser igual a la de fin', 'error'); //Implementar toast
      }
      return this.updateStartOptions(hour);
    }
  }

  addRoomToBooking(room: Rooms) {
    console.log(this.selectedRooms);
    return this.selectedRooms.push(room);
  }

  onSubmit() {
  }
}