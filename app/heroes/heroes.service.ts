import { Injectable, ɵConsole } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subject, Subscription } from 'rxjs';
import { Hero } from './hero.model';
import * as fromApp from '../store/app.reducer'
import * as HeroesActions from './store/heroes.actions'
import { map } from 'rxjs/operators';
import { state } from '@angular/animations';
import { AppModule } from '../app.module';

@Injectable()
export class HeroesService {
  heroesChange = new Subject<Hero[]>();
  heroChange = new Subject<Hero>();
  errorChange = new Subject<string>();
  private heroes:Hero[] = [];
  subscription:Subscription;
  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  set setHeroes(heroes:Hero[]){
    this.heroes = heroes;
  }
  get getHeroes():Hero[]{
    return this.heroes;
  }
  createHero(name:string,ability:string,suitColors:string,power:number){
    this.store.dispatch(
      HeroesActions.createHero({name,ability,suitColors,power})
    )
  }
  clearError(){
    this.store.dispatch(
      HeroesActions.clearError()
    )
  }
  fetchHeroes(guid:string=undefined){
    this.store.dispatch(
      HeroesActions.fetchHeroes()
    )
    this.fetchHeroesFromStore(guid);
  }
  fetchHeroesFromStore(guid:string=undefined){
    this.subscription = this.store.select('heroes').
    subscribe((heroesState)=>{
      let heroes:Hero[] = heroesState.heroes
      this.setHeroes=heroes;
      this.heroesChange.next(this.getHeroes.slice());
      if(guid)
        this.heroChange.next(this.getHero(guid))
      if(heroesState.error)
        this.errorChange.next(heroesState.error);
    })
  }
  updateHero(hero:Hero){
    this.store.dispatch(
      HeroesActions.updateHeroPower({_guid:hero._guid,power:hero.currentPower})
    )
    this.fetchHeroesFromStore(hero._guid);
  }
  getHero(guid:string){
    for(let hero of this.getHeroes){
      if(hero._guid===guid)
        return hero
    }
  }
  sortHeroes(heroes){
    let compare = function(a:Hero,b:Hero){
      if(+a.currentPower < +b.currentPower)
        return 1
      if(+a.currentPower > +b.currentPower)
        return -1
      return 0
    }
    let sortedHeroes = [...heroes]
    heroes.sort(compare);
    return sortedHeroes;
  }
}
