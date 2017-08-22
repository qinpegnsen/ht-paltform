import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {isNullOrUndefined} from "util";
import {Page} from "../../core/page/page";
const swal = require('sweetalert');

@Injectable()
export class GoodsService {

  constructor(private ajax: AjaxService) { }

  /**
   * 查询列表或详细信息
   * @param requestUrl
   * @param requestData
   * @returns {any}
   */
  getData(requestUrl, requestData,pointer?) {
    let result;
    this.ajax.get({
      url: requestUrl,
      data: requestData,
      async: false,
      success: (res) => {
        if (res.success && !isNullOrUndefined(res)) {
          result = res.data;
          console.log("█ result ►►►",  result);
          if(!isNullOrUndefined(pointer)){
            pointer.kinds = new Page(result)
          }
        }
      },
      error: (res) => {
        console.log('result', res);
      }
    });
    return result;
  }

}
