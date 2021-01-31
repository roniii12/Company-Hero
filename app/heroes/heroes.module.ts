import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroItemComponent } from './heroes-list/hero-item/hero-item.component';
import { HeroesStartComponent } from './heroes-start/heroes-start.component';
import { EffectsModule } from '@ngrx/effects';
import { HeroesComponent } from './heroes.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { HeroesService } from './heroes.service';
import { HeroesEditComponent } from './heroes-edit/heroes-edit.component';


@NgModule({
  declarations: [HeroDetailsComponent, HeroesListComponent, HeroItemComponent, HeroesStartComponent, HeroesComponent,FilterPipe, HeroesEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class HeroesModule { }
