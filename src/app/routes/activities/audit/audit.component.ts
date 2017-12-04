import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isNullOrUndefined, isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {ActivitiesService} from "../activities.service";

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  public auditListData:any;                   //审核列表的数据
  public curState:string='CR';                       //当前的状态
  constructor(public activitiesService:ActivitiesService) { }

  ngOnInit() {
    this.qeuryAll('',1)
  }

  /**
   * 红包规则列表
   */
  qeuryAll(state,curPage,event?: PageEvent){
    this.curState=state;
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let url = " /rpCustWithdraw/query";
    let data={
      curPage: activePage,
      pageSize:10,
      state:'',
    };
    if(isNullOrUndefined(state)){//分页
      data.state=this.curState;
    }else{//导航
      data.state=state;
    };
    let result = this.activitiesService.queryWithDrawData(url,data);
    me.auditListData = new Page(result);
  }

}
