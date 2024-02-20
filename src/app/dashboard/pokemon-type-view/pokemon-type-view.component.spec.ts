import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonTypeViewComponent } from './pokemon-type-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { PokemonApiHttpService } from '../../shared/services/pokemon-api-http.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PokemonTypeViewComponent', () => {
  let component: PokemonTypeViewComponent;
  let fixture: ComponentFixture<PokemonTypeViewComponent>;
  let mockService: jasmine.SpyObj<PokemonApiHttpService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('PokemonApiHttpService', ['getTypes']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PokemonTypeViewComponent],
      providers: [
        { provide: PokemonApiHttpService, useValue: mockService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTypes on service and set types', () => {
    const mock: IPokemonTypeResult = {
      results: [{
        name: 'type1',
        url: 'url1'
      }]
    };

    const dummyTypes = mockService.getTypes.and.returnValue(of(mock));

    expect(mockService.getTypes).toHaveBeenCalled();
    expect(component.types).toEqual(dummyTypes);
    expect(component.isLoading).toBeFalse();
  });

  it('should navigate to pokemon-view with correct params', () => {
    const dummyType = { name: 'type1', url: 'url1' };
    const dummyTypeId = '1';
    const dummyEvent = { url: 'url1', name: 'type1' };

    mockService.getTypes.and.returnValue(of({ results: [dummyType] }));
    mockRouter.navigate.and.callThrough();

    component.viewrDetails(dummyEvent);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['dashboard', 'pokemon-view', dummyType.name], { queryParams: { typeId: dummyTypeId } });
  });

  it('should navigate to the correct route with the correct query params', () => {
    const mockPokemonType = {
      url: 'https://pokeapi.co/api/v2/type/1/',
      name: 'normal',
    };

    spyOn(mockRouter, 'navigate');

    component.viewrDetails(mockPokemonType);

    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['dashboard', 'pokemon-view', 'normal'],
      {
        queryParams: { typeId: '1' },
      }
    );
  });
});
