import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../core/models/pokemon.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  imports: [ CommonModule],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css'
})
export class PokemonCard {
  @Input() pokemon!: Pokemon;
  @Input() typeColorMap: { [key: string]: string } = {};
}
