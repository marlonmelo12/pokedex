import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pokemon } from "../../core/models/pokemon.model";
import { __param } from "tslib";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private backendUrl = 'http://localhost:8080/api';

    private pokeApiUrl = 'https://pokeapi.co/api/v2';

    constructor(private http: HttpClient) {}

    getPokemonsFromPokeApi(limit: number = 20, offset: number = 0): Observable<any> {
        const url = `${this.pokeApiUrl}/pokemon?limit=${limit}&offset=${offset}`;
        return this.http.get<any>(url);
    }

    getPokemonDetailsFromPokeApi(name: string): Observable<any> {
        const url = `${this.pokeApiUrl}/pokemon/${name}`;
        return this.http.get<any>(url);
    }

    getMyPokemons(): Observable<Pokemon[]> {
        const url = `${this.backendUrl}/pokemons`;
        return this.http.get<Pokemon[]>(url);
    }

    addPokemonToMyList(pokemonData: any): Observable<Pokemon> {
        const url = `${this.backendUrl}/pokemons`;
        return this.http.post<Pokemon>(url, pokemonData);
    }
}