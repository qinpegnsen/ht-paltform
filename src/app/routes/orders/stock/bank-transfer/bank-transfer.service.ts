import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {isNull} from "util";
import {Page} from "../../../../core/page/page";
import {AppComponent} from "../../../../app.component";

@Injectable()
export class BankTransferService {

  constructor(public ajax: AjaxService) { }
  /**
   * @param data
   * @param url
   * @returns {Page}
   */
  public bankTransfer(url,data) {
    var result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        //console.log("█ res ►►►",  res);
        if (!isNull(data)) {
          if(res.success){
            //console.log("█ res.info ►►►",  res.info);
            result=res;
            AppComponent.rzhAlt("success",res.info);
          }else{
            AppComponent.rzhAlt("errror",res.info);
          }
        }else{
          console.log('返回的数据为空');
        }
      },
      error: () => {
        console.log('连接数据库失败');
      }
    });
    return result;
  }
}
