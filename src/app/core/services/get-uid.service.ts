import { Injectable } from '@angular/core';
import {AjaxService} from "./ajax.service";
import {isNull} from "util";
const swal = require('sweetalert');
@Injectable()
export class GetUidService {

  constructor(public ajax: AjaxService) { }

  /**
   * 获取暗码的服务，并且把暗码返回出去
   */
  public getUid() {
    var that=this;
    let result;
    that.ajax.get({
      url: '/upload/basic/uid',
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success){
            result=data.data;
          }else{
            let info=data.info;
            swal(info,'','error')
          }
        }else{
          console.log('/upload/basic/uid 返回的数据为空');
        }
      },
      error: () => {
        swal('连接数据库失败','','error')
      }
    });
    return result;
  }

}
