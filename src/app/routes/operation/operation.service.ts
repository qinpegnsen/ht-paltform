import { Injectable } from '@angular/core';
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";
import {cli} from "webdriver-manager/built/lib/webdriver";
import {SubmitService} from '../../core/forms/submit.service';
import {isUndefined} from 'ngx-bootstrap/bs-moment/utils/type-checks';
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');

@Injectable()
export class OperationService {

  constructor(private ajax: AjaxService,private submit: SubmitService) { }

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
   * POST 请求
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
   * put 请求
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
          swal(res.info,'','error');
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    })
    return result;
  }

}
