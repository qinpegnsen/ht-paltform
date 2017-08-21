import { Injectable } from '@angular/core';
import {AjaxService} from "../services/ajax.service";
import {SettingsService} from "../settings/settings.service";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');

@Injectable()
export class SubmitService {

  constructor(private ajax: AjaxService,private settings: SettingsService) { }

  /**
   * 提交表单数据
   * @param submitUrl
   * @param submitData
   */
  submitFormData(submitUrl, submitData) {
    let me = this;
    me.ajax.post({
      url: submitUrl,
      data: submitData,
      async: false,
      success: (res) => {
        console.log("█ res ►►►", res);
        if (res.success) {
          this.settings.closeRightPageAndRouteBack()//关闭右侧页面并返回上级路由
          swal({
            title: '提交成功!',
            text: res.info,
            type: 'success',
            timer: 2000, //关闭时间，单位：毫秒
            showConfirmButton: false  //不显示按钮
          });
        } else {
          let errorMsg;
          if(isNullOrUndefined(res.data)){
            errorMsg = res.info
          }else {
            errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
          }
          swal(res.info, errorMsg, 'error');
        }
      },
      error: (res) => {
        console.log("post ormData error");
      }
    })
  }

  /**
   * 修改类型状态
   * delete
   * @param requestUrl
   * @param requestDate
   */
  changeStateDel(requestUrl,requestDate){
    console.log("█ requestDate ►►►",  requestDate);
    this.ajax.del({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        console.log("█ res ►►►",  res);
        if (res.success) {
          swal({
            title: '提交成功!',
            text: res.info,
            type: 'success',
            timer: 2000, //关闭时间，单位：毫秒
            showConfirmButton: false  //不显示按钮
          });
        } else {
          let errorMsg;
          if(isNullOrUndefined(res.data)){
            errorMsg = res.info
          }else {
            errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
          }
          swal(res.info, errorMsg, 'error');
        }
      },
      error: (res) => {
        console.log('result', res);
      }
    });
  }
  /**
   * 修改类型状态
   * put
   * @param requestUrl
   * @param requestDate
   */
  changeStatePut(requestUrl,requestDate){
    console.log("█ requestDate ►►►",  requestDate);
    this.ajax.put({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        console.log("█ res ►►►",  res);
        if (res.success) {
          swal({
            title: '提交成功!',
            text: res.info,
            type: 'success',
            timer: 2000, //关闭时间，单位：毫秒
            showConfirmButton: false  //不显示按钮
          });
        } else {
          let errorMsg;
          if(isNullOrUndefined(res.data)){
            errorMsg = res.info
          }else {
            errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
          }
          swal(res.info, errorMsg, 'error');
        }
      },
      error: (res) => {
        console.log('result', res);
      }
    });
  }

}
