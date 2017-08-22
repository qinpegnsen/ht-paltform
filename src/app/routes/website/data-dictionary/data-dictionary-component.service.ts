import {Injectable} from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {isNull} from "util";

// const swal = require('sweetalert');
@Injectable()
export class DataDictionaryComponentService {


  constructor(private ajax: AjaxService) {
  }

  ngOnInit() {

  }

  //查询字典key列表
  getdataservice(requestData) {
    let result;
    this.ajax.get({
      url: "/datadict/querryDatadictTypeList",
      data: requestData,
      async: false,
      success: (res) => {
        if (res.success && !isNull(res.data)) {
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
