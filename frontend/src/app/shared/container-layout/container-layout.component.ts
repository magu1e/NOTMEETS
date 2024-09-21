import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-container-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './container-layout.component.html',
  styleUrl: './container-layout.component.scss'
})
export class ContainerLayoutComponent {

}
