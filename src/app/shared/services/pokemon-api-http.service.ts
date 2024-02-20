import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiHttpService {
  http = inject(HttpClient);
  api = 'https://pokeapi.co/api/v2/';

  constructor() {}

  getTypes(): Observable<IPokemonTypeResult> {
    const url = `${this.api}type`;

    return this.http.get<IPokemonTypeResult>(url);
  }

  getByTypeId(id: string): Observable<IPokemonByType> {
    const url = `${this.api}type/${id}`;

    return this.http.get<IPokemonByType>(url);
  }

  getPokemonByrl(url: string): Observable<IPokemon> {
    return this.http.get<IPokemon>(url);
  }
}
