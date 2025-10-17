// Define a estrutura para o objeto de tipo que o backend envia
export interface PokemonType {
  id: number;
  descricao: string;
}

// Define a estrutura para os status de um Pokémon
export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
}

// A interface principal do Pokémon, agora corrigida
export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  // A correção está aqui: 'types' agora é um array de objetos PokemonType
  types: PokemonType[];
  stats: PokemonStats;
  // Adicionei os campos que faltavam para corresponder ao backend
  codigo: string;
  favorito: boolean;
  grupo_batalha: boolean;
}

// A resposta paginada (esta parte já estava correta)
export interface PaginatedPokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}