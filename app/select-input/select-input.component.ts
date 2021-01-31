import { Component, Input, OnInit, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent implements OnInit {

  @Input() multiSelect = false;
  isShowDropDown:boolean = false;
  isClickInput:boolean = false;
  inputResult:string="";
  inputFilter:string="";
  isHoverToggleButton:boolean=false;
  isHoverListItem:{[key: string]: boolean}={}
  isClickedOnToggleButton:{[key: string]: boolean}={}
  constructor() { }
  ngOnInit(): void {}
  onTargetClick(){
    this.reset();
    this.isShowDropDown = true;
    this.isClickInput= true
  }
  onListClick(name:string){
    this.inputResult = name
    if(!this.multiSelect)
      this.isShowDropDown = false;
    console.log(this.inputResult);
  }
  onClickOutside(){
    if(this.isClickInput===true){
      this.isClickInput=false;
    }
    else{
      this.isShowDropDown=false;
    }
  }
  onHoverToggleButton(){
    this.isHoverToggleButton = true;
  }
  onBlurToggleButton(){
    this.isHoverToggleButton = false;
  }
  onHoverListItem(i:string){
    if(!this.isHoverToggleButton)
      this.isHoverListItem[i] = true;
  }
  onBlurListItem(i:string){
    this.isHoverListItem[i] = false;
  }
  onToggleButtonClick(i:string){
    if(this.isClickedOnToggleButton[i]===true)
      this.isClickedOnToggleButton[i]=false;
    else
      this.isClickedOnToggleButton[i]=true;
  }
  reset(){
    this.inputResult="";
    this.inputFilter="";
    this.isHoverToggleButton = false;
    this.isHoverListItem={}
  }
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

