import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-secret-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secret-page.component.html',
  styleUrl: './secret-page.component.scss'
})
export class SecretPageComponent {
  constructor() {}
}
