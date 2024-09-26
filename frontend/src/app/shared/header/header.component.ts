import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent {
  user = { username: this.authService.getUser()!, role: this.authService.getRole()! }
  isAdmin = false;
  
  
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    if(this.user.role === 'admin'){
      this.isAdmin = true
    }
  }
  
  
  //Borra "user" de localstorage
  logout() {
    this.authService.logout()
  }
}
