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
    //Request lista de usuarios
    this.loadRooms();
  }

  //Actualiza lista de usuarios
  loadRooms() {
    this.roomsLoading = true;
    this.getAllRoomsRequest();
  }

  //Obtener la lista de usuarios
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
      if (response.status === 201) {
        this.loadRooms();
        this.closeModal('addModal')
        console.log('Usuario creado correctamente.')
        //toast success
      } else {
        //toast error
        this.addRoomForm.markAllAsTouched();
        this.invalidForm = response?.error;
        console.log(this.invalidForm);
      }
    })
  }

  //Editar usuario
  editRoom(room: Rooms) {
    const { name,  location, capacity} = this.editRoomForm.value
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
        this.closeModal('editModal')
        console.log('Los datos de la sala se han actualizado.');
        //toast success
      } else {
        //toast error
        this.editRoomForm.markAllAsTouched();
        console.log(response);
      }
    })
  }

  //Borrar usuario
  deleteRoom(roomId: number) {
    this.apiService.deleteRoomRequest(roomId).subscribe((response: ApiResponse) => {
      console.log(roomId)
      if (response.status === 200) {
        this.loadRooms();
        this.clearSelectedRoom();
        this.closeModal('deleteModal')
        console.log('La sala se ha eliminado');
        //toast success
      } else {
        //toast error
        console.log(response);
      }
    })
  }


  //Modals
  closeModal(id: string) {
    this.modalService.closeModal(id);
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
    this.modalService.openModal('addModal');
  }

  openModalEditRoom(room: Rooms) {
    //Inicializa el form con los datos del usuario
    this.selectedRoom = room;
    this.editRoomForm.patchValue({
      name: room.name,
      location: room.location,
      capacity: room.capacity
    });
    this.modalService.openModal('editModal');
  }

  openModalDeleteRoom(room: Rooms) {
    this.selectedRoom = room; // Guarda el usuario seleccionado
    this.modalService.openModal('deleteModal');
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

