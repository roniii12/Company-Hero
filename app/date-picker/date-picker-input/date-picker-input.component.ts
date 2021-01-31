import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DateService } from '../date.service';
import { Idate } from '../date.model';

@Component({
  selector: 'app-date-picker-input',
  templateUrl: './date-picker-input.component.html',
  styleUrls: ['./date-picker-input.component.css']
})
export class DatePickerInputComponent implements OnInit, OnChanges {

  @Input() startDate:boolean = false;
  @Input() date:string = ""
  @Input() dateVal:Date;
  @Output() arrowClick = new EventEmitter<Idate>()

  currentDate:Date = new Date();

  isPervArrowDisabled=false;
  isNextArrowDisabled=false;

  constructor(
    private dateService:DateService
  ) { }

  ngOnInit(): void {
    this.currentDate.setHours(0);
    this.dateVal.setHours(23);
    this.date = this.dateService.setDateValueFormat(this.dateVal)
    this.setDisabledOfArrow();
  }
  get DateVal(){
    return this.dateVal.getTime();
  }
  set DateVal(number:number){
    number-=this.DateVal;
    this.dateVal = new Date(this.dateVal.getTime()+number*1000*60*60*24);
    this.date = this.dateService.setDateValueFormat(this.dateVal)
  }
  ngOnChanges(){
    this.dateVal.setHours(23);
    this.date = this.dateService.setDateValueFormat(this.dateVal)
    this.setDisabledOfArrow();
  }

  onArrowClick(arrowType:string){
    if(arrowType==='next')
      this.DateVal++;
    else if(arrowType==='perv')
      this.DateVal--;
    this.arrowClick.emit({date:this.dateVal,value:this.date})
    this.setDisabledOfArrow();
  }

  setDisabledOfArrow(){
    let tempDate:Date = new Date(this.dateVal);
    tempDate.setDate(tempDate.getDate()-1);
    if(tempDate<this.currentDate)
      this.isPervArrowDisabled=true;
    else
      this.isPervArrowDisabled=false;
    tempDate.setDate(tempDate.getDate()+2);
    if(this.dateVal.getMonth()===11 && tempDate.getMonth()===0)
      this.isNextArrowDisabled=true;
    else
      this.isNextArrowDisabled = false
  }

}
