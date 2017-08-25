import { Injectable } from '@angular/core';
import {isNull} from "util";
import {AjaxService} from "../../../../../core/services/ajax.service";
const swal = require('sweetalert');
@Injectable()
export class AddArticleManService {

  constructor(private ajax: AjaxService) { }

  /**
   * 新增文章
   */
  public addArticle(url,data) {
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          result=data.info;
          if(data.success){
            swal(result,'','success')
          }else{
            swal(result,'','success')
            console.log('article/queryAllArticle 返回的success为假');
          }
        }else{
          console.log('article/queryAllArticle 返回的数据为空');
        }
      },
      error: (data) => {
        console.log(data)
        swal('获取数据失败','','error')
      }
    });
  }

  /**
   * 文章分类列表
   */
  public articleClass(url,data) {
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success){
            result=data.data;
          }else{
            console.log('article/queryAllArticle 返回的success为假');
          }
        }else{
          console.log('article/queryAllArticle 返回的数据为空');
        }
      },
      error: (data) => {
        swal('分类用户已存在','','error')
      }
    });
    return result;
  }

  /**
   * 根据文章的id查询文章的信息
   * @param url
   * @param data
   * @returns {any}
   */
  public queryArticle(url,data) {
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success){
            result=data.data;
          }else{
            console.log('article/queryAllArticle 返回的success为假');
          }
        }else{
          console.log('article/queryAllArticle 返回的数据为空');
        }
      },
      error: (data) => {
        swal('分类用户已存在','','error')
      }
    });
    return result;
  }


  /**
   * 修改文章
   */
  public updateArticle(url,data) {
    let result;
    this.ajax.post({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          result=data.info;
          if(data.success){
            swal(result,'','success')
          }else{
            swal(result,'','success')
            console.log('article/queryAllArticle 返回的success为假');
          }
        }else{
          console.log('article/queryAllArticle 返回的数据为空');
        }
      },
      error: (data) => {
        console.log(data)
        swal('获取数据失败','','error')
      }
    });
  }



}
