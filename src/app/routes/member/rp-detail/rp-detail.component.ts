import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isNullOrUndefined} from "util";
import {Page} from "../../../core/page/page";
import {MemberService} from "../member.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";

@Component({
  selector: 'app-rp-detail',
  templateUrl: './rp-detail.component.html',
  styleUrls: ['./rp-detail.component.scss']
})
export class RpDetailComponent implements OnInit {

  public logType:any;                 //红包流水类型
  public phone:string='';             //会员手机号
  public custName:string='';          //会员名称
  public dateStr:string='';           //传查询的时间范围
  public rpDeTailData:any;            //红包流水的数据

  constructor(private memberService: MemberService,
              private tools: RzhtoolsService) { }

  ngOnInit() {
    this.logType = this.tools.getEnumDataList('1028');   //会员状态枚举列表
    this.queryRpCustAcctRecAdmin(1);
  }

  /**
   * 查询红包明细（和后台一致）
   * @param curPage
   * @param event
   */
  queryRpCustAcctRecAdmin(curPage,event?:PageEvent){
    let activePage = 1;
    if(typeof event !== "undefined") {
      activePage =event.activePage
    }else if(!isNullOrUndefined(curPage)){
      activePage =curPage
    };
    let data={
      curPage:activePage,
      pageSize:10,
      logType:this.logType,
      phone:this.phone,
      custName:this.custName,
      dateStr:this.dateStr,
    }
    let url='/rpCustAcctRec/queryRpCustAcctRecAdmin';
    this.rpDeTailData=new Page(this.memberService.queryRpCustAcctRecAdmin(url,data))
  }
}
