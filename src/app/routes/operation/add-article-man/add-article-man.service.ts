import { Injectable } from '@angular/core';
import {isNull} from "util";
import {AjaxService} from "../../../core/services/ajax.service";
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



}
