import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../../core/services/ajax.service";
import {isNull} from "util";
import {AppComponent} from "../../../../../app.component";

@Injectable()
export class NavService {

  constructor(private ajax: AjaxService) { }

  /**
   * 查询文章状态总数,这个不能用公共的服务的原因在于数据结构不一样，直接返回的是data
   * @param data
   * @param url
   * @returns {Page}
   */
  public queryTotalRow(url,data) {
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success){
            result=data;
          }else{
            AppComponent.rzhAlt("error", data.info);
          }
        }else{
          console.log('查询文章状态总数 返回的数据为空');
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }
}
