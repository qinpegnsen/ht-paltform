import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  public redPacketRules:any;            //新增红包规则的按钮
  public data:any;                      //红包规则列表的数据
  public isUse:string='Y';                  //红包是否启用

  constructor(private submit: SubmitService,) { }

  ngOnInit() {
    this.redPacketRules={
      title:"新增规则",
      text:"新增规则",
      type: "add-thc"
    };
    this.qeuryAll('Y',1)
  }

  /**
   * 红包规则列表
   */
  qeuryAll(state,curPage,event?: PageEvent){
    this.isUse=state;
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let url = "/rpSetting/queryRpSettingAdmin";
    let data={
      curPage: activePage,
      pageSize:10,
      isUsed:'',
    };
    if(isNullOrUndefined(state)){//分页
      data.isUsed=this.isUse;
    }else{//导航
      data.isUsed=state;
    };
    let result = this.submit.getData(url,data);
    me.data = new Page(result);
  }

}
