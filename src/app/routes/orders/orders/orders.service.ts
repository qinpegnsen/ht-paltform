import {Injectable} from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {isNullOrUndefined} from "util";

@Injectable()
export class OrdersService {

  constructor(private submit: SubmitService) {
  }

  /**
   * 获取订单状态及物流信息
   * @param ordno
   * @returns {{orderStates: any, orderLogistics: any}}
   */
  public getOrderState(ordno) {
    let orderStates, orderLogistics;
    orderStates = this.submit.getData('/ord/tail/queryList', {ordno: '1234123451235'});
    if (!isNullOrUndefined(orderStates) && orderStates.length > 0) {
      for (let item of orderStates) {
        if (item.state == 'DELIVERY') {
          orderLogistics = item;
        }
      }
    }
    return {
      orderStates: orderStates,
      orderLogistics: orderLogistics
    }
  }
}