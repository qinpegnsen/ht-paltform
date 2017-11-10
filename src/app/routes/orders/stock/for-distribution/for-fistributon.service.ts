import { Injectable } from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {AjaxService} from '../../../../core/services/ajax.service';

@Injectable()
export class ForFistributonService {

  constructor(public ajax:AjaxService) { }

  /**
   * 改变订单状态（设置配货）
   */
  ordno(url,data) {
    this.ajax.put({
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
