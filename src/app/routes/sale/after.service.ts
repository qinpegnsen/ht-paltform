import { Injectable } from '@angular/core';
import {SubmitService} from "../../core/forms/submit.service";

@Injectable()
export class AfterService {

  constructor(private submit:SubmitService) { }

  /**
   * 根据订单编号查询物流信息
   * @param ordno
   */
  public getOrderLogisticsData(afterNo){
    let url = '/after/loadAfterTail';
    let data = {afterNo: '553402412955017216'};
    return this.submit.getData(url, data);
  }

  public getAfterDetail(afterNo){
    let url = '/after/loadReqByAfterNo';
    let data = {afterNo: afterNo};
    return this.submit.getData(url, data);
  }

}
