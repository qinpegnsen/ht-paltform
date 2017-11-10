import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {isNull} from "util";
import {AppComponent} from "../../../../app.component";

@Injectable()
export class RefundService {

  constructor(public ajax: AjaxService) { }

  public refundTransfer(url,data) {
    let me = this, result;
    me.ajax.put({
      url: url,
      data: data,
      async: false,
      success: (res) => {
        if (res.success) {
          AppComponent.rzhAlt("success", res.info);
          result = res.data;
        } else {
          AppComponent.rzhAlt("error", res.info);
          result = res.info;
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    })
    return result;
  }
}
