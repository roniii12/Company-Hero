import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SharedModule } from './shared/shared.module';
import { SelectInputComponent } from './select-input/select-input.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePickerCalendarComponent } from './date-picker/date-picker-calendar/date-picker-calendar.component';
import { DatePipe } from '@angular/common';
import { DatePickerInputComponent } from './date-picker/date-picker-input/date-picker-input.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectInputComponent,
    DatePickerComponent,
    DatePickerCalendarComponent,
    DatePickerInputComponent,
  ],
  imports: [
    FormsModule,
    MbscModule,
    BrowserModule,
    AppRoutingModule,
    MultiSelectAllModule,
    NumericTextBoxModule,
    CheckBoxModule,
    ButtonModule,
    SharedModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
