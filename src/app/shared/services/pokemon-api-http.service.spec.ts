import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonApiHttpService } from './pokemon-api-http.service';

describe('PokemonApiHttpService', () => {
  let service: PokemonApiHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokemonApiHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return types when getTypes is called', () => {
    const dummyTypes = { results: [{ name: 'type1' }, { name: 'type2' }] };

    service.getTypes().subscribe((types: any) => {
      expect(types).toEqual(dummyTypes);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/type');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTypes);
  });

  it('should return pokemon by type when getByTypeId is called', () => {
    const dummyPokemon = { pokemon: [{ name: 'pokemon1' }, { name: 'pokemon2' }] };

    service.getByTypeId('1').subscribe((pokemon: any) => {
      expect(pokemon).toEqual(dummyPokemon);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/type/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPokemon);
  });

  it('should return pokemon by url when getPokemonByrl is called', () => {
    const dummyPokemon = {
      sprites: {
        front_default: 'sprit-pokemon'
      },
      name: 'pokemon'
     };

    service.getPokemonByrl('https://pokeapi.co/api/v2/pokemon/1').subscribe(pokemon => {
      expect(pokemon).toEqual(dummyPokemon);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPokemon);
  });
});
