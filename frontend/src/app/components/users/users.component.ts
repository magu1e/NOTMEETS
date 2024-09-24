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


  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private modalService: ModalService) {
    this.editUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      location: ['', [Validators.required]],
      role: ['', [Validators.required]],
    })
  };


  //Modal
  closeModal(id: string) {
    this.modalService.closeModal(id);
    console.log('modal delete')
  }

  openModalDeleteUser(user: User) {
    this.modalService.openModal('deleteModal');
  }

  openModalEditUser(user: User) {
     //Inicializa el form con los datos del usuario
     this.editUserForm.patchValue({
      username: user.username,
      email: user.email,
      location: user.location,
      role: user.role,
    });
    this.modalService.openModal('editModal');
  }

  deleteUser() {
    const { username, email, location, role } = this.editUserForm.value
    //request delete user
    this.closeModal('deleteModal')
  }


  editUser() {
    const { username, email, location, role } = this.editUserForm.value
    //request update user
    this.closeModal('editModal')
  }
}