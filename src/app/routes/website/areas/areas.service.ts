import { Injectable } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {Page} from "../../../core/page/page";

@Injectable()
export class AreasService {
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

  public controlDatas(url,data) {
    let me = this,result;
    me.ajax.get({
      url:url,
      data: data,
      async:false,
      success: (data) => {
        result = data;
               //me.table.voList = data.data;

        //me.areas = new Page(me.table);

      },
      error: (data) => {
        console.log("获取地区错误");
      }
    });
    return result;
  }
}
