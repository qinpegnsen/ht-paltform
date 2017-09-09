import { Injectable } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {Page} from "../../../core/page/page";

@Injectable()
export class FreightTemplateService {

  private areas:Page= new Page();
  private table = {
    curPage:1,
    lastPage:true,
    needCountQuery:false,
    optObject:null,
    optObjectList:null,
    pageSize:20,
    params:{},
    sortColumns:null,
    totalPage:1,
    totalRow:5,
    voList:[]
  }

  constructor(private ajax: AjaxService) { }

  /**
   * 查询运费模板列表信息
   * @param url
   * @param data
   * @returns {any}
   */
  public controlDatas(url,data) {
    let me = this,result;
    me.ajax.get({
      url:url,
      data: data,
      async:false,
      success: (data) => {
        result = data;
      },
      error: (data) => {
        console.log("获取地区错误");
      }
    });
    return result;
  }

}
