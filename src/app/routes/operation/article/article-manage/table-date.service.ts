import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {isNull} from "util";
import {Page} from "../../../../core/page/page";
const swal = require('sweetalert');

@Injectable()
export class TableDateService {

  constructor(private ajax: AjaxService) { }

  /**
   * 查询文章管理列表
   * @param data
   * @param url
   * @returns {Page}
   */
  public queryData(data,url) {
    let result:Page=new Page();
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success==true){
            result=new Page(data.data);
          }else{
            console.log('article/queryAllArticle 返回的success为假');
          }
        }else{
          console.log('article/queryAllArticle 返回的数据为空');
        }
      },
      error: () => {
        console.log('article/queryAllArticle 连接数据库失败');
      }
    });
    return result;
  }

  /**
   * 查询具体的文章信息
   */
  public selsectArticle(url,data) {
    let result;
    this.ajax.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success==true){
            result=data.info;
            swal(result,'','success')
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
  }

  /**
   * 删除文章
   */
  public delArticle(url,data) {
    let result;
    this.ajax.put({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success==true){
            console.log(data)
            result=data.info;
            swal(result,'','success')
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
  }
}
