import { Injectable } from '@angular/core';
import {Page} from '../../../../core/page/page';
import {isNull} from 'util';
import {AjaxService} from '../../../../core/services/ajax.service';

@Injectable()
export class AllOrderService {

  constructor(private ajax:AjaxService) { }

  /**
   * 获取代理商列表
   * @param event
   */
  public controlDatas(url,data) {
    var result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          result= new Page(data.data);
        }
      },
      error: (data) => {
        console.log("代理商列表获取失败");
      }
    });
    return result;
  }

}
