import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined} from "util";
import {RzhtoolsService} from "../../core/services/rzhtools.service";

@Pipe({
  name: 'level2AreaName'
})
export class Level2AreaNamePipe implements PipeTransform {
  constructor(private tools: RzhtoolsService) {  }

  /**
   * 根据区域编码获取区域全称
   * @param value 12位区域编码
   * @param args
   * @returns {string} 地址全称
   */
  transform(value: any, args?: any): any {
    let fullName = [];
    let codes = value.split(',');
    for(let value of codes){
      if(!isNullOrUndefined(value)){
        let result = this.tools.getAreaByTwelveBitCode(value);
        if(!isNullOrUndefined(result) && !isNullOrUndefined(result.fullName)){
          fullName.push(result.fullName);
        }
      }
    }
    return fullName.join('、');
  }

}
