import { Injectable } from '@angular/core';
import {AppComponent} from "../../app.component";
import {AjaxService} from "../../core/services/ajax.service";

@Injectable()
export class MemberService {

  constructor(private ajax: AjaxService) { }

  /**
   * 获取红包流水的明细
   * @param url
   * @param data
   * @returns {any}
   */
  queryRpCustAcctRecAdmin(url, data) {
    let me = this, result;
    me.ajax.get({
      url: url,
      data: data,
      async: false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    })
    return result;
  }

}
