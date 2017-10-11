import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {isNull} from "util";
import {Page} from "../../../../core/page/page";

@Injectable()
export class BankTransferService {

  constructor(private ajax: AjaxService) { }
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
        console.log("█ res ►►►",  res);
        if (!isNull(data)) {
          if(res.success){
            result=res;
          }else{
            console.log('返回的success为假');
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
