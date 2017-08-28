import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../../core/services/ajax.service";
import {Page} from "../../../../../core/page/page";
import {isNull} from "util";
import {AppComponent} from "../../../../../app.component";
const swal = require('sweetalert');
@Injectable()
export class ContentService {

  constructor(private ajax: AjaxService) { }

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
      error: (data) => {
        let info=data.info;
        swal(info,'','success')
        console.log(1)
      }
    });
    return flag;
  }

  /**
 * 查询文章管理列表
 * @param data
 * @param url
 * @returns {Page}
 */
public queryData(url,data) {
  let result:Page=new Page();
  this.ajax.get({
    url: url,
    data: data,
    async:false,
    success: (data) => {
      if (!isNull(data)) {
        if(data.success){
          result=new Page(data.data);
        }else{
          console.log('查询文章管理列表 返回的success为假');
        }
      }else{
        console.log('查询文章管理列表 返回的数据为空');
      }
    },
    error: () => {
      console.log('查询文章管理列表 连接数据库失败');
    }
  });
  return result;
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
          if(data.success){
            console.log(data)
            let info=data.info;
            AppComponent.rzhAlt("success",info);
            result=true;
          }else{
            console.log('是否置顶 返回的success为假');
          }
        }else{
          console.log('是否置顶 返回的数据为空');
        }
      },
      error: () => {
        console.log('是否置顶 连接数据库失败');
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
          if(data.success){
            let info=data.info;
            AppComponent.rzhAlt("success",info);
            result=true;
          }else{
            console.log('是否推荐 返回的success为假');
          }
        }else{
          console.log('是否推荐 返回的数据为空');
        }
      },
      error: () => {
        console.log('是否推荐 连接数据库失败');
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
          if(data.success){
            let info=data.info;
            AppComponent.rzhAlt("success",info);
            result=true;
          }else{
            console.log('是否置顶 返回的success为假');
          }
        }else{
          console.log('是否置顶 返回的数据为空');
        }
      },
      error: () => {
        console.log('是否置顶 连接数据库失败');
      }
    });
    return result;
  }

  /**
   * 发布文章
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
        if(data.success){
          console.log(data)
          let info=data.info;
          AppComponent.rzhAlt("success",info);
          result=true;
        }else{
          console.log('是否置顶 返回的success为假');
        }
      },
      error: () => {
        console.log('是否置顶 连接数据库失败');
      }
    });
    return result;
  }

  /**
   * 查询置顶后的文章管理列表
   * @param data
   * @param url
   * @returns {Page}
   */
  public queryTopList(url,data) {
    let result:Page=new Page();
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success){
            result=new Page(data.data);
          }else{
            console.log('查询置顶后的文章管理列表 返回的success为假');
          }
        }else{
          console.log('查询置顶后的文章管理列表 返回的数据为空');
        }
      },
      error: () => {
        console.log('查询文章管理列表 连接数据库失败');
      }
    });
    return result;
  }

}
