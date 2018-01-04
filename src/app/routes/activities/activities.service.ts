import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";

@Injectable()
export class ActivitiesService {

  constructor(private ajax: AjaxService) { }

  /**
   * 获取红包流水的明细
   * @param url
   * @param data
   * @returns {any}
   */
  queryRpCustAcctRecAdmin(url, data) {
    let me = this, result;
    me.ajax.get({
      url: url,
      data: data,
      async: false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    })
    return result;
  }

  /**
   * 设置红包企业的权重
   * @param url
   * @param data
   * @returns {any}
   */
  updateRpStoreWeight(url, data) {
    let me = this, result;
    me.ajax.put({
      url: url,
      data: data,
      async: false,
      success: (res) => {
        if(res.success){
          result=true;
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    })
    return result;
  }


  /**
   * 新增红包规则 post
   */
  public addRedPackRules(url,data) {
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
          sessionStorage.setItem('isUse','N');
          AppComponent.rzhAlt("success", res.info);
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * 查询 红包企业
   */
  public queryRpStoreAdmin(url,data) {
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   *查询提现审核
   */
  public queryWithDrawData(url,data) {
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   *查询提现审核
   */
  public queryWithDrawAmount(url,data) {
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   *提现状态更改为处理中
   */
  public updateStateTODeal(url,data) {
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
          AppComponent.rzhAlt("success", res.info);
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * load 当前企业的信息
   */
  public loadRpStoreData(url,data) {
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * 获取后台设置的红包的最小的数量 get
   */
  public getSettingNum(url,data) {
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        result=res.data;
        if(res.success){
          // AppComponent.rzhAlt("success", res.info);
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * 修改红包企业的状态
   * @param url
   * @param data
   * @returns {any}
   */
  public updateRpStoreState(url,data) {
    let result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
          AppComponent.rzhAlt("success", res.info);
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * 修改红包企业
   * @param url
   * @param data
   * @returns {any}
   */
  public updateRpStore(url,data) {
    let result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
          AppComponent.rzhAlt("success", res.info);
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * 查询所有的红包企业
   * @param url
   * @param data
   * @returns {any}
   */
  public queryAllRpStore(url,data) {
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
 * 追加企业投资记录
 * @param url
 * @param data
 * @returns {any}
 */
public addRpAccountRec(url,data) {
  let result;
  this.ajax.post({
    url: url,
    data: data,
    async:false,
    success: (res) => {
      if(res.success){
        result=res.data;
        AppComponent.rzhAlt("success", res.info);
      }else{
        result=res.info;
        AppComponent.rzhAlt("error", res.info);
      }
    },
    error: (res) => {
      AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
    }
  });
  return result;
}

  /**
   * 当前红包开关的状态
   * @param url
   * @param data
   * @returns {any}
   */
  public RpSwitchState(url,data) {
    let result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }


  /**
   * 当前红包开关的状态
   * @param url
   * @param data
   * @returns {any}
   */
  public updateRpSwitchState(url,data) {
    let result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
          AppComponent.rzhAlt("success", res.info);
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }


  /**
   * 红包奖池导航剩余的余额和使用天数
   * @param url
   * @param data
   * @returns {any}
   */
  public restBalanceAnddays(url,data) {
    let result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (res) => {
        if(res.success){
          result=res.data;
        }else{
          result=res.info;
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }
}
