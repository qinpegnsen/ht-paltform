import {Injectable} from "@angular/core";
import {AjaxService} from "../services/ajax.service";
import {SettingsService} from "../settings/settings.service";
import {ActivatedRoute} from "@angular/router";
import {AppComponent} from "../../app.component";
import {MaskService} from "../services/mask.service";
const swal = require('sweetalert');

@Injectable()
export class SubmitService {

  constructor(private ajax: AjaxService,
              private mask: MaskService,
              private settings: SettingsService,
              private route: ActivatedRoute) {
  }

  /**
   * POST 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  postRequest(submitUrl, submitData, back?: boolean) {
    let me = this, result;
    me.ajax.post({
      url: submitUrl,
      data: submitData,
      async: false,
      success: (res) => {
        if (res.success) {
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          if (back) this.settings.closeRightPageAndRouteBack()//关闭右侧页面并返回上级路由
          AppComponent.rzhAlt("success", res.info);
          /* swal({
           title: '成功',
           text: res.info,
           type: 'success',
           timer: 3000, //关闭时间，单位：毫秒
           showConfirmButton: false  //不显示按钮
           });*/
          result = res.data;
        } else {
          result = res.info;
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    })
    return result;
  }

  /**
   * delete 请求，并且不需要返回数据
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  delRequest(requestUrl, requestDate, back?: boolean) {
    this.ajax.del({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        if (res.success) {
          if (back) this.settings.closeRightPageAndRouteBack()//关闭右侧页面并返回上级路由
          AppComponent.rzhAlt("success", res.info);
        } else {
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
  }

  /**
   * put 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  putRequest(requestUrl, requestDate, back?: boolean) {
    let result, me = this;
    this.ajax.put({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        console.log("█ res ►►►", res);
        if (res.success) {
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          if (back) this.settings.closeRightPageAndRouteBack()//关闭右侧页面并返回上级路由
          AppComponent.rzhAlt("success", res.info);
          /*swal({
           title: '成功',
           text: res.info,
           type: 'success',
           timer: 3000, //关闭时间，单位：毫秒
           showConfirmButton: false  //不显示按钮
           });*/
          result = res.data;
        } else {
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * put 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  getRequest(requestUrl, requestDate, back?: boolean) {
    let result, me = this;
    me.ajax.get({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        if (res.success) {
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          if (back) me.settings.closeRightPageAndRouteBack()//关闭右侧页面并返回上级路由
          AppComponent.rzhAlt("success", res.info);
          result = res.data;
        } else {
          MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: (res) => {
        MaskService.hideMask();//当上传图片之后才提交数据的话，遮罩层开启是在图片上传之前，所以需要手动关闭
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * 获取路由参数
   * 适用于'/'开头的传参形式
   * @returns {any}
   */
  /*getParams(param) {
   let val;
   this.route.params.subscribe(params => val = params[param]);
   return val;
   }*/

  /**
   * 获取路由参数
   * 适用于'?'开头的传参形式
   * @returns {any}
   */
  public getParams(name) {
    return this.route.snapshot.queryParams[name];
  }

  /**
   * get 获取数据
   * @param requestUrl
   * @param requestData
   * @returns {any}
   */
  getData(requestUrl: string, requestData: any) {
    let result: any;
    this.ajax.get({
      url: requestUrl,
      data: requestData,
      async: false,
      success: (res) => {
        if (res.success) {
          // console.log("█ res ►►►",  res);
          result = res.data;
        } else {
          AppComponent.rzhAlt("error", '获取数据时' + res.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

}
