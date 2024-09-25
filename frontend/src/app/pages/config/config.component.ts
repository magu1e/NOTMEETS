import { Component } from '@angular/core';
import { UsersComponent } from '../../components/users/users.component';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [UsersComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {

}
