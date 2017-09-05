import { Injectable } from '@angular/core';
import {isNullOrUndefined} from "util";
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";
const swal = require('sweetalert');

@Injectable()
export class GoodsService {

  constructor(private ajax: AjaxService) { }
  /**
   * get 获取数据
   * @param requestUrl
   * @param requestData
   * @returns {any}
   */
  getSkuData(requestUrl: string, requestData: any) {
    let result: any;
    this.ajax.post({
      url: requestUrl,
      data:  JSON.stringify(requestData),
      async: false,
      contentType: "application/json",
      success: (res) => {
        if (!isNullOrUndefined(res) && res.success) result = res;
      },
      error: (res) => {
        console.log('get data error', res);
      }
    });
    return result;
  }

  /**
   * 发布商品
   * @param requestUrl
   * @param requestData
   * @returns {any}
   */
  publishGoods(requestUrl: string, requestData: any){
    let me = this;
    me.ajax.post({
      url: requestUrl,
      data: JSON.stringify(requestData),
      async: false,
      contentType: "application/json",
      success: (res) => {
        console.log("█ res ►►►", res);
        if (res.success) {
          swal({
            title: '成功',
            text: res.info,
            type: 'success',
            timer: 3000, //关闭时间，单位：毫秒
            showConfirmButton: false  //不显示按钮
          });
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
        console.log("post error");
      }
    })
  }
}
