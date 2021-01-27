import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { User } from './user.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;
  user:User;
  subscription:Subscription;
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
  logout(){
    this.store.dispatch(new AuthActions.Logout());
  }
  fetchUser(){
    this.subscription = this.store.select('auth').pipe(
      map(authState=>authState.user)
    ).subscribe((user:User)=>{
      this.user=user;
    })
  }
  getUser(){
    return this.user;
  }
  isAdmin(){
    if(this.user)
      return this.user.isAdmin;
    this.fetchUser();
    return this.user.isAdmin;
  }
}
