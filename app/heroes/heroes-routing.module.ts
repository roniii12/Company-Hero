import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import { HeroesStartComponent } from './heroes-start/heroes-start.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroesResolver } from './heroes.resolver';

const routes: Routes = [
  {
    path:'',
    component:HeroesComponent,
    resolve:[HeroesResolver],
    children:[
      {path:'',component: HeroesStartComponent},
      {path:':id', component: HeroDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
