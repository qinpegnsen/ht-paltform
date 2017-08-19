import { Injectable } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');

@Injectable()
export class KindService {

  constructor(private ajax: AjaxService) { }

  /**
   * 查询列表
   * @param requestUrl
   * @param requestData
   * @returns {any}
   */
  getListpage(requestUrl, requestData) {
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
