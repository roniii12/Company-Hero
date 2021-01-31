import { createAction, props } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../hero.model';

export const fetchHeroes = createAction(
  '[Heroes] Fetch Heroes'
);

export const setHeroes = createAction(
  '[Heroes] Set Heroes',
  props<{ Heroes: Hero[] }>()
);

export const updateHeroPower = createAction(
  '[Heroes] Update Hero',
  props<{ _guid: string, power:number }>()
);

export const updateHeroPowerSuccess = createAction(
  '[Heroes] Update Hero Success',
  props<{ _guid:string, power:number }>()
);

export const heroesFail = createAction(
  '[Heroes] Heroes Fail',
  props<{errorMsg:string}>()
);

export const createHero = createAction(
  '[Heroes] Create Hero',
  props<{name:string,ability:string,suitColors:string,power:number}>()
);

export const clearError = createAction(
  '[Heroes] Clear Error'
)

