import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HeroesService } from './heroes.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesResolver implements Resolve<boolean> {
  constructor(
    private heroesService:HeroesService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.heroesService.fetchHeroes();
    return of(true);
  }
}
