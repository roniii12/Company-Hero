import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators, Form } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private closeSub: Subscription;
  private storeSub: Subscription;
  authForm:FormGroup
  username:FormControl;
  password:FormControl;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>,
    private router:Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if(authState.user){
        this.router.navigate(['/']);
      }
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.initForm();
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({ username: this.username.value, password: this.password.value })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({ username: this.username.value, password: this.password.value })
      );
    }

    this.initForm();
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm(){
    let usernameAuth = '';
    let passwordAuth = '';
    this.authForm = new FormGroup({
      username: new FormControl(usernameAuth , Validators.required),
      password: new FormControl(passwordAuth,[Validators.required,// this.validatePassword])
      this.isLoginMode?Validators.nullValidator:Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d@$!%*#?&]{8,}/)])
    })
    this.username = <FormControl>this.authForm.get('username');
    this.password = <FormControl>this.authForm.get('password');
  }
}
