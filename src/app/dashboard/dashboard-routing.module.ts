import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PokemonTypeViewComponent } from './pokemon-type-view/pokemon-type-view.component';
import { PokemonViewComponent } from './pokemon-view/pokemon-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'pokemon-types', pathMatch: 'full' },
      {
        path: 'pokemon-types',
        component: PokemonTypeViewComponent,
        title: 'Pokemon Types',
      },
      {
        path: 'pokemon-view/:type',
        component: PokemonViewComponent,
        title: 'Pokemon View',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
