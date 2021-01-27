import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'/heroes',pathMatch:'full'},
  {path:'heroes', loadChildren:()=>import('./heroes/heroes.module').then(m=>m.HeroesModule),canActivate:[AuthGuard]},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
