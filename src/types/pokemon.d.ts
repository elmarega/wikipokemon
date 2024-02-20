interface IPokemonTypeResult {
  results: IPokemonType[]
}

interface IPokemonType {
  name: string;
  url: string;
}

interface IPokemonByType {
  name: string;
  pokemon: { pokemon: IPokemonType }[];
}

interface IPokemon {
  sprites: {
    front_default:string
  };
  name: string
}


