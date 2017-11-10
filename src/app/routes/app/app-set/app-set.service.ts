import { Injectable } from '@angular/core';
import {AjaxService} from '../../../core/services/ajax.service';
import {AppComponent} from '../../../app.component';

@Injectable()
export class AppSetService {

  constructor(public ajax:AjaxService) { }

  /**
   * 删除模板信息
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

  /**
   * 发布首页
   * @param url
   * @param data
   */
  release(url,data) {
    this.ajax.get({
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
