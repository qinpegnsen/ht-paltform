import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {Page} from "../../../../core/page/page";
import {isNull} from "util";

@Injectable()
export class ArticleSortService {

  constructor(private ajax: AjaxService) { }

  /**
   *
   * @param data
   * @param url
   * @returns {Page}
   */
  public queryData(url,data) {
    var result;
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
