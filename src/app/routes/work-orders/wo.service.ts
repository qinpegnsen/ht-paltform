import { Injectable } from '@angular/core';
import {SubmitService} from "../../core/forms/submit.service";
import {AjaxService} from "../../core/services/ajax.service";

@Injectable()
export class WoService {

  constructor(public submit: SubmitService,public ajax: AjaxService) { }

  /**
   * 平台接单
   * @param wono 工单编号
   */
  acceptNa(wono){
    let me = this, url, data;
    url = '/wo/updateWoToNa';
    data = {
      wono: wono
    }
    me.submit.putRequest(url, data)
  }

}
