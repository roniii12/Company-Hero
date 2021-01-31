import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromHeroes from '../heroes/store/heroes.reducer'
import * as fromAuth from '../auth/store/auth.reducer'

export interface AppState {
  heroes: fromHeroes.State;
  auth: fromAuth.State;
}

export const appRducer: ActionReducerMap<AppState> = {
  heroes: fromHeroes.Heroesreducer,
  auth: fromAuth.authReducer
};
