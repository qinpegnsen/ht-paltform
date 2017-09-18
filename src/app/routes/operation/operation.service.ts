
import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";

@Injectable()
export class OperationService {

  constructor(private ajax: AjaxService) { }

  /**
   * POST 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  postRequest(submitUrl, submitData, back?: boolean) {
    let me = this, result;
    me.ajax.post({
      url: submitUrl,
      data: submitData,
      async: false,
      success: (res) => {
        result=res.success;
        if(res.success){
          AppComponent.rzhAlt("success", res.info);
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: () => {
        result='';
        AppComponent.rzhAlt("error", "请输入数字类型");
      }
    })
    return result;
  }


  /**
   * get 请求   获取关联的商品
   * @param url
   * @param data
   * @returns {any}
   */
  linkGoods(url, data) {
    let me = this, result;
    me.ajax.get({
      url: url,
      data: data,
      async: false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error", '关联商品连接服务错误');
      }
    })
    return result;
  }


  /**
   * get 请求   获取关联的商品
   * @param url
   * @param data
   * @returns {any}
   */
  linkGoods(url, data) {
    let me = this, result;
    me.ajax.get({
      url: url,
      data: data,
      async: false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error", '关联商品连接服务错误');
      }
    })
    return result;
  }

  /**
   * POST 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  addproblem(submitUrl, submitData, back?: boolean) {
    let me = this, result;
    me.ajax.post({
      url: submitUrl,
      data: submitData,
      async: false,
      success: (res) => {
        if (res.success) {
          console.log("█ res ►►►",  res);
          result = res.info;
        } else {
          let errorMsg;
          if (isNullOrUndefined(res.data)) {
            result = res.info;
            AppComponent.rzhAlt("error",result );
          } else {
            errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
          }
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", '网络错误');
      }
    })
    return result;
  }

}
