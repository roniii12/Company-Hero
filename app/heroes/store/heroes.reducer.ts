import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { Hero } from '../hero.model';

import * as HeroesActions from './heroes.actions'

export const heroesFeatureKey = 'heroes';

export interface State {
  heroes:Hero[];
  error:string;
}

export const initialState: State = {
  heroes:[],
  error:null
};


export const Heroesreducer = createReducer(
  initialState,
  on(HeroesActions.setHeroes,(state,action) =>
  {
    return{
      ...state,
      error:null,
      heroes: action.Heroes
    }
  }),
  on(HeroesActions.updateHeroPowerSuccess,(state,action) => {
    let index;
    state.heroes.forEach((hero,i)=>{
      if(hero._guid===action._guid){
        index = i;
        return i;
      }
    })
    let updatedHeroes = [...state.heroes];
    let updatedHero = {...state.heroes[index],currentPower:action.power};
    updatedHeroes[index]={...updatedHero}
    return{
      ...state,
      error:null,
      heroes:updatedHeroes
    }
  }),
  on(HeroesActions.heroesFail,(state,action)=>({
    ...state,
    error:action.errorMsg
  })),
  on(HeroesActions.clearError,(state)=>({
    ...state,
    error:null
  }))
);

