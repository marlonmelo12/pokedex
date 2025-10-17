import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, PaginatedPokemonResponse } from '../../core/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  [x: string]: any;
  private backendApiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getPublicPokemonList(limit: number = 20, offset: number = 0): Observable<PaginatedPokemonResponse> {
    const url = `${this.backendApiUrl}/public/pokemons/`;
    const params = {
      limit: limit.toString(),
      offset: offset.toString()
    };
    return this.http.get<PaginatedPokemonResponse>(url, { params });
  }

  getMyPokemons(): Observable<Pokemon[]> {
    const url = `${this.backendApiUrl}/pokemons/`;
    return this.http.get<Pokemon[]>(url);
  }

  addPokemonToMyList(pokemonData: Partial<Pokemon>): Observable<Pokemon> {
    const url = `${this.backendApiUrl}/pokemons/`;
    return this.http.post<Pokemon>(url, pokemonData);
  }

  updateMyPokemon(pokemonId: number, updates: Partial<Pokemon>): Observable<Pokemon> {
    const url = `${this.backendApiUrl}/pokemons/${pokemonId}/`;
    return this.http.patch<Pokemon>(url, updates);
  }

  deleteMyPokemon(pokemonId: number): Observable<void> {
    const url = `${this.backendApiUrl}/pokemons/${pokemonId}/`;
    return this.http.delete<void>(url);
  }
}