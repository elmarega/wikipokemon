import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonApiHttpService } from '../../shared/services/pokemon-api-http.service';
import { untilDestroyed } from '../../shared/constants/destroy.contants';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrl: './pokemon-view.component.scss',
})
export class PokemonViewComponent implements OnInit {
  service = inject(PokemonApiHttpService);
  activetedRouter = inject(ActivatedRoute);
  private untilDestroyed = untilDestroyed();

  pokemonsPaged: IPokemonType[] = [];
  allPokemon: IPokemonType[] = [];
  name = '';

  pageIndex = 1;
  numberOfPage = 10;
  totalItens = 0;
  totalPage = 0;

  isLoading = true;

  ngOnInit(): void {
    this.activetedRouter.queryParamMap.subscribe(({ params }: any) => {
      if (params.typeId) {
        this.service
          .getByTypeId(params.typeId)
          .pipe(this.untilDestroyed())
          .subscribe((result) => {
            const { name, pokemon } = result;
            this.name = name;
            this.buildPokemonList(pokemon.map((item) => item.pokemon));
          });
      }
    });
  }

  buildPokemonList(pokemons: IPokemonType[]): void {
    this.totalItens = pokemons.length;
    this.totalPage = Math.ceil(this.totalItens / this.numberOfPage);
    pokemons.forEach((pokemon, index: number) => {
      this.allPokemon;
      this.service
        .getPokemonByrl(pokemon.url)
        .pipe(this.untilDestroyed())
        .subscribe((result) => {
          const { sprites, name } = result;
          const _pokemonMaker = {
            url: sprites.front_default,
            name,
          };

          this.allPokemon.push(_pokemonMaker);
          this.setPage(1);

          if (this.totalItens - 1 === index) {
            this.isLoading = false;
          }
        });
    });
  }

  setPage(page: number) {
    const start = (page - 1) * this.numberOfPage;
    const end = start + this.numberOfPage;
    this.pokemonsPaged = [...this.allPokemon].slice(start, end);
  }
}
