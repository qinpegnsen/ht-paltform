import { Injectable } from '@angular/core';
import {SubmitService} from "../../core/forms/submit.service";

@Injectable()
export class WoService {

  constructor(private submit: SubmitService) { }

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
