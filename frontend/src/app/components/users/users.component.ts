import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ApiResponse, ApiService } from '../../services/api.service';
import { ModalService } from '../../shared/modal/modal.service';
import { Booking } from '../../pages/home/home.component';


export interface User {
  id: number,
  username: string,
  password: string,
  email: string,
  location: number,
  role: string,
  bookings: Booking[]
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
  users!: User[];
  usersLoading: boolean = false;

  editUserForm!: FormGroup;
  selectedUser: User | null = null;

  getUseresEror = {
    status: false,
    errorMessage: ''
  };

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private modalService: ModalService) {
    this.editUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      location: ['', [Validators.required]],
      role: ['', [Validators.required]],
    })
  };

  ngOnInit() {
    //Request lista de usuarios
    this.loadUsers();
  }

  //Actualiza lista de usuarios
  loadUsers() {
    this.usersLoading = true;
    this.getAllUsersRequest();
  }

  getAllUsersRequest() {
    this.apiService.getAllUsersRequest().subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.users = response.body;
        this.usersLoading = false;
      } else {
        this.getUseresEror = { status: true, errorMessage: response.error?.message };
        this.usersLoading = false;
        console.log(response);
      }
    })
  }



  deleteUser(userId: number) {
    this.apiService.deleteUserRequest(userId).subscribe((response: ApiResponse) => {
      console.log(userId)
      if (response.status === 200) {
        this.loadUsers();
        this.clearSelectedUser();
        this.closeModal('deleteModal')
        //toast success
      } else {
        //toast error
        console.log(response);
      }
    })
  }


  editUser(user: User) {
    const { username, email, location, role } = this.editUserForm.value
    const updatedUser: any = {
        id: user.id,
        username: username,
        email: email,
        location: location,
        role: role
    };
    console.log(updatedUser)
    this.apiService.updateUserRequest(updatedUser).subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.loadUsers();
        this.clearSelectedUser();
        this.closeModal('editModal')
        //toast success
      } else {
        //toast error
        console.log(response);
      }
    })
  }

  //Modal
  closeModal(id: string) {
    this.modalService.closeModal(id);
  }

  clearSelectedUser() {
    this.selectedUser = null
  }

  openModalDeleteUser(user: User) {
    this.selectedUser = user; // Guarda el usuario seleccionado
    this.modalService.openModal('deleteModal');
  }

  openModalEditUser(user: User) {
    //Inicializa el form con los datos del usuario
    this.selectedUser = user;
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
}