import { Component, OnInit, inject } from '@angular/core';
import { PokemonApiHttpService } from '../../shared/services/pokemon-api-http.service';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-type-view',
  templateUrl: './pokemon-type-view.component.html',
  styleUrl: './pokemon-type-view.component.scss',
})
export class PokemonTypeViewComponent {
  service = inject(PokemonApiHttpService);
  router = inject(Router);

  isLoading = true;

  types = this.service.getTypes().pipe(
    map(({ results }) => results),
    tap(() => (this.isLoading = false))
  );

  viewrDetails({ url, name }: IPokemonType) {
    const typeId = url.match(/\/([^\/]+)\/?$/);

    this.router.navigate(['dashboard', 'pokemon-view', name], {
      queryParams: { typeId: typeId && typeId[1] },
    });
  }
}
