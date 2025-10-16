import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list';

// Importe os componentes que você criou

export const routes: Routes = [
    { path: 'pokemons', component: PokemonListComponent },
    // Rota padrão: redireciona para a tela de login se a URL estiver vazia
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    // Rota coringa: redireciona para a tela de login se a URL não existir
    { path: '**', redirectTo: '/login' }
];