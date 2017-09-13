import { Injectable } from '@angular/core';
import {AppComponent} from "../../../app.component";
import {AjaxService} from "../../../core/services/ajax.service";

@Injectable()
export class AddFormworkService {

  constructor(private ajax: AjaxService) { }

  /**
   * 删除运费模板信息
   * @param url
   * @param data
   */
  delCode(url,data) {
    this.ajax.del({
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
