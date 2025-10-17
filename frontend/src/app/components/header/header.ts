import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  // No futuro, estes valores podem ser recebidos via @Input()
  // ou de um serviço que gerencia o estado da aplicação.
  public pokemonCount: number = 6;
  public typeCount: number = 18;
  public generationCount: number = 9;
}