import { Pipe, PipeTransform } from '@angular/core';
import { HeroesService } from './heroes.service';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  constructor(
    private heroesService:HeroesService
  ){}
  transform(value: any, filterString: string, propName: string): any {
    let resultArray = [];
    if(filterString!==''){
      for (const item of value) {
        if (item[propName].toLowerCase().indexOf(filterString.toLowerCase())!==-1) {
          resultArray.push(item);
        }
      }
    }
    else {
      resultArray = value;
    }
    resultArray=this.heroesService.sortHeroes(resultArray);
    return resultArray;
  }

}
