import { Injectable } from '@angular/core';
import {isNull} from "util";
import {AjaxService} from "../../../core/services/ajax.service";
import {AppComponent} from "../../../app.component";
@Injectable()
export class AdddataService {

  constructor(private ajax: AjaxService) { }

  getaddData(requestData) {
    let result;
    this.ajax.post({
      url: "/datadict/addDatadictType",
      data: requestData,
      async: false,
      success: (res) => {
        console.log(res)
        if (res.success && !isNull(res.data)) {
          result = res.data;
        }else{
          console.log(123)
        }
      },
      error: (res) => {
        console.log('res', res);
      }
    });
    return result;
  }

  /**
   * t通过id查询分类
   * @param url
   * @param data
   * @returns {any}
   */
  public queryClassById(url,data) {
    var result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success==true){
            result=data.data;
            let info=data.info;
          }else{
            console.log('aa 返回的success为假');
          }
        }else{
          console.log('aa 返回的数据为空');
        }
      },
      error: () => {
        AppComponent.rzhAlt("error","操作失败");
      }
    });
    return result
  }

  public addClass(url,data) {
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success==true){
            AppComponent.rzhAlt("success",data.info);
          }else{
            console.log('addDatadict 返回的success为假');
          }
        }else{
          console.log('addDatadict 返回的数据为空');
        }
      },
      error: (data) => {
        AppComponent.rzhAlt("error",'分类用户已存在');
      }
    });
  }

  public updateClass(url,data) {
    var result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success==true){
            result=data.data;
            let info=data.info;
            AppComponent.rzhAlt("success",info);
          }else{
            console.log('/datadict/updateDatadict 返回的success为假');
          }
        }else{
          console.log('/datadict/updateDatadict 返回的数据为空');
        }
      },
      error: (data) => {
        AppComponent.rzhAlt("error","修改用户失败");
      }
    });
    return result
  }

}
