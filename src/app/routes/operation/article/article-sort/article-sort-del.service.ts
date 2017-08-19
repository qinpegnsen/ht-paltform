import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
const swal = require('sweetalert');
@Injectable()
export class ArticleSortDelService {

  constructor(private ajax: AjaxService) { }

  /**
   * 删除
   * @param url
   * @param data
   */
  public delSort(url,data) {
    this.ajax.del({
      url:url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        if(data.success){
          swal(info,'','success')
        }else{
          swal(info,'','error')
        }
      },
      error: () => {
        console.log('article/queryAllArticle 连接数据库失败');
      }
    });
  }
}
