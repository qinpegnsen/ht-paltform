import { Injectable } from '@angular/core';
import {AjaxService} from '../../../core/services/ajax.service';
import {isNull} from 'util';

@Injectable()
export class AppIndexTplService {

  constructor(private ajax:AjaxService) { }

  /**
   * 获取移动端首页操作类型列表
   * @param event
   */
  public controlDatas(url,data) {
    console.log("█ 2 ►►►",  2);

    var result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          result= data;
        }
      },
      error: (data) => {
        console.log("移动端首页操作类型列表获取失败");
      }
    });
    return result;
  }

}
