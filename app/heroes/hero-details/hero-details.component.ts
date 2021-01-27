import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer'
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeroesService } from '../heroes.service';
import { Hero } from '../hero.model';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit, OnDestroy {

  private subscription:Subscription;
  public hero:Hero;
  constructor(
    private route: ActivatedRoute,
    private heroesService:HeroesService
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      map(params=>params['id'])
    ).subscribe((guid:string)=>{
      let hero = this.heroesService.getHero(guid);
      if(!hero){
        this.heroesService.fetchHeroes(guid);
      }
      else
        this.hero = hero;
    })
    this.heroesService.heroChange.subscribe((hero:Hero)=>{
      this.hero = hero;
    })
  }
  async onTrainButtonClick(){
    let improvmentPower = Math.random() * 5 + 5;
    improvmentPower /= 100;
    improvmentPower = +improvmentPower.toFixed(3) + 1;
    const heroUpdated = {...this.hero,currentPower:this.hero.currentPower*improvmentPower};
    this.heroesService.updateHero(heroUpdated);
  }
  ngOnDestroy(){
    this.heroesService.heroChange.unsubscribe();
  }
}
