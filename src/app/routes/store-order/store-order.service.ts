import { Injectable } from '@angular/core';
import {SubmitService} from '../../core/forms/submit.service';
import {AjaxService} from '../../core/services/ajax.service';
import {isNullOrUndefined} from 'util';

@Injectable()
export class StoreOrderService {

  constructor(public submit: SubmitService,public ajax: AjaxService) { }

  public getOrderLogisticsData(ordno) {
    let url = '/ord/tail/queryDeliveryList';
    let data = {ordno: ordno};
    return this.submit.getData(url, data);
  }

  /**
   * 根据订单编号获取订单详情
   * @param ordno
   * @returns {any}
   */
  public getOrderDetailByNO(ordno) {
    let url = '/ord/loadOrdByOrdno';
    let data = {
      ordno: ordno
    }
    let list = this.submit.getData(url, data);
    if (!isNullOrUndefined(list)) return list;
  }

  public addRemark(data){
    let url = '/ord/updateOrdRemark';
    this.submit.postRequest(url, data);
  }

  /**
   * 查询物流公司列表  get 成功不提示
   */  /**
 * 获取订单状态及物流信息
 * @param ordno
 * @returns {{orderStates: any, orderLogistics: any}}
 */
public getOrderState(ordno) {
  let orderStates;
  orderStates = this.submit.getData('/ord/tail/queryList', {ordno: ordno});
  return orderStates;
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
