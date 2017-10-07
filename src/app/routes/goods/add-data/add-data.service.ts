import { Injectable } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {isNull} from "util";
import {Page} from "../../../core/page/page";

@Injectable()
export class AddDataService {

  constructor(private ajax: AjaxService) { }

  /**
   * @param data
   * @param url
   * @returns {Page}
   */
  public addGoodsBaseEnum(url,data) {
    var result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success==true){
            result=new Page(data.data);
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
