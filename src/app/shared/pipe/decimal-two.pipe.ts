import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'decimalTwo'
})
export class DecimalTwoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(isNullOrUndefined(value) || value == '') value = 0;
    let val = Number(value).toFixed(2);
    return val;
  }

}
