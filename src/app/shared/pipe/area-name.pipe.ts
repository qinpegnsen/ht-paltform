import { Pipe, PipeTransform } from '@angular/core';
import {RzhtoolsService} from "../../core/services/rzhtools.service";

@Pipe({
  name: 'areaName'
})
export class AreaNamePipe implements PipeTransform {

  constructor(private tools: RzhtoolsService) {  }

  transform(value: any, args?: any): any {
    // 适用于三级6位区域编码
    return this.tools.getAreaByCode(value).fullName;
  }

}
