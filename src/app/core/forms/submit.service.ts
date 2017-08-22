import {Injectable} from '@angular/core';
import {AjaxService} from "../services/ajax.service";
import {SettingsService} from "../settings/settings.service";
import {isNullOrUndefined} from "util";
import {ActivatedRoute} from "@angular/router";
import {AppComponent} from "../../app.component";
const swal = require('sweetalert');

@Injectable()
export class SubmitService {

  constructor(private ajax: AjaxService, private settings: SettingsService, private route: ActivatedRoute) {
  }

  /**
   * POST 请求，并且不需要返回数据
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  postRequest(submitUrl, submitData, back?: boolean) {
    let me = this;
    me.ajax.post({
      url: submitUrl,
      data: submitData,
      async: false,
      success: (res) => {
        // console.log("█ res ►►►", res);
        if (res.success) {
          if(back) this.settings.closeRightPageAndRouteBack()//关闭右侧页面并返回上级路由
          AppComponent.rzhAlt('success',res.info, res.info)
        } else {
          let errorMsg;
          if (isNullOrUndefined(res.data)) {
            errorMsg = res.info
          } else {
            errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
          }
          AppComponent.rzhAlt("error", res.info, errorMsg);
        }
      },
      error: (res) => {
        console.log("post ormData error");
      }
    })
  }

  /**
   * delete 请求，并且不需要返回数据
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  delRequest(requestUrl, requestDate,back?: boolean) {
    // console.log("█ requestDate ►►►",  requestDate);
    this.ajax.del({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        console.log("█ res ►►►", res);
        if (res.success) {
          if(back) this.settings.closeRightPageAndRouteBack()//关闭右侧页面并返回上级路由
          AppComponent.rzhAlt('success',res.info, res.info)
        } else {
          let errorMsg;
          if (isNullOrUndefined(res.data)) {
            errorMsg = res.info
          } else {
            errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
          }
          AppComponent.rzhAlt("error", res.info, errorMsg);
        }
      },
      error: (res) => {
        console.log('result', res);
      }
    });
  }

  /**
   * put 请求，并且不需要返回数据
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  putRequest(requestUrl, requestDate,back?: boolean) {
    // console.log("█ requestDate ►►►",  requestDate);
    this.ajax.put({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        console.log("█ res ►►►", res);
        if (res.success) {
          if(back) this.settings.closeRightPageAndRouteBack()//关闭右侧页面并返回上级路由
          AppComponent.rzhAlt('success',res.info, res.info)
        } else {
          let errorMsg;
          if (isNullOrUndefined(res.data)) {
            errorMsg = res.info
          } else {
            errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
          }
          AppComponent.rzhAlt("error", res.info, errorMsg);
        }
      },
      error: (res) => {
        console.log('result', res);
      }
    });
  }

  /**
   * 获取路由参数
   * @returns {any}
   */
  getParams(param) {
    let val;
    this.route.params.subscribe(params => val = params[param]);
    return val;
  }

  /**
   * get 获取数据
   * @param requestUrl
   * @param requestData
   * @returns {any}
   */
  getData(requestUrl, requestData) {
    let result;
    this.ajax.get({
      url: requestUrl,
      data: requestData,
      async: false,
      success: (res) => {
        if (res.success && !isNullOrUndefined(res)) {
          result = res.data;
          console.log("█ result ►►►",  result);
        }
      },
      error: (res) => {
        console.log('result', res);
      }
    });
    return result;
  }

}
