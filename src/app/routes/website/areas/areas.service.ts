import { Injectable } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {Page} from "../../../core/page/page";
import {AppComponent} from "../../../app.component";

@Injectable()
export class AreasService {
  public areas:Page= new Page();
  public table = {
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

  constructor(public ajax: AjaxService) { }

  /**
   * 查询地区列表信息
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
               //me.table.voList = data.data;

        //me.areas = new Page(me.table);

      },
      error: (data) => {
        console.log("获取地区错误");
      }
    });
    return result;
  }

  /**
   * 删除区域信息
   * @param url
   * @param data
     */
  delCode(url,data) {
    this.ajax.del({
      url:url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        if(data.success){
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        console.log('连接数据库失败');
      }
    });
  }
}
