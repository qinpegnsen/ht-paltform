import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";
import {SubmitService} from '../../core/forms/submit.service';
import {isNullOrUndefined} from "util";
import {GoodsService} from '../goods/goods.service';
const swal = require('sweetalert');

@Injectable()
export class OperationService {
  public stores: Array<any> = new Array();//店铺列表
  public selectedStore:any;

  constructor(public ajax: AjaxService,public submit: SubmitService,public goods:GoodsService) {
    this.stores = this.goods.getAllStores();
  }

  /**
   * delete 请求  特殊的提示
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  updataArticleState(requestUrl, requestDate,article) {
    this.ajax.del({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (data) => {
        if (data.success) {
          let text = '';
          if (article.state == "SHOW") {
            text = "显示"
          } else if (article.state == "HIDE") {
            text = "隐藏"
          }
          AppComponent.rzhAlt("success", text);
        } else {
          AppComponent.rzhAlt("error", data.info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
  }

  /**
   * delete 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  delRequest(requestUrl, requestDate) {
    let that = this;
    this.ajax.del({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        if (res.success) {
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
   * POST 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  addNewArticle(submitUrl, submitData) {
    let me = this, result;
    me.ajax.post({
      url: submitUrl,
      data: submitData,
      async: false,
      success: (res) => {
        if (res.success) {
          AppComponent.rzhAlt("success", res.info);
          result = res.data;
        } else {
          AppComponent.rzhAlt("error", res.info);
          result = res.info;
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    })
    return result;
  }


  /**
   * POST 请求
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  updataeEpress(submitUrl, submitData) {
    let me = this, result;
    me.ajax.put({
      url: submitUrl,
      data: submitData,
      async: false,
      success: (res) => {
        if (res.success) {
          AppComponent.rzhAlt("success", res.info);
          result = res.data;
        } else {
          AppComponent.rzhAlt("error", res.info);
          result = res.info;
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    })
    return result;
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
        result=res.success;
        if(res.success){
          AppComponent.rzhAlt("success", res.info);
        }else{
          AppComponent.rzhAlt("error", res.info);
        }
      },
      error: () => {
        result='';
        AppComponent.rzhAlt("error", "请输入数字类型");
      }
    })
    return result;
  }

  /**
   * POST 请求
   * @param submitUrl
   * @param submitData  返回info
   *
   */
  tplRequest(submitUrl, submitData) {
    let me = this, result;
    me.ajax.post({
      url: submitUrl,
      data: submitData,
      async: false,
      success: (res) => {
        result=res.info;
        if(res.success){
          AppComponent.rzhAlt("success", res.info);
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
   * get 请求   获取关联的商品
   * @param url
   * @param data
   * @returns {any}
   */
  linkGoods(url, data) {
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
   * POST 请求  成功没提示
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  addproblem(submitUrl, submitData, back?: boolean) {
    let me = this, result;
    me.ajax.post({
      url: submitUrl,
      data: submitData,
      async: false,
      success: (res) => {
        if (res.success) {
          result = res.info;
        } else {
          let errorMsg;
          if (isNullOrUndefined(res.data)) {
            result = res.info;
            AppComponent.rzhAlt("error",result );
          } else {
            errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
          }
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    })
    return result;
  }

  /**
   * put 请求  成功有提示
   * @param submitUrl
   * @param submitData
   * @param back:true(返回上一级)
   */
  updateproblem(requestUrl, requestDate, back?: boolean) {
    let result,me = this;
    this.ajax.put({
      url: requestUrl,
      data: requestDate,
      async: false,
      success: (res) => {
        if (res.success) {
          AppComponent.rzhAlt("success", res.info);
          result = res.info;
        } else {
          result = res.info;
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
   * 上传帮助中心的编辑器图片
   * @param file
   */
  uploadImgHelp = function (file: any) {
    let _this = this, ret: string, data: any = new FormData();
    data.append("limitFile", file);
    _this.ajax.post({
      url: "/upload/basic/articleUploadRetHttpURL",
      data: data,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: (response) => {
        if (!isNullOrUndefined(response) && response.success) {
          ret = response.data;
        }
        if (!response.success) AppComponent.rzhAlt('error', response.info, file.name + '上传失败')
      },
      error: (response) => {
        AppComponent.rzhAlt('error', file.name + '上传失败', '')
      }
    });
    return ret;
  }

  /**
   * 上传编辑器图片
   * @param file
   */
  uploadImg = function (file: any) {
    let _this = this, ret: string, data: any = new FormData();
    data.append("limitFile", file);
    _this.ajax.post({
      url: "/upload/basic/articleUploadRetHttpURL",
      data: data,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: (response) => {
        if (!isNullOrUndefined(response) && response.success) {
          ret = response.data;
        }
        if (!response.success) AppComponent.rzhAlt('error', response.info, file.name + '上传失败')
      },
      error: (response) => {
        AppComponent.rzhAlt('error', file.name + '上传失败', '')
      }
    });
    return ret;
  }

}
