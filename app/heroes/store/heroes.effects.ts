import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';

import * as HeroesActions from './heroes.actions'
import * as fromApp from '../../store/app.reducer'

import { Hero } from '../hero.model';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { LoggingService } from '../../shared/logging.service';
import { HeroesService } from '../heroes.service';



@Injectable()
export class HeroesEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    public store: Store<fromApp.AppState>,
    private loggingService:LoggingService,
    private heroesService:HeroesService
    ) {}

  handleError(errRes){
    this.loggingService.printLog(errRes)
    let errorMessage = "An unknown error occurred"
    if(!errRes.error||!errRes.error.error)
      return of(HeroesActions.heroesFail({errorMsg: errorMessage}));
    switch(errRes.error.error.message.toUpperCase()){
      case 'UNAUTHORIZED':
        errorMessage = 'Please log out and log in back';
        break;
      case 'UNKNOWN_HERO':
        errorMessage = 'This hero did not found in DB';
        break;
      case 'MAX_DAY_TRAINING':
        errorMessage = 'This hero received today maximum of training number on day'
    }
    return of(HeroesActions.heroesFail({errorMsg: errorMessage}));
  }

  @Effect()
  fetchHeroes=this.actions$.pipe(
    ofType(HeroesActions.fetchHeroes),
    switchMap((action)=>{
      return this.http.get<Hero[]>(
        'http://localhost:3000/getAllHeroes'
      ).pipe(
        map((heroes:Hero[])=>{
          this.loggingService.printLog(heroes);
          return HeroesActions.setHeroes({Heroes:heroes})
        }),
        catchError(errorRes=>{
          return this.handleError(errorRes);
        })
      )
    })
  );

  @Effect()
  updateHero=this.actions$.pipe(
    ofType(HeroesActions.updateHeroPower),
    switchMap((action)=>{
      return this.http.post<Hero>(
        'http://localhost:3000/updatePowerHero',
        action
      ).pipe(
        map((hero:Hero)=>{
          this.loggingService.printLog(hero);
          return HeroesActions.updateHeroPowerSuccess({_guid:hero._guid,power:hero.currentPower})
        }),
        catchError(errorRes=>{
          return this.handleError(errorRes);
        })
      )
    })
  )
  @Effect()
  createHero=this.actions$.pipe(
    ofType(HeroesActions.createHero),
    switchMap((action)=>{
      return this.http.put<Hero>(
        'http://localhost:3000/createHero',
        action
      ).pipe(
        withLatestFrom(this.store.select('heroes')),
        switchMap(([hero,heroesState])=>{
          this.loggingService.printLog(hero)
          const heroesUpdated = [...heroesState.heroes,hero]
          return of(HeroesActions.setHeroes({Heroes: heroesUpdated}));
        }),
        catchError(errRes=>{
          return this.handleError(errRes);
        })
      )
    })
  )
}
