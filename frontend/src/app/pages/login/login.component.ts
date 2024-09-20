import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  invalidCredentials: string | null = null;
  isRegistering = false;

  //Endpoints
  authEndpoint = 'https://localhost:7252/api/User/auth';
  registerEndpoint = 'https://localhost:7252/api/User/register';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    this.initForms();
  }


  //Reset forms y errores
  resetForm() {
    this.invalidCredentials = null;
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


  //Mejora: atajar el error en caso de que el back no responda (actualmente devuelve "usuario o contraseña incorrectos")
  authRequest(user: any) {
    this.http.post(this.authEndpoint, user, { observe: 'response' }) // observa la respuesta completa y no solo el body
      .pipe(
        catchError(error => {// Verifica errores de de la solicitud
          console.error('Error en la petición :', error);
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.status === 200) { // Verifica que la response de 200
            console.log('Autenticación exitosa');
            this.router.navigate(['/home']);
            this.resetForm();
          } else { // Si la response no da 200 devuelve error
            this.invalidCredentials = "Usuario o contraseña incorrectos.";
            console.error('Error de autenticación: ' + this.invalidCredentials, response?.status);
          }
        },
      });
  }


  //Mejora: atajar el error en caso de que el back no responda (actualmente devuelve "usuario o contraseña incorrectos")
  registerRequest(user: any) {
    this.http.post(this.registerEndpoint, user, { observe: 'response' }) // observa la respuesta completa y no solo el body
      .pipe(
        catchError(error => {// Verifica errores de de la solicitud
          console.error('Error en la petición :', error);
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.status === 200) { // Verifica que la response de 200
            console.log('Autenticación exitosa');
            this.router.navigate(['/home']);
            this.resetForm();
          } else { // Si la response no da 200 devuelve error
            this.invalidCredentials = "Usuario o contraseña incorrectos.";
            console.error('Error de autenticación: ' + this.invalidCredentials, response?.status);
          }
        },
      });
  }


  onSubmit(state: string) {
    switch (state) {
      case 'login':
        if (this.loginForm.valid) {
          const { username, password } = this.loginForm.value;
          this.authRequest({ username, password });
        } else {
          this.loginForm.markAllAsTouched();
        }
        break;

      case 'register':
        if (this.registerForm.valid) {
          const { username, password, email, location }  = this.registerForm.value;
          this.registerRequest({ username, password, email, location });
        } else {
          this.registerForm.markAllAsTouched();
        }
        break;
    }
  }

  
  // Switch forms Login-Registro
  toggleForm() {
    this.isRegistering = !this.isRegistering;
    this.resetForm();
  }
}