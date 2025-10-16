import { Pokemon } from "./pokemon.model";

export interface User {
    id: number;
    username: string;
    email: string;
    dt_inclusao: string;
    dt_alteracao: string;
    pokemons: Pokemon[];
}