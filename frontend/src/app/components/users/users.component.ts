import { Component } from '@angular/core';
import { usersMock } from './usersMock';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ApiService } from '../../services/api.service';
import { ModalService } from '../../shared/modal/modal.service';
//import { Booking } from '../../pages/home/home.component';


export interface User {
  id: number,
  username: string,
  email: string,
  location: number,
  role: string,
  // bookings: Booking[]
  [key: string]: any
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ModalComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  usersMock: User[] = usersMock;
  editUserForm!: FormGroup;
  selectedUser: string | null = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private modalService: ModalService) {
    this.editUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      location: ['', [Validators.required]],
      role: ['', [Validators.required]],
    })
  };

  clearSelectedUser() {
    this.selectedUser = null
  }

  //Modal
  closeModal(id: string) {
    this.modalService.closeModal(id);
  }

  openModalDeleteUser(user: User) {
    this.selectedUser = user.username; // Guarda el usuario seleccionado
    this.modalService.openModal('deleteModal');
  }

  openModalEditUser(user: User) {
    //Inicializa el form con los datos del usuario
    this.selectedUser = user.username;
    this.editUserForm.patchValue({
      username: user.username,
      email: user.email,
      location: user.location,
      role: user.role,
    });
    this.modalService.openModal('editModal');
  }

  //Validaciones de campos
  hasError(fieldName: string, errorType?: string): any {
    const input = this.editUserForm.get(fieldName);
    if (errorType) {
      return input?.touched && input?.hasError(errorType);
    }
    return input?.touched && input?.invalid;
  }


  deleteUser() {
    const { username, email, location, role } = this.editUserForm.value
    //request delete user
    this. clearSelectedUser();
    this.closeModal('deleteModal')
  }


  editUser() {
    const { username, email, location, role } = this.editUserForm.value
    //request update user
    this. clearSelectedUser();
    this.closeModal('editModal')
  }
}