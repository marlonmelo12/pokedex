import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../core/models/pokemon.model';
import { CommonModule } from '@angular/common';
import { PokemonCard } from '../components/pokemon-card/pokemon-card';
import { Header } from '../components/header/header';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    PokemonCard
  ], // <--- A VÍRGULA FALTANDO FOI ADICIONADA AQUI
  templateUrl: './pokemon-list.html',
  styleUrls: ['./pokemon-list.css'] // <--- CORRIGIDO DE .scss PARA .css
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];

  ngOnInit(): void {
    this.pokemons = [
      { id: 1, name: 'Bulbasaur', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', types: ['Grass', 'Poison'], stats: { hp: 45, attack: 49, defense: 49 }},
      { id: 4, name: 'Charmander', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png', types: ['Fire'], stats: { hp: 39, attack: 52, defense: 43 }},
      { id: 7, name: 'Squirtle', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', types: ['Water'], stats: { hp: 44, attack: 48, defense: 65 }}
    ];
  }
}