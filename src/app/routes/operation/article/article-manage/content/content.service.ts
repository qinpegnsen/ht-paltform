import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../../core/services/ajax.service";
import {Page} from "../../../../../core/page/page";
import {isNull} from "util";
import {AppComponent} from "../../../../../app.component";
@Injectable()
export class ContentService {
  //不用公共的服务，因为返回的不一样,这里是boolean值
  constructor(public ajax: AjaxService) { }

  /**
   * 当点击确认的时候真正执行的删除
   */
  public confirmDel(url,data){
    let flag=false;
    this.ajax.put({
      url:url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        if(data.success){
          AppComponent.rzhAlt("success",info);
          flag=true;
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return flag;
  }

  /**
   * 是否置顶
   * @param data
   * @param url
   * @returns {Page}
   */
  public isTop(url,data) {
    let result=false;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          let info=data.info;
          if(data.success){
            let info=data.info;
            AppComponent.rzhAlt("success",info);
            result=true;
          }else{
            AppComponent.rzhAlt("error",info);
          }
        }else{
          console.log('是否置顶 返回的数据为空');
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * 是否推荐
   * @param data
   * @param url
   * @returns {Page}
   */
  public isRecom(url,data) {
    let result=false;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          let info=data.info;
          if(data.success){
            AppComponent.rzhAlt("success",info);
            result=true;
          }else{
            AppComponent.rzhAlt("success",info);
          }
        }else{
          console.log('是否推荐 返回的数据为空');
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   * 审核文章
   * @param data
   * @param url
   * @returns {Page}
   */
  public auditArticle(url,data) {
    let result=false;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          let info=data.info;
          if(data.success){
            AppComponent.rzhAlt("success",info);
            result=true;
          }else{
            AppComponent.rzhAlt("error",info);
          }
        }else{
          console.log('是否置顶 返回的数据为空');
        }
      },
      error: (res) => {
        AppComponent.rzhAlt("error", res.status + '**' + res.statusText);
      }
    });
    return result;
  }

  /**
   *
   * @param data
   * @param url
   * @returns {Page}
   */
  public publishArticle(url,data) {
    let result=false;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        if(data.success){
          AppComponent.rzhAlt("success",info);
          result=true;
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
}
