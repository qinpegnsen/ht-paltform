import {Component, OnInit} from '@angular/core';
import {isNull} from "util";
import {Page} from "../../../core/page/page";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {AjaxService} from '../../../core/services/ajax.service';
@Component({
  selector: 'app-ng2-datatable',
  templateUrl: './ng2-datatable.component.html',
  styleUrls: ['./ng2-datatable.component.scss']
})
export class Ng2DatatableComponent implements OnInit {
  private data: Page = new Page();
  private buttonConfig;

  constructor(private ajax: AjaxService) {
  }

  ngOnInit() {
    let me = this;
    this.queryDatas();

    //按钮配置
    this.buttonConfig = [
      {
        text:"添加",
        title:"添加",
        type: "add",
        callback:function(result){
          result.then((id)=>{
            alert(id);
          })
        }
      },
      {
        title:"删除",
        type: "delete",
        callback:this.delete
      },
      {
        title:"详情",
        type: "details",
        callback:this.details
      },
    ];
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
      url: "/elder/listcondition",
      data: {
        curPage:activePage
      },
      success: (data) => {
        if (!isNull(data)) {
          me.data = new Page(data);
        }
      },
      error: (data) => {
        console.log('data', data);
      }
    });
  }

}
