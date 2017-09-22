import {Component, OnInit} from '@angular/core';
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
defineLocale('cn', zhCn);

@Component({
  selector: 'app-wo-all',
  templateUrl: './wo-all.component.html',
  styleUrls: ['./wo-all.component.scss']
})
export class WoAllComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  private woList: Page = new Page();
  private detail = [];
  private woStateList: any; // 工单状态枚举列表
  private woTypeList: any;  // 工单类型枚举列表
  private search = {
    wono: null,
    ordno: null,
    ordType: '',
    stateEnum: '',
    pageSize: 3,
    sortColumns: null
  }

  constructor(private parentComp: WoManageComponent,
              private tools: RzhtoolsService,
              private wo: WoService,
              private submit: SubmitService,) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY/MM/DD'
    });
    this.parentComp.woType = 1
  }

  ngOnInit() {
    let me = this;
    me.queryDatas(1);
    me.woTypeList = me.tools.getEnumDataList(1301);
    me.woStateList = me.tools.getEnumDataList(1303);
  }

  /**
   * 修改查询条件时，将另外一个条件置为空
   * @param condition
   */
  changeCondition(condition){
    if(condition == 'wono') this.search.ordno = null;
    else this.search.wono = null;
  }

  /**
   * 平台接单
   * @param wono
   */
  acceptNa(wono,page){
    this.wo.acceptNa(wono);
    if(isNullOrUndefined(page)) page = 1;
    this.queryDatas(page);
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage, event?: PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/wo/query';
    me.search['curPage'] = activePage;
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
