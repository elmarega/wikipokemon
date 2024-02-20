import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { PokemonApiHttpService } from '../../shared/services/pokemon-api-http.service';
import { PokemonViewComponent } from './pokemon-view.component';
import { of } from 'rxjs';

describe('PokemonViewComponent', () => {
  let component: PokemonViewComponent;
  let fixture: ComponentFixture<PokemonViewComponent>;
  let mockActivatedRoute: any;
  let mockPokemonApiHttpService: any;

  beforeEach(() => {
    mockActivatedRoute = {
      queryParamMap: of({ params: { typeId: 1 } })
    };

    mockPokemonApiHttpService = jasmine.createSpyObj('PokemonApiHttpService', ['getByTypeId', 'getPokemonByrl']);
    mockPokemonApiHttpService.getByTypeId.and.returnValue(of({
      name: 'Type',
      pokemon: [{ pokemon: { url: 'url', name: 'Pokemon' } }]
    }));
    mockPokemonApiHttpService.getPokemonByrl.and.returnValue(of({
      sprites: { front_default: 'url' },
      name: 'Pokemon'
    }));

    TestBed.configureTestingModule({
      declarations: [PokemonViewComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PokemonApiHttpService, useValue: mockPokemonApiHttpService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service methods and set the variables correctly', () => {
    fixture.detectChanges();

    expect(mockPokemonApiHttpService.getByTypeId).toHaveBeenCalledWith(1);
    expect(mockPokemonApiHttpService.getPokemonByrl).toHaveBeenCalledWith('url');
    expect(component.name).toBe('Type');
    expect(component.allPokemon).toEqual([{ url: 'url', name: 'Pokemon' }]);
    expect(component.totalItens).toBe(1);
    expect(component.totalPage).toBe(1);
    expect(component.isLoading).toBe(false);
    expect(component.pokemonsPaged).toEqual([{ url: 'url', name: 'Pokemon' }]);
  });

  it('should set pokemonsPaged correctly when page is 1', () => {
    const page = 1;
    component.setPage(page);
    expect(component.pokemonsPaged).toEqual(component.allPokemon.slice(0, component.numberOfPage));
  });
});
