import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isNullOrUndefined} from "util";
import {Page} from "../../../core/page/page";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {zhCn} from "ngx-bootstrap/locale";
import {defineLocale} from "ngx-bootstrap";
import {ActivitiesService} from "../activities.service";
import {PatternService} from "../../../core/forms/pattern.service";
import {AppComponent} from "../../../app.component";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  public logType:any;                 //选择的红包流水类型
  public phone:string='';             //会员手机号
  public custName:string='';          //会员名称
  public dateStr;                      //传查询的时间范围
  public rpDeTailData:any;            //红包流水的数据
  public bsConfig: Partial<BsDatepickerConfig>;
  public minAmount:string='0';            //搜索区间默认的最小值
  public maxAmount:string='1000';           //搜索区间默认的最大值

  constructor(private activitiesService: ActivitiesService,
              public patternService: PatternService,
              private tools: RzhtoolsService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    this.queryRpCustAcctRecAdmin(1);
  }

  /**
   * 清空时间
   */
  clearTime(){
    this.dateStr = null;
    this.queryRpCustAcctRecAdmin(1);// 获取数据
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
      pageSize:15,
      logType:'DRAW',//抽奖、中奖记录
      phone:this.phone,
      custName:this.custName,
      dateStr: this.dateStr?RzhtoolsService.dataFormat(this.dateStr[0], 'yyyy/MM/dd') + '-' + RzhtoolsService.dataFormat(this.dateStr[1], 'yyyy/MM/dd'):'',
      minAmount:this.minAmount,
      maxAmount:this.maxAmount,
    }
    let url='/rpCustAcctRec/queryRpCustAcctRecAdmin';
    this.rpDeTailData=new Page(this.activitiesService.queryRpCustAcctRecAdmin(url,data))
  }

  /**
   * 校验输入的面额值
   */
  getValue(value,val){
    if(!value.valid||val.value<0||val.value.slice(0,1)==0){
      AppComponent.rzhAlt("info", '请输入0或者正整数');
    }
  }
}
