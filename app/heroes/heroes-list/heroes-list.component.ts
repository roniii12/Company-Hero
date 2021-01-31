import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {

  heroes:Hero[]
  filtered:string = "";

  constructor(
    private heroesService:HeroesService
  ) { }

  ngOnInit(): void {
    this.heroesService.heroesChange.subscribe((heroes:Hero[])=>{
      this.heroes = heroes
    })
  }
}
