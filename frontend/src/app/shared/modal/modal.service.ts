import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: { [key: string]: BehaviorSubject<boolean> } = {};

  // Registrar un modal con un ID único
  registerModal(id: string) {
    if (!this.modals[id]) {
      this.modals[id] = new BehaviorSubject<boolean>(false);
    }
  }

  // Abrir un modal específico
  openModal(id: string) {
    if (this.modals[id]) {
      this.modals[id].next(true);
    }
  }

  // Cerrar un modal específico
  closeModal(id: string) {
    if (this.modals[id]) {
      this.modals[id].next(false);
    }
  }

  unregisterModal(id: string) {
    if (this.modals[id]) {
      delete this.modals[id];
    }
  }

  // Obtener el estado del modal (abierto o cerrado)
  getModalState(id: string) {
    return this.modals[id]?.asObservable();
  }
}
