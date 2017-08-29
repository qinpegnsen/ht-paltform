import {Injectable} from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {isNull} from "util";
import {Page} from "../../../core/page/page";
import {AppComponent} from "../../../app.component";

@Injectable()
export class DataDictionaryComponentService {


  constructor(private ajax: AjaxService) {
  }

  ngOnInit() {

  }

  //查询字典key列表
  getdataservice(requestData) {
    let result;
    this.ajax.get({
      url: "/datadict/querryDatadictTypeList",
      data: requestData,
      async: false,
      success: (res) => {
        if (res.success && !isNull(res.data)) {
          result = res.data;
        } else {
        }
      },
      error: (res) => {
      }
    });
    return result;
  }

  //删除key
   delCode(url,data) {
    this.ajax.del({
      url:url,
      data: data,
      async:false,
      success: (data) => {
        console.log("data====----==",data);
        let info=data.info;
        if(data.success){
          AppComponent.rzhAlt("success",info);
        }else{
          AppComponent.rzhAlt("error",info);
        }
      },
      error: () => {
        console.log('article/queryAllArticle 连接数据库失败');
      }
    });
  }

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
}
