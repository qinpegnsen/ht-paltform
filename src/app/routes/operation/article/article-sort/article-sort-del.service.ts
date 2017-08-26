import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {ArticleSortComponent} from "./article-sort.component";
import {AppComponent} from "../../../../app.component";
const swal = require('sweetalert');

@Injectable()
export class ArticleSortDelService {

  constructor(private ajax: AjaxService) {}

  /**
   * 当点击确认的时候真正执行的删除
   * 当删除成功的时候，放回一个true这时候页面在执行刷新
   */
  public confirmDel(url,data){
    let flag=false;
    this.ajax.del({
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
      error: () => {
        console.log('分类删除 连接数据库失败');
      }
    });
    return flag;
  }
}

