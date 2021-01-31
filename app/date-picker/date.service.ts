import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';

@Injectable({providedIn:'root'})
export class DateService{

  constructor(
    private datePip:DatePipe
  ){}

  setDateValueFormat(date:Date){
    return this.datePip.transform(date,'EE,MMM d')||"";
  }

}
