import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // Estado del modal -> false indica que está cerrado
  private isModalVisibleSubject = new BehaviorSubject<boolean>(false);
  isModalVisible$ = this.isModalVisibleSubject.asObservable();

  // Abrie el modal
  openModal() {
    this.isModalVisibleSubject.next(true);
  }

  // Cerrar el modal
  closeModal() {
    this.isModalVisibleSubject.next(false);
  }

  // Confirmar la acción y luego cerrar el modal
  confirmModal() {
    this.isModalVisibleSubject.next(false);
  }
}
