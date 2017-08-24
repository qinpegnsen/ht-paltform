import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../../core/services/ajax.service";
import {Page} from "../../../../../core/page/page";
import {isNull} from "util";
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
          swal(info,'','success')
          flag=true;
        }else{
          swal(info,'','error')
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
  public queryData(data,url) {
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

}
