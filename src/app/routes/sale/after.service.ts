import { Injectable } from '@angular/core';
import {SubmitService} from "../../core/forms/submit.service";
import {isNullOrUndefined} from "util";

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

  public loadAfterTailList(requestData){
    let url = '/after/loadAfterTailList';
    return this.submit.getData(url, requestData);
  }

  public loadReqByWono(requestData){
    let url = '/after/loadReqByWono';
    return this.submit.getData(url, requestData);
  }

  /**
   * 获取物流公司及运单号
   * @param ordno
   * @returns {any}
   */
  public getExpressInfo(ordno) {
    let url = '/ord/tail/loadByDelivery';
    let data = {
      ordno: ordno
    }
    let expressData = this.submit.getData(url, data);
    if (!isNullOrUndefined(expressData)) return expressData;
  }

}
