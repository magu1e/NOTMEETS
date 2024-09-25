import { Component } from '@angular/core';
import { UsersComponent } from '../../components/users/users.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [UsersComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

}
