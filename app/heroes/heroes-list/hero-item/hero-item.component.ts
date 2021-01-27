import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../hero.model';
import { getuid } from 'process';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.css']
})
export class HeroItemComponent implements OnInit {

  @Input() hero:Hero={_guid: 'sadasd',ability:'attacker',date:new Date(),currentPower:10,name:'Superman',startingPower:5,suiteColors:'red'};

  constructor() { }

  ngOnInit(): void {

  }


}
