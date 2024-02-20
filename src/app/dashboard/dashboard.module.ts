import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PokemonViewComponent } from './pokemon-view/pokemon-view.component';
import { PokemonTypeViewComponent } from './pokemon-type-view/pokemon-type-view.component';
import { CardComponent } from '../shared/components/card/card.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent,
    PokemonViewComponent,
    PokemonTypeViewComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardComponent,
    PaginationComponent,
    NgOptimizedImage,
    RouterModule
  ],
})
export class DashboardModule {}
