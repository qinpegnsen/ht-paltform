import { Injectable } from '@angular/core';
import {isNullOrUndefined} from "util";
import {AjaxService} from "../../core/services/ajax.service";


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
}
