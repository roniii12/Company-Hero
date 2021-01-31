import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroesStartComponent } from './heroes-start/heroes-start.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroesResolver } from './heroes.resolver';
import { HeroesEditComponent } from './heroes-edit/heroes-edit.component';

const routes: Routes = [
  {
    path:'',
    component:HeroesComponent,
    resolve:[HeroesResolver],
    children:[
      {path:'',component: HeroesStartComponent},
      {path:'new',component:HeroesEditComponent},
      {path:':id', component: HeroDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
