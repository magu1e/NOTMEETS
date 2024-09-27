import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Rooms } from '../bookings/bookings.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiResponse, ApiService } from '../../services/api.service';
import { ModalService } from '../../shared/modal/modal.service';
import { ModalComponent } from '../../shared/modal/modal.component';


@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  rooms!: Rooms[];
  roomsLoading: boolean = false;

  editRoomForm!: FormGroup;
  selectedRoom: Rooms | null = null;

  addRoomForm!: FormGroup;
  invalidForm?: string | null = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private modalService: ModalService) {
    this.editRoomForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['1'],
      capacity: ['1', [Validators.required]],
    })

    this.addRoomForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['1'],
      capacity: ['1', [Validators.required]],
    })
  };

  ngOnInit() {
    //Request lista de rooms
    this.loadRooms();
  }

  //Actualiza lista de rooms
  loadRooms() {
    this.roomsLoading = true;
    this.getAllRoomsRequest();
  }

  //Obtener la lista de rooms
  getAllRoomsRequest() {
    this.apiService.getAllRoomsRequest().subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.rooms = response.body;
        this.roomsLoading = false;
      } else {
        this.roomsLoading = false;
        console.log(response);
      }
    })
  }

  addRoom() {
    const { name, location, capacity } = this.addRoomForm.value
    const updatedRoom: any = {
      name: name,
      location: location,
      capacity: capacity
    };
    this.apiService.registerRequest(updatedRoom).subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.loadRooms();
        this.closeModal('addRoomModal')
        console.log('Sala creada correctamente.')
        //toast success
      } else {
        //toast error
        this.addRoomForm.markAllAsTouched();
        this.invalidForm = response?.error;
        console.log(this.invalidForm);
      }
    })
  }

  //Editar room
  editRoom(room: Rooms) {
    const { name, location, capacity } = this.editRoomForm.value;
    const updatedRoom: any = {
      id: room.id,
      name: name,
      location: location,
      capacity: capacity
    };
    this.apiService.updateRoomRequest(updatedRoom).subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.loadRooms();
        this.clearSelectedRoom();
        this.closeModal('editRoomModal');
        console.log('Los datos de la sala se han actualizado.');
        //toast success
      } else {
        //toast error
        this.editRoomForm.markAllAsTouched();
        console.log(response);
      }
    });
  }

  //Borrar room
  deleteRoom(roomId: number) {
    this.apiService.deleteRoomRequest(roomId).subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.loadRooms();
        this.clearSelectedRoom();
        this.closeModal('deleteRoomModal');
        console.log('La sala se ha eliminado');
        //toast success
      } else {
        //toast error
        console.log(response);
      }
    });
  }


  //Modals
  closeModal(id: string) {
    this.modalService.closeModal(id);
    console.log(id)
    setTimeout(() => { //Espera que complete la animacion de cierre para limpiar los campos
      this.resetAddForm();
    }, 150)
  }

  //Reset form y errores
  resetAddForm() {
    this.invalidForm = null;
    this.addRoomForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['1'],
      capacity: ['1', [Validators.required]],
    })
  }

  clearSelectedRoom() {
    this.selectedRoom = null
  }

  openModalAddRoom() {
    this.modalService.openModal('addRoomModal');
  }

  openModalEditRoom(room: Rooms) {
    //Inicializa el form con los datos del room
    this.selectedRoom = room;
    this.editRoomForm.patchValue({
      id: room.id,
      name: room.name,
      location: room.location,
      capacity: room.capacity
    });
    console.log()
    this.modalService.openModal('editRoomModal');
  }

  openModalDeleteRoom(room: Rooms) {
    this.selectedRoom = room; // Guarda el room seleccionado
    console.log(this.selectedRoom)
    this.modalService.openModal('deleteRoomModal');
  }


  //Validaciones de campos
  hasError(form: any, fieldName: string, errorType?: string): any {
    const input = form.get(fieldName);
    if (errorType) {
      return input?.touched && input?.hasError(errorType);
    }
    return input?.touched && input?.invalid;
  }
}

