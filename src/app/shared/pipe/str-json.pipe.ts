import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strToJson'
})
export class StrJsonPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let result = JSON.parse(value);
    return result;
  }

}
