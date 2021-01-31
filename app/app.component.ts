import { Component } from '@angular/core';
import { localeHe } from '@mobiscroll/angular';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'google-flights';
  min = new Date();
  max = new Date(this.min.getFullYear(), this.min.getMonth() + 6, this.min.getDate());
  public localeHe = localeHe;
  public vegetables: { [key: string]: Object }[] = [
    { "Vegetable": "Cabbage", "Category": "Leafy and Salad", "Id": "item1" },
    { "Vegetable": "Chickpea", "Category": "Beans", "Id": "item2" },
    { "Vegetable": "Garlic", "Category": "Bulb and Stem", "Id": "item3" },
    { "Vegetable": "Green bean", "Category": "Beans", "Id": "item4" },
    { "Vegetable": "Horse gram", "Category": "Beans", "Id": "item5" },
    { "Vegetable": "Nopal", "Category": "Bulb and Stem", "Id": "item6" },
    { "Vegetable": "Onion", "Category": "Bulb and Stem", "Id": "item7" },
    { "Vegetable": "Pumpkins", "Category": "Leafy and Salad", "Id": "item8" },
    { "Vegetable": "Spinach", "Category": "Leafy and Salad", "Id": "item9" },
    { "Vegetable": "Wheat grass", "Category": "Leafy and Salad", "Id": "item10" },
    { "Vegetable": "Yarrow", "Category": "Leafy and Salad", "Id": "item11" }
  ];
// map the groupBy field with category column
  public checkFields: Object = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
  // set the placeholder to the MultiSelect input
  public checkWaterMark: string = 'Select vegetables';
  // set enableGroupCheckBox value to the Multiselect input
  public enableGroupCheckBox: boolean = true;
  // set mode value to the multiselect input
  public mode: string = 'CheckBox';
  // set filterBarPlaceholder value to the Multiselect input
  public filterBarPlaceholder: string = 'Search Vegetables'
  public maxSelection: number = 3;
  locations: Ilocation[] = [
    { name: "New York", type: "city", parent:"USA", children:[{
      name:"John F. Kennedy International Airport", type:"airport",symbol:'JFK'
    },{
      name:"LaGuardia Airport", type:"airport",symbol:'LGA'
    }]},
    {
      name: "Tel Aviv", type: "city", parent:"Isreal", children:[{
        name: "Ben Gurion", type:"airport", symbol:"TLV"
      }]
    },{
      name: "Israel", type: "country"
    },{
      name: "USA", type: "country"
    }
  ];
}

interface Ilocation {
  name: string;
  type: string;
  parent?: string;
  symbol?: string;
  children?: Ilocation[];
}
