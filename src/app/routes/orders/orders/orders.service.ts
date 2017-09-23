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

  /**
   * 根据订单编号查询物流信息
   * @param ordno
   */
  public getOrderLogisticsData(ordno){
    let url = '/ord/tail/queryDeliveryList';
    let data = {ordno: '1234123451235'};
    return this.submit.getData(url, data);
  }

  /**
   * 查询物流公司列表
   */
  public getBasicExpressList(){
    let url = '/basicExpress/pageQueryBasicExpress';
    let list = this.submit.getData(url, '');
    if(!isNullOrUndefined(list) && !isNullOrUndefined(list.voList))
    return list.voList;
  }
}
