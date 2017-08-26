import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../../core/services/ajax.service";
import {isNull} from "util";

@Injectable()
export class NavService {

  constructor(private ajax: AjaxService) { }

  /**
   * 查询文章状态总数
   * @param data
   * @param url
   * @returns {Page}
   */
  public queryTotalRow(url,data) {
    let result;
    console.log("█ url ►►►",  url);
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success){
            result=data;
          }else{
            console.log('查询文章状态总数 返回的success为假');
          }
        }else{
          console.log('查询文章状态总数 返回的数据为空');
        }
      },
      error: () => {
        console.log('查询文章状态总数 连接数据库失败');
      }
    });
    return result;
  }
}
