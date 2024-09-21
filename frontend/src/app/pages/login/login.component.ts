import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, ApiResponse } from '../../api.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


@Injectable({
  providedIn: 'root',
})
export class LoginComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  invalidCredentials?: string | null = null;
  invalidRegister?: string | null = null;
  isRegistering = false;


  //Inicializa formularios
  initForms() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      location: [1, [Validators.required]]
    });
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {
    this.initForms()
  }


  // Switch forms Login-Registro
  toggleForm() {
    this.isRegistering = !this.isRegistering;
    this.resetForm();
  }

  //Reset forms y errores
  resetForm() {
    this.invalidCredentials = null;
    this.invalidRegister = null;
    this.initForms();
  }

  //Validaciones de campos
  hasError(form: FormGroup, fieldName: string, errorType?: string): any {
    const input = form.get(fieldName);
    if (errorType) {
      return input?.touched && input?.hasError(errorType);
    }
    return input?.touched && input?.invalid;
  }

  auth(user: any) {
    this.apiService.authRequest(user)
      .subscribe((response: ApiResponse) => {
        if (response.status === 200) {
          console.log('Autenticación exitosa', response.status);
          this.router.navigate(['/home']);
          this.resetForm();
        } else {
          this.invalidCredentials = response.error?.message;
          console.log(response)
        }
      });
  }

  register(user: any) {
    this.apiService.registerRequest(user)
      .subscribe((response: ApiResponse) => {
        if (response.status === 201) { // Manejo de respuesta exitosa
          console.log('Usuario creado exitosamente', response.status);
          this.router.navigate(['/home']);
          this.resetForm();
        } else { // Manejo de error
          this.invalidRegister = response.error;
          ;
        }
      });
  }

  onSubmit(state: string) {
    switch (state) {
      case 'login':
        if (this.loginForm.valid) {
          const { username, password } = this.loginForm.value;
          this.auth({ username, password });
        } else {
          this.loginForm.markAllAsTouched();
        }
        break;
      case 'register':
        if (this.registerForm.valid) {
          const { username, password, email, location } = this.registerForm.value;
          this.register({ username, password, email, location });
        } else {
          this.registerForm.markAllAsTouched();
        }
        break;
    }
  }

}