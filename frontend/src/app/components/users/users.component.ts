import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ApiResponse, ApiService } from '../../services/api.service';
import { ModalService } from '../../shared/modal/modal.service';
import { Booking } from '../../pages/bookings/bookings.component';


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

  addUserForm!: FormGroup;
  invalidForm?: string | null = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private modalService: ModalService) {
    this.editUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      location: ['', [Validators.required]],
      role: ['', [Validators.required]],
    })

    this.addUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      location: ['1', [Validators.required]],
      role: ['user', [Validators.required]],
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

  //Obtener la lista de usuarios
  getAllUsersRequest() {
    this.apiService.getAllUsersRequest().subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.users = response.body;
        this.usersLoading = false;
      } else {
        this.usersLoading = false;
        console.log(response);
      }
    })
  }

  addUser() {
    const { username, password, email, location, role } = this.addUserForm.value
    const updatedUser: any = {
      username: username,
      password: password,
      email: email,
      location: location,
      role: role
    };
    this.apiService.registerRequest(updatedUser).subscribe((response: ApiResponse) => {
      if (response.status === 201) {
        this.loadUsers();
        this.closeModal('addModal')
        //toast success
      } else {
        //toast error
        this.addUserForm.markAllAsTouched();
        this.invalidForm = response?.error;
        console.log(response);
      }
    })
  }

  //Editar usuario
  editUser(user: User) {
    const { username, email, location, role } = this.editUserForm.value
    const updatedUser: any = {
      id: user.id,
      username: username,
      email: email,
      location: location,
      role: role
    };
    this.apiService.updateUserRequest(updatedUser).subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.loadUsers();
        this.clearSelectedUser();
        this.closeModal('editModal')
        //toast success
      } else {
        //toast error
        this.editUserForm.markAllAsTouched();
        console.log(response);
      }
    })
  }

  //Borrar usuario
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
    this.addUserForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      location: ['1', [Validators.required]],
      role: ['user', [Validators.required]],
    })
  }

  clearSelectedUser() {
    this.selectedUser = null
  }

  openModalAddUser() {
    this.modalService.openModal('addModal');
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

  openModalDeleteUser(user: User) {
    this.selectedUser = user; // Guarda el usuario seleccionado
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