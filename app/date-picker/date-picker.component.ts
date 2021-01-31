import { Component, DoCheck, OnInit, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { DatePickerCalendarComponent } from './date-picker-calendar/date-picker-calendar.component';
import { Idate } from './date.model';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  private month:number;
  readonly currentMonth:number = new Date().getMonth();
  readonly currentDate = new Date()
  year:number=new Date().getFullYear();
  @Input() startDate:Idate={date:new Date(),value:""};
  @Input() endDate:Idate={value:"",date:new Date(new Date().getTime()+7*1000*60*60*24)};
  @Input() isStartDatefocus:boolean = true;
  inputSub:Subscription;
  @ViewChild(PlaceholderDirective,{static:true}) calendarBoard:PlaceholderDirective
  constructor(
    private componentFactoryResolver:ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.currentDate.setHours(0);
    this.currentDate.setMinutes(0);
    this.month=new Date().getMonth();
    this.createCalendarBoard();
  }

  // ngDoCheck(){
  //   // console.log(this.month);
  // }

  get Month():number{
    return this.month;
  }
  set Month(number:number){
    this.month=number;
  }
  onArrowButton(status:string){
    if(status==='next')
      this.Month++;
    else
      this.Month--
    this.createCalendarBoard();
  }
  onInputClick(inputType:string){
    if(inputType==='start')
      this.isStartDatefocus=true;
    else
      this.isStartDatefocus=false;
  }
  createCalendarBoard(){
    if(this.calendarBoard){
      const calendarCmp=this.componentFactoryResolver.resolveComponentFactory(
        DatePickerCalendarComponent
      );
      const hostViewContainerRef = this.calendarBoard.viewContainerRef;
      hostViewContainerRef.clear();
      const componentRef1 = hostViewContainerRef.createComponent(calendarCmp);
      const componentRef2 = hostViewContainerRef.createComponent(calendarCmp);
      componentRef1.instance.month=this.Month;
      this.initCalendarCmp(componentRef1);
      componentRef2.instance.month =this.Month+1;
      this.initCalendarCmp(componentRef2);
      this.inputSub = componentRef1.instance.clickOnDate.subscribe((date:Idate)=>{
        this.calendarEvent(componentRef1,date);
        this.isStartDatefocus = !this.isStartDatefocus
        this.calendarEvent(componentRef2,date);
      })
      this.inputSub = componentRef2.instance.clickOnDate.subscribe((date:Idate)=>{
        this.calendarEvent(componentRef2,date);
        this.isStartDatefocus = !this.isStartDatefocus
        this.calendarEvent(componentRef1,date);
      })
    }
  }
  initCalendarCmp(cmpRef:any){
    cmpRef.instance.startDate=this.startDate.date;
    cmpRef.instance.EndDate=this.endDate.date;
    cmpRef.instance.isStartDateFocus = this.isStartDatefocus;
  }
  calendarEvent(cmpRef:any, date:Idate){
    date.date.setHours(23);
    const tipRange:boolean = date.type==='start'|| date.type==='end';
    const isIlegall:boolean = date.date < this.currentDate
    || (this.isStartDatefocus===true && date.date > this.endDate.date)
    || (this.isStartDatefocus===false && date.date < this.startDate.date);
    if(this.isStartDatefocus===true && !tipRange && !isIlegall)
      this.startDate=date;
    else if(this.isStartDatefocus===false && !tipRange && !isIlegall)
      this.endDate=date;
    this.isStartDatefocus = !this.isStartDatefocus;
    this.initCalendarCmp(cmpRef);
    cmpRef.instance.ngOnChanges();
  }
}
