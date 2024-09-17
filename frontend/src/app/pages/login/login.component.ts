import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isRegistering = false;

  // Mensajes de error
  usernameError: string | null = null;
  passwordError: string | null = null;
  emailError: string | null = null;
  credentialsErrorMessage: string | null = null;

  // Datos mockeados
  private mockUser = { username: 'user1234', password: 'asd1234' };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    // Inicializar el formulario con los controles
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Valida credenciales ingresadas en el back (mock)
  private authenticate(username: string, password: string): any {
    if (username === this.mockUser.username && password === this.mockUser.password) {
      console.log('Usuario logueado!')
      return { user: this.mockUser };
    } else {
      throw new Error('El usuario o la contraseña ingresada son incorrectos.');
    }
  }

  // Login
  private login(username: string, password: string): Observable<any> {
    try {
      return of(this.authenticate(username, password));
    } catch (error) {
      return throwError(() => error);
    }
  }

  //Registro
  private register(username: string, email: string, password: string) {
    console.log('Usuario registrado!')
  }

  //Obtener mensaje de error
  getErrorMessage(formGroup: FormGroup, controlName: string): string | null {
    const control = formGroup.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Este campo es obligatorio';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `Debe tener al menos ${requiredLength} caracteres`;
      }
      if (control.errors['email']) {
        return 'Ingrese un correo electrónico válido';
      }
    }
    return null;
  }

  clearErrors() {
    this.usernameError = null;
    this.passwordError = null;
    this.emailError = null;
    this.credentialsErrorMessage = null;
  }

  onSubmit(state: string) {
    switch (state) {
      case 'login':
        //Valida fomulario
        console.log('Formulario correctamente cargado? -> ' + this.loginForm.valid )
        if (this.loginForm.valid) {
          const { username, password } = this.loginForm.value;
          //Valida credenciales
          this.login(username, password).subscribe({
            next: () => {
              this.router.navigate(['/home']);
              this.clearErrors();
            },
            error: (error: any) => {
              this.credentialsErrorMessage = error.message;
              console.log('Error de credenciales -> '+ this.credentialsErrorMessage)
            }
          });
        } else {
          this.usernameError = this.getErrorMessage(this.loginForm, 'username');
          this.passwordError = this.getErrorMessage(this.loginForm, 'password');
        }
        break;

      case 'register':
        // Valida formulario
        if (this.registerForm.valid) {
          const { username, email, password } = this.registerForm.value;
          this.register(username, email, password);
          this.clearErrors();
        } else {
          // Muestra los errores si el formulario es inválido
          this.usernameError = this.getErrorMessage(this.registerForm, 'username');
          this.emailError = this.getErrorMessage(this.registerForm, 'email');
          this.passwordError = this.getErrorMessage(this.registerForm, 'password');
        }
        break;
    }
  }

  // Switch forms Login-Registro
  toggleForm() {
    this.isRegistering = !this.isRegistering;
    this.clearErrors();
  }
}
