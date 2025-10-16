export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  stats:{
    hp: number;
    attack: number;
    defense: number;
  }
}