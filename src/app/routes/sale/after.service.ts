import { Injectable } from '@angular/core';
import {SubmitService} from "../../core/forms/submit.service";

@Injectable()
export class AfterService {

  constructor(private submit:SubmitService) { }

  /**
   * 根据售后编号查询物流信息
   * @param afterNo
   */
  public getOrderLogisticsData(afterNo){
    let url = '/after/loadAfterTail';
    let data = {afterNo: afterNo};
    return this.submit.getData(url, data);
  }

  public loadReqByAfterNo(requestData){
    let url = '/after/loadReqByAfterNo';
    return this.submit.getData(url, requestData);
  }

  public loadReqByWono(requestData){
    let url = '/after/loadReqByWono';
    return this.submit.getData(url, requestData);
  }

}
