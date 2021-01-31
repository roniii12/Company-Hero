import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer'
import * as AuthActions from './auth/store/auth.actions'
import { HeroesService } from './heroes/heroes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  constructor(
    private store: Store<fromApp.AppState>,
    private heroesService:HeroesService
  ) {}
  ngOnInit(){
    this.store.dispatch(new AuthActions.AutoLogin());
  }
  ngOnDestroy(){
    this.heroesService.heroesChange.unsubscribe();
    this.heroesService.errorChange.unsubscribe();
    this.heroesService.heroChange.unsubscribe();
  }
}
