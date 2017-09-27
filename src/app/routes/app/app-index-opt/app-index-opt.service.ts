import { Injectable } from '@angular/core';
import {AjaxService} from '../../../core/services/ajax.service';
import {isNull} from 'util';
import {AppComponent} from '../../../app.component';

@Injectable()
export class AppIndexOptService {

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

  /**
   * 删除代理商信息
   * @param url
   * @param data
   */
  delCode(url,data) {
    this.ajax.post({
      url:url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        if(data.success){
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        console.log('连接数据库失败');
      }
    });
  }

}
