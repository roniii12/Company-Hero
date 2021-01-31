import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeroesService } from '../heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-edit',
  templateUrl: './heroes-edit.component.html',
  styleUrls: ['./heroes-edit.component.css']
})
export class HeroesEditComponent implements OnInit {

  constructor(
    private heroesService:HeroesService,
    private router:Router
  ) { }
  public createHeroForm:FormGroup;
  public name:FormControl;
  public ability:FormControl;
  public suitColors:FormControl;
  public power:FormControl;

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(){
    console.log('submit')
    if(!this.createHeroForm.valid){
      return
    }
    this.heroesService.createHero(this.name.value,this.ability.value,this.suitColors.value,this.power.value)
    this.router.navigate(['/']);
  }
  private initForm(){
    const heroName ='';
    const heroAbility ='';
    const suitColors='';
    const power='';
    this.createHeroForm=new FormGroup({
      name:new FormControl(heroName,Validators.required),
      ability: new FormControl(heroAbility,Validators.required),
      suitColors: new FormControl(suitColors,Validators.required),
      power: new FormControl(power,[Validators.required,Validators.pattern(/^\d+$/)])
    })
    this.name = <FormControl>this.createHeroForm.get('name');
    this.ability = <FormControl>this.createHeroForm.get('ability');
    this.suitColors = <FormControl>this.createHeroForm.get('suitColors');
    this.power = <FormControl>this.createHeroForm.get('power');
  }
}
