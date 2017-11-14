import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  public redPacketRules:any;            //新增红包规则的按钮
  public data:any;                      //红包规则列表的数据
  public showWindow:boolean=false;     //是否显示新增红包规则的弹框

  constructor(private submit: SubmitService,) { }

  ngOnInit() {
    this.redPacketRules={
      title:"新增规则",
      text:"新增规则",
      type: "add-thc"
    };
    this.qeuryAll(1)
  }

  /**
   * 认证审核--查询分页
   */
  qeuryAll(curPage,event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let url = "/rpSetting/queryRpSettingAdmin";
    let data={
      curPage: activePage,
      pageSize:10,
    }
    let result = this.submit.getData(url,data);
    console.log("█ result  ►►►",  result );
    me.data = new Page(result);
  }

}
