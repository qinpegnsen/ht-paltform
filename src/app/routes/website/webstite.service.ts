import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";

@Injectable()
export class WebstiteService {

  constructor(private ajax: AjaxService) { }
  /**
   * val添加服务
   */
  public addRedPackRules(url,data) {
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        result=res.success;
        if(res.success){
          AppComponent.rzhAlt("success", res.info);
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        result='';
        AppComponent.rzhAlt("error", res.info);
      }
    });
    return result;
  }
}
