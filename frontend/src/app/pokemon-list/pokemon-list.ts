import { Component, OnInit, signal, effect } from '@angular/core';
import { Pokemon } from '../../core/models/pokemon.model';
import { CommonModule } from '@angular/common';
import { Header } from '../components/header/header';
import { PokemonCard } from '../components/pokemon-card/pokemon-card';
import { FilterButtonsComponent } from '../components/filter-buttons/filter-buttons';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    PokemonCard,
    FilterButtonsComponent,
  ],
  templateUrl: './pokemon-list.html',
  styleUrls: ['./pokemon-list.css']
})
export class PokemonListComponent implements OnInit {
  private allPokemons: Pokemon[] = [];
  public displayedPokemons: Pokemon[] = [];

  public nameFilter = signal<string>('');
  public generationFilter = signal<string>('all');
  public typeFilter = signal<string>('Todos os Tipos');

  public expandedPokemonId = signal<number | null>(null);

  public filterTypes: string[] = ['Todos os Tipos'];
  public typeColorMap: { [key: string]: string } = {
    'Grass': 'green',
    'Poison': 'purple',
    'Fire': 'red',
    'Water': 'blue',
    'Flying': 'indigo',
    'Bug': 'lime',
  };

  public generations = [
    { value: 'all', label: 'Todas as Gerações' },
    { value: '1', label: 'Geração 1' },
    { value: '2', label: 'Geração 2' },
    { value: '3', label: 'Geração 3' },
  ];

  private limit = 151;
  private offset = 0;
  public totalPokemons = 0;

  constructor(private pokemonService: PokemonService) {
    effect(() => {
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPublicPokemonList(this.limit, this.offset).subscribe({
      next: (response) => {
        this.allPokemons = response.results;
        this.displayedPokemons = this.allPokemons;

        const uniqueTypes = new Set<string>();
        this.allPokemons.forEach(pokemon => {
          pokemon.types.forEach(type => {
            uniqueTypes.add(type.descricao);
          });
        });

        this.filterTypes = ['Todos os Tipos', ...Array.from(uniqueTypes).sort()];
        this.totalPokemons = response.count;
      },
      error: (err) => console.error('Erro ao buscar Pokémon:', err)
    });
  }

  private applyFilters(): void {
    const name = this.nameFilter().toLowerCase();
    const generation = this.generationFilter();
    const type = this.typeFilter();

    let filtered = this.allPokemons;

    if (name) {
      filtered = filtered.filter(pokemon => pokemon.name.toLowerCase().includes(name));
    }

    if (generation !== 'all') {
      const genNumber = parseInt(generation, 10);
      filtered = filtered.filter(pokemon => this.getGenerationFromId(pokemon.id) === genNumber);
    }

    if (type !== 'Todos os Tipos') {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(pokemonType => pokemonType.descricao === type)
      );
    }

    this.displayedPokemons = filtered;
  }

  public onNameChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.nameFilter.set(input.value);
  }

  public onGenerationChanged(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.generationFilter.set(select.value);
  }

  public onTypeChanged(type: string): void {
    this.typeFilter.set(type);
  }

  private getGenerationFromId(id: number): number {
    if (id <= 151) return 1;
    if (id <= 251) return 2;
    if (id <= 386) return 3;
    return 0;
  }
  public onFavoriteToggle(pokemon: Pokemon): void{
    pokemon.favorito = !pokemon.favorito;

    this.pokemonService.getOrToggleFavorite(pokemon).subscribe({
      next: (updatedPokemonFromServer) => {
        const index = this.allPokemons.findIndex(p => p.codigo === updatedPokemonFromServer.codigo)
        if(index > -1){
          this.allPokemons[index] = updatedPokemonFromServer;
        }
      },
      error: (err) => {
        console.error("Falha ao atualizar");
        pokemon.favorito = !pokemon.favorito;
      }
    })
  }

  public onBattleTeamToggle(pokemon: Pokemon): void{
    pokemon.grupo_batalha = !pokemon.grupo_batalha;

    this.pokemonService.getOrToggleBattleTeam(pokemon).subscribe({
      next: (updatedPokemon) =>{
        const index = this.allPokemons.findIndex(p => p.codigo === updatedPokemon.codigo)
        if(index > -1){
          this.allPokemons[index] = updatedPokemon;
        }
      },
      error: (err) =>{
        pokemon.grupo_batalha = !pokemon.grupo_batalha;
        console.error("Erro ao atualizar")
      }
    })
  }

  public onCardClick(pokemonId: number): void{
    if(this.expandedPokemonId() === pokemonId){
      this.expandedPokemonId.set(null);
    }else{
      this.expandedPokemonId.set(pokemonId);
    }
  }
}