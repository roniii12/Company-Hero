import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, DoCheck, Output, EventEmitter, OnChanges } from '@angular/core';
import { Idate } from '../date.model';

@Component({
  selector: 'app-date-picker-calendar',
  templateUrl: './date-picker-calendar.component.html',
  styleUrls: ['./date-picker-calendar.component.css']
})
export class DatePickerCalendarComponent implements OnInit,OnChanges {

  @Input() year = new Date().getFullYear();
  @Input() month:number = new Date().getMonth();
  @Input() startDate:Date = new Date();
  @Input() EndDate:Date = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()+7);
  @Input() isStartDateFocus:boolean = true;
  @Output() clickOnDate = new EventEmitter<Idate>();
  monthStr:string = "";
  numDaysInMonth:number;
  matrizDaysInMonth:Array<Idate>[]=[];
  constructor(public datePip: DatePipe) { }

  ngOnInit(): void {
    this.numDaysInMonth = new Date(this.year,this.month+1,0).getDate();
    this.initMonthStr();
    this.initMatrizDaysInMonth();
  }
  ngOnChanges(){
    this.numDaysInMonth = new Date(this.year,this.month+1,0).getDate();
    // this.EndDate = new Date(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()+7);
    this.initMonthStr();
    this.initMatrizDaysInMonth();
  }
  initMatrizDaysInMonth(){
    let week = 0;
    this.matrizDaysInMonth[week] = [];
    for(let i=1;i<=this.numDaysInMonth;i++){
      let tempDate:Date = new Date(this.year,this.month,i);
      let resDay:Idate;
      resDay = this.setObjectSpecificDate(tempDate)
      this.matrizDaysInMonth[week][tempDate.getDay()]=resDay;
      if(tempDate.getDay()===6){
        week++;
        this.matrizDaysInMonth[week] = [];
      }
    }
  }
  setObjectSpecificDate(tempDate:Date){
    let dateValue:string = this.datePip.transform(tempDate,'EE,MMM d')||"";
    let result:Idate = {day:tempDate.getDate(),type:"regular",date:tempDate,value:dateValue}
    let  currentDate = new Date;
    currentDate.setHours(0);
    tempDate.setHours(23);
    if(tempDate.getDate()===this.startDate.getDate() && tempDate.getMonth()===this.startDate.getMonth() && tempDate.getFullYear()===this.startDate.getFullYear()){
      result.type="start";
    }
    else if(tempDate.getDate()===this.EndDate.getDate() && tempDate.getMonth()===this.EndDate.getMonth() && tempDate.getFullYear()===this.EndDate.getFullYear()){
      result.type="end";
    }
    else if(tempDate<currentDate || this.isStartDateFocus===false &&tempDate<this.startDate){
      result.type = "disabled"
    }
    else if(tempDate>this.startDate && tempDate<this.EndDate){
      result.type="between";
    }
    return result;
  }
  onDayClick(date:Idate){
    this.clickOnDate.emit(date);
  }
  initMonthStr(){
    switch(this.month){
      case 0:
        this.monthStr='January';
        break;
      case 1:
        this.monthStr='February';
        break;
      case 2:
        this.monthStr='March';
        break;
      case 3:
        this.monthStr='April'
        break;
      case 4:
        this.monthStr='May'
        break;
      case 5:
        this.monthStr='June'
        break;
      case 6:
        this.monthStr='July'
        break;
      case 7:
        this.monthStr='August'
        break;
      case 8:
        this.monthStr='September'
        break;
      case 9:
        this.monthStr='October'
        break;
      case 10:
        this.monthStr='November'
        break;
      case 11:
        this.monthStr='December'
        break;
    }
  }
}
