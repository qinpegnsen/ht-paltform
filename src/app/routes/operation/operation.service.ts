import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";

@Injectable()
export class OperationService {

  constructor(private ajax: AjaxService) { }

  /**
   * POST 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  postRequest(submitUrl, submitData, back?: boolean) {
    let me = this, result;
    me.ajax.post({
      url: submitUrl,
      data: submitData,
      async: false,
      success: (res) => {
        result=res.success;
        AppComponent.rzhAlt("success", res.info);
      },
      error: () => {
        result='';
        AppComponent.rzhAlt("error", "请输入数字类型");
      }
    })
    return result;
  }
}
