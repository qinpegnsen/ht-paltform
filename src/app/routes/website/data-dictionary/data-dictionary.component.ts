import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {isNull} from "util";
import {AjaxService} from "../../../core/services/ajax.service";

@Component({
  selector: 'app-data-dictionary',
  templateUrl: './data-dictionary.component.html',
  styleUrls: ['./data-dictionary.component.scss']
})
export class DataDictionaryComponent implements OnInit {
  private addButton;
  private data: Page = new Page();
  constructor(private ajax:AjaxService) { }

  ngOnInit() {
    let me = this;
    // this.queryDatas();
    //按钮配置
    me.addButton = {
      type:"add",
      text:"添加机构",
      title:'添加机构'
    };
  }
  /**
   * 添加回调方法
   * @param result  promise对象，回传id
   */

  private delete(){
    alert("delete");
  }
  private details(){
    alert("details");
  }


  public queryDatas(event?:PageEvent) {
    let me = this,activePage = 1;
    if(typeof event !== "undefined") activePage =event.activePage;

    this.ajax.get({
      url: "/datadict/querryDatadictType",
      data: {
        curPage:activePage
      },
      success: (res) => {
        if (res.success && !isNull(res.data)) {
          me.data = new Page(res.data);
          console.log(res)
        }
      },
      error: (res) => {
        console.log('res', res);
      }
    });
  }
}
