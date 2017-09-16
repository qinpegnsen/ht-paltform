import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars'
})
export class StarsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let starsStr = '';
    for(let i = 0; i < value; i ++){
      starsStr += '<i class="fa fa-star gold-star">&nbsp;</i>';
    }
    return starsStr;
  }

}
