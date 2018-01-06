import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";
import {isNullOrUndefined} from 'util';
import {SubmitService} from '../../core/forms/submit.service';


@Injectable()
export class OrderService {

  constructor(public ajax: AjaxService,public submit: SubmitService) { }

  /**
   * 获取商品列表的数据get  独有的，因为做了特殊处理
   * @param url
   * @param data
   */
  getShopListOne(url,data){
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if(data.success){
          result=data.data;
        }else{
          if(data.info=='代理商购物车商品无查询数据'){
            result='';
          }else if(data.info=='购买商品包含已下架商品法'||data.info=='购买商品不可批发商品'){
            result=data.info;
          }
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }

  /**
   * 获取商品列表的数据get  成功不带提示
   * @param url
   * @param data
   */
  getShopList(url,data){
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        if(data.success){
          result=data.data;
          //console.log("█ result ►►►",  result);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }

  /**
   * 根据编码获取支付的内容  然后利用内容生成二维码 因为要写遮罩，所以单独写了一个  成功不带提示
   * @param url
   * @param data
   */
  goPay(url,data){
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        if(data.success){
          result=data.data;
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }

  /**
   * 查看是否支付成功  成功带提示
   * @param url
   * @param data
   */
  isTrue(url,data){
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        // console.log("█ data ►►►",  data);
        let info=data.info;
        if(data.success){

          result=data.data;
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }

  /**
   *添加到购物车数据post
   * @param url
   * @param data
   */
  sendCar(url,data){
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        result=res.data;
        if(res.success){
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }

  /**
   *生成订单post
   * @param url
   * @param data
   */
  bornOrder(url,data){
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        result=res.data;
        if(res.success){
        }else{
          result=info;
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }

  /**
   * 删除del
   * @param url
   * @param data
   */
  deleteData(url,data){
    this.ajax.del({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        if(res.success){
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
  }

  /**
   * 修改put 成功不返回
   * @param url
   * @param data
   */
  putData(url,data){
    let result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        if(res.success){
          result=res.data;
        }else{
          result=res.success;
          AppComponent.rzhAlt("info",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }


  /**
   *删除代理商订单 成功返回 put
   * @param url
   * @param data
   */

  delAgentOrd(url,data){
    let result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        if(res.success){
          result=res.data;
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        AppComponent.rzhAlt("error",'连接数据库失败');
      }
    });
    return result;
  }


  public getOrderLogisticsData(ordno) {
    let url = '/ord/tail/queryDeliveryList';
    let data = {ordno: ordno};
    return this.submit.getData(url, data);
  }

  /**
   * 查询物流公司列表
   */
  public getBasicExpressList() {
    let url = '/basicExpress/queryBasicExpressIsUseList';
    let list = this.submit.getData(url, '');
    if (!isNullOrUndefined(list))
      return list;
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
   * 根据订单编号查询物流信息
   * @param ordno
   */
  public basicExpressList(url,data){
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        let info=res.info;
        if(res.success){
          result=res.data;
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
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
