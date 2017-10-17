import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strToNumber'
})
export class StrToNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Number(value);
  }

}
