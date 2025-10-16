import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../core/models/pokemon.model';
import { Header } from "../header/header";

@Component({
  selector: 'app-pokemon-card',
  imports: [Header],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css'
})
export class PokemonCard {
  @Input() pokemon!: Pokemon;
}
