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

  public auditListData:any;                           //审核列表的数据
  public curState:string='CR';                        //当前的状态
  public dealButton:any;                               //处理申请的按钮
  public showStroeInvest: boolean = false;            //企业投资的弹窗
  public currentId: any;                               //当前的id
  public amountData: any;                              //获取提现总额和未提现总额
  constructor(public activitiesService:ActivitiesService) { }

  ngOnInit() {
    this.qeuryAll('CR',1);
    this.getWithDrawTotal();
    this.dealButton={
      title:"处理",
      type: "update"
    };
  }


  /**
   * 获取提现总额和未提现总额
   */
  getWithDrawTotal(){
    let url = "/rpCustWithdraw/sumWithDraw";
    let data={};
    let result=this.activitiesService.queryWithDrawAmount(url,data);
    if(result){
      this.amountData=result;
    }
  }

  /**
   *展示红包企业的弹窗
   */
  showAlert(curId) {
    this.currentId = curId;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getAddRecordData(data) {
    this.currentId = null;
    if(data.type) this.qeuryAll(this.curState,data.page)
  }

  /**
   * 审核默认通过
   */
  auditPass(id){
    let url = "/rpCustWithdraw/updateStateTODeal";
    let data={
      id:id
    };
    this.activitiesService.updateStateTODeal(url,data);
    this.qeuryAll(this.curState,1)
  }

  /**
   * 提现申请的列表
   */
  qeuryAll(state,curPage,event?: PageEvent){
    this.curState=state;
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let url = "/rpCustWithdraw/query";
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
  };
}
