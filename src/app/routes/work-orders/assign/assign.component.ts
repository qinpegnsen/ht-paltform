import {Component, DoCheck, OnInit} from '@angular/core';
import {WoManageComponent} from "../wo-manage/wo-manage.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {PageEvent} from "angular2-datatable";
import {isNullOrUndefined, isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {WoService} from "../wo.service";
import {ActivatedRoute} from "@angular/router";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  public path: string;//当前路由
  private woList: Page = new Page();
  private detail = [];
  private woStateList: any; // 工单状态枚举列表
  private woTypeList: any;  // 工单类型枚举列表
  private showList: boolean = true;     //是否显示列表页
  public assign:boolean;
  public curAssignWono:string;
  public curDeliverOrderId: string;
  private search = {
    wono: '',
    ordno: '',
    ordType: '',
    stateEnum: 'NO,MANUAL',
    curPage: 1,
    pageSize: 10,
    sortColumns: null,
    searchType: 'wono'
  }

  constructor(private parentComp: WoManageComponent,
              private tools: RzhtoolsService,
              private route: ActivatedRoute,
              private wo: WoService,
              private submit: SubmitService,) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY/MM/DD'
    });
  }

  ngOnInit() {
    let me = this;
    me.woTypeList = me.tools.getEnumDataList(1301);
    me.woStateList = me.tools.getEnumDataList(1303);
    me.parentComp.detail = false;
    me.queryDatas(1)
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
    this.parentComp.detail = true;
    this.parentComp.detailType = event.detailType;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    this.parentComp.detail = false;
  }

  /**
   * 指派订单
   * @param ordno
   */
  assignWoToAgent(wono){
    this.curAssignWono = wono;
  }

  /**
   * 获取指派订单结果，是取消操作还是指派成功
   * @param data
   */
  getAssignWoResult(data){
    this.curAssignWono = null;
    if(data.type) this.queryDatas(data.page);
  }

  /**
   * 修改查询条件时，将另外一个条件置为空
   * @param condition
   */
  changeCondition(condition) {
    if (condition == 'wono') this.search.ordno = null;
    else this.search.wono = null;
  }

  /**
   * 平台接单
   * @param wono
   */
  acceptNa(wono, page) {
    this.wo.acceptNa(wono);
    if (isNullOrUndefined(page)) page = 1;
    this.queryDatas(page);
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage?, event?: PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/wo/query';
    me.search.curPage = activePage;
    me.woList = new Page(me.submit.getData(requestUrl, me.search));
    me.detail = [];//每次切换新页面，详情都关闭
  }

  /**
   * 展示详情
   * @param index
   */
  showDetail(index) {
    this.detail[index] = !this.detail[index];
  }

}

