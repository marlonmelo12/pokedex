import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../core/models/pokemon.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule,
    MatIconModule
  ],
  templateUrl: './pokemon-card.html',
  styleUrls: ['./pokemon-card.css']
})
export class PokemonCard {
  private _pokemon!: Pokemon;

  @Input()
  set pokemon(pkmn: Pokemon) {
    console.log(`Setter chamado para: ${pkmn?.name}`);
    console.log('Objeto stats recebido:', pkmn?.stats);
    this._pokemon = pkmn;
    if (pkmn && pkmn.stats) {
      this.pokemonStats = [
        { name: 'HP', value: pkmn.stats.hp },
        { name: 'Ataque', value: pkmn.stats.attack },
        { name: 'Defesa', value: pkmn.stats.defense }
      ];
    }
  }

  get pokemon(): Pokemon {
    return this._pokemon;
  }

  @Input() typeColorMap: { [key: string]: string } = {};
  @Input() isExpanded: boolean = false;

  @Output() favoriteToggle = new EventEmitter<Pokemon>();
  @Output() battleTeamToggle = new EventEmitter<Pokemon>();

  public pokemonStats: { name: string, value: number }[] = [];
  public readonly Math = Math;

  onToggleFavorite(event: MouseEvent): void {
    event.stopPropagation();
    this.favoriteToggle.emit(this.pokemon);
  }

  onToggleBattleTeam(event: MouseEvent): void {
    event.stopPropagation();
    this.battleTeamToggle.emit(this.pokemon);
  }
}