import { Component } from '@angular/core';
import { Booking, Rooms } from '../bookings/bookings.component';
import { bookingsMock } from './bookingsMock';
import { roomsMock } from '../bookings/salasMock';
import { CommonModule } from '@angular/common';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {
  bookingsMock: Booking[] = bookingsMock;
  roomsMock: Rooms[] = roomsMock;

  //Obtener el nombre del Room a partir del roomId
  getRoomInfo(roomId: number) {
    const room = this.roomsMock.find(r => r.id === roomId);
    return room!;
  }

  getRoomName(roomId: number): string | undefined {
    const room = this.roomsMock.find(r => r.id === roomId);
    return room!.name;
  }


  //Obtiene la prioridad y la devuelve en string y con el color del badge
  getPriority(value: number) : any {
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

  formatDate(dbDate: string, timestamp?: boolean) {
    const date = parseISO(dbDate);
    let formattedDate = format(date, 'yyyy-MM-dd HH:mm') + 'hs';
    if (timestamp) {
      return date.getTime();
    }
    return formattedDate;
  }

}
