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
  //roomsMock = roomsMock; // guardar la peticion del back cuando este
  roomsMock: Rooms[] = roomsMock;
  roomFilters!: FormGroup;
  schedules = ['09:00hs','10:00hs','11:00hs','12:00hs','13:00hs','14:00hs','15:00hs','16:00hs','17:00hs','18:00hs']
  selectedRooms: Rooms[] = [];


  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.roomFilters = this.formBuilder.group({
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
    });
    this.addSelectedTimeToRooms() 
  }

  //Filtros
  // getValues() {
  //   this.searchRooms.get('date')?.valueChanges.subscribe((valor) => {
  //   })
  // }


  //Actualiza el valor del horario elegido en el dropdown
  selectTime(room: Rooms, time:string, hour: string) {
      if (time === 'start') {
        return room['selectedStartTime'] = hour;
      } else {
        return room['selectedEndTime'] = hour;
      }
  }

  // Agrega selectedStartTime y selectedEndTime a la sala para manejar los desplegables
  addSelectedTimeToRooms() {
    this.roomsMock.forEach((room) => {
      room['selectedStartTime'] = '9:00hs';
      room['selectedEndTime'] = '9:00hs';
      console.log(room['selectedStartTime'])
      console.log(room['selectedEndTime'])
    });
  }

  // addRoomToBooking(room: Rooms) {
  //   this.selectedRooms.push(room)
  //   console.log(this.selectedRooms);
  // }

  onSubmit() {
  };

}
