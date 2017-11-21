import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";

@Injectable()
export class WebstiteService {

  constructor(private ajax: AjaxService) { }
  /**
   * 新增红包规则 post
   */
  public addRedPackRules(url,data) {
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        result=res.data;
        if(res.success){
          AppComponent.rzhAlt("success", res.info);
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * 获取后台设置的红包的最小的数量 get
   */
  public getSettingNum(url,data) {
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        result=res.data;
        if(res.success){
          // AppComponent.rzhAlt("success", res.info);
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }
}
