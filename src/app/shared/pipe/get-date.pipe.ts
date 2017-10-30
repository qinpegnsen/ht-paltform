import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'getDate'
})
export class GetDatePipe implements PipeTransform {

   transform(value: any, args?: any): any {
    if(isNullOrUndefined(value)) return null;
    else {
      let val =  new Date(value);
      return val.getDate();
    }
  }

}
