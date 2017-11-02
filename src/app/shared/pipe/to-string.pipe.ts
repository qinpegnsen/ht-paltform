import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toString'
})
export class ToStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(typeof value == 'string'){
      return value;
    }else if(typeof value == 'object'){
      return JSON.stringify(value)
    }
  }

}
