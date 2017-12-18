import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../core/page/page";
import {ActivatedRoute, Router} from "@angular/router";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "util";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {StoresComponent} from "../stores.component";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-all-store',
  templateUrl: './all-store.component.html',
  styleUrls: ['./all-store.component.scss']
})
export class AllStoreComponent implements OnInit {
  public storeList: Page = new Page();
  public showList: boolean = true;//是否显示列表页
  public path: string;//当前路由
  public bsConfig: Partial<BsDatepickerConfig>;
  public query: any = {};//列表查询条件
  public enterPriseState: string;//企业状态
  public dataPickerTime:any = null;//时间查询
  public time: any = {};//查询时间

  constructor(public router: Router,
              public route: ActivatedRoute,
              public tools: RzhtoolsService,
              public parentComp: StoresComponent,
              public submitService: SubmitService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY/MM/DD'
    });
  }

  ngOnInit() {
    let me = this;
    //获取当前路由
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
      switch (me.path) {
        case 'allStore':
          me.parentComp.enterPriseState = '';
          me.enterPriseState = '';
          break;
        case "storeAudit":
          me.enterPriseState = 'AUDIT';
          break;
        case "audit":
          me.parentComp.enterPriseState = 'AUDIT';
          me.enterPriseState = 'AUDIT';
          break;
        case "normal":
          me.parentComp.enterPriseState = 'NORMAL';
          me.enterPriseState = 'NORMAL';
          break;
        case "half":
          me.parentComp.enterPriseState = 'HALF';
          me.enterPriseState = 'HALF';
          break;
        case "reject":
          me.parentComp.enterPriseState = 'REJECT';
          me.enterPriseState = 'REJECT';
          break;
        case 'black':
          me.enterPriseState = 'BLACK';
          me.enterPriseState = 'BLACK';
          break;
        default:
          me.parentComp.enterPriseState = '';
          me.enterPriseState = '';
          break;
      }
    })
    me.queryDatas(1);// 获取品牌数据
  }

  /**
   * 当时间选择器选择的时间变化时获取时间
   */
  getTimes(event) {
    if (event && event.length > 0) {
      this.time.createTimeBegin = RzhtoolsService.dataFormat(event[0], 'yyyy-MM-dd');
      this.time.createTimeEnd = RzhtoolsService.dataFormat(event[1], 'yyyy-MM-dd');
      this.queryDatas(1);
    }
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/enterprise/query';
    _this.storeList.params = {
      curPage: activePage,
      pageSize: 10,
      enterPriseState: _this.enterPriseState,
      epName: _this.query.epName,
      legalPersonName: _this.query.legalPersonName,
      createTimeBegin: _this.time.createTimeBegin,
      createTimeEnd: _this.time.createTimeEnd
    }
    _this.storeList = new Page(_this.submitService.getData(requestUrl, _this.storeList.params));
  }

  /**
   * 重置查询条件
   */
  resetQuery() {
    this.query = {};
    this.dataPickerTime = null;
    this.time = {};
    this.queryDatas(1);
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    if(event.refresh) this.queryDatas(this.query.curPage)
  }
}

