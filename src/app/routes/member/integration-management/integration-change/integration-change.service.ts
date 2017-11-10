import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {AppComponent} from "../../../../app.component";
import {isNull} from "util";
import {Page} from "../../../../core/page/page";

@Injectable()
export class IntegrationChangeService {

  constructor(public ajax: AjaxService) { }

  /**
   * 查询可充值重消币方法
   * @param requestUrl
   * @param requestDate
   * @param back
   * @returns {any}
   */
  getData(requestUrl, requestDate) {
    let result, me = this;
    me.ajax.get({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        if (res.success) {
          result = res.data;
        } else {

        }
      },
      error: (res) => {

      }
    });
    return result;
  }
}
