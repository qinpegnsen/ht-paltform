import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'decimalTwo'
})
export class DecimalTwoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(isNullOrUndefined(value) || value == '') value = 0;
    let val = value.toString(),result;
    // 如果含小数点
    if(val.indexOf('.') != -1){
      // 如果小数点后有一位
      if(val.split('.')[1].length == 1) {
        result = val + '0';
      }else{// 如果小数点后有至少两位
        result = val.substring(0,val.indexOf('.')+3);
      }
    }else{ // 如果是整数
      result = val + '.00';
    }
    return result;
  }

}
