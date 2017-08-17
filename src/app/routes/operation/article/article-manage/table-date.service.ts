import { Injectable } from '@angular/core';
import {AjaxService} from "../../../../core/services/ajax.service";
import {isNull} from "util";


@Injectable()
export class TableDateService {
  public tabledata;
  public activePage = 1;
  constructor(private ajax: AjaxService) { }

  public queryData(data,event) {

    if(typeof event !== "undefined") this.activePage =event.activePage
    this.ajax.get({
      url: "/article/queryAllArticle",
      data: data,
      async:false,
      success: (data) => {
        if (!isNull(data)) {
          if(data.success==true){
            console.log(data.data)
            this.tabledata=data.data;
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
    return this.tabledata;
  }
}
