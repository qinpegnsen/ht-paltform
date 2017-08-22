import { Injectable } from '@angular/core';
import {isNull} from "util";
import {AjaxService} from "../../../core/services/ajax.service";

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
}
