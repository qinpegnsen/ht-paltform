import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {ArticleSortComponent} from "./article-sort.component";
const swal = require('sweetalert');

@Injectable()
export class ArticleSortDelService {

  constructor(private ajax: AjaxService) {}

  /**
   * 当点击确认的时候真正执行的删除
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
          swal(info,'','success')
          flag=true;
          // this.ArticleSortComponent.queryArticSortleList()
        }else{
          swal(info,'','error')
        }
      },
      error: () => {
        console.log('article/queryAllArticle 连接数据库失败');
      }
    });
    return flag;
  }
}

