import { Injectable } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {AjaxService} from "../../../core/services/ajax.service";
import {isNull} from "util";
import {AppComponent} from "../../../app.component";

@Injectable()
export class AgentpersonService {

  constructor(public ajax:AjaxService) { }

  /**
   * 获取代理商列表
   * @param event
   */
  public controlDatas(url,data) {
    var result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          result= new Page(data.data);
        }
      },
      error: (data) => {
        console.log("代理商列表获取失败");
      }
    });
    return result;
  }

  /**
   * 删除代理商信息
   * @param url
   * @param data
   */
  delCode(url,data) {
    this.ajax.put({
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


  /**
   * 重置代理商密码
   * @param url
   * @param data
   */
  pwd(url,data) {
    this.ajax.put({
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
