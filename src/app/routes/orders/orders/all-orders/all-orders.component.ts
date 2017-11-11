import {Component, OnInit} from "@angular/core";
import {OrdersComponent} from "../orders.component";
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {ActivatedRoute} from "@angular/router";
import {OrdersService} from "../orders.service";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  public path: string;       //路由
  public curCancelOrderId: string;
  public curDeliverOrderId: string;
  public lookLogisticsOrderId: string;
  public goodsList: Page = new Page();
  public LogisticsData: any;//物流信息
  public showList: boolean = true;     //是否显示列表页
  public bsConfig: Partial<BsDatepickerConfig>;
  public search = {
    curPage: 1,
    pageSize: 5,
    custPhone: null,
    ordno: null,
    ordState: null,
    searchType: 'ordno'
  };

  constructor(public parentComp: OrdersComponent,
              public route: ActivatedRoute,
              public orderServe: OrdersService,
              public submit: SubmitService,) {
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
        case "all-orders":
          me.parentComp.orderType = '';
          me.search.ordState = '';
          break;
        case "wait-for-send":
          me.parentComp.orderType = 'PREPARE';
          me.search.ordState = 'PREPARE';
          break;
        case "prepare":
          me.parentComp.orderType = 'PREPARE';
          me.search.ordState = 'PREPARE';
          break;
        case "delivery":
          me.parentComp.orderType = 'DELIVERY';
          me.search.ordState = 'DELIVERY';
          break;
        case "finished":
          me.parentComp.orderType = 'SUCCESS';
          me.search.ordState = 'SUCCESS';
          break;
        case "canceled":
          me.parentComp.orderType = 'CLOSE';
          me.search.ordState = 'CLOSE';
          break;
      }
    });
    me.queryDatas()
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
    if(event.refresh) this.queryDatas(this.search.curPage)//在详情页面发货返回需要刷新页面数据
  }

  /**
   *显示物流信息
   * @param orderId
   */
  showLogistics(Logistics,ordno) {
    Logistics.style.display = 'block';
    if(isUndefined(ordno)) ordno = ordno;
    this.LogisticsData = this.orderServe.getOrderLogisticsData(ordno);
  }

  /**
   *隐藏物流信息
   * @param orderId
   */
  hideLogistics(Logistics) {
    Logistics.style.display = 'none';
  }

  /**
   * 切换搜索条件时
   */
  changeSearchType(val){
    if(val=='custPhone') this.search.ordno = null;
    else this.search.custPhone = null;
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(page?:number, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    }else if(!isNullOrUndefined(page)){
      activePage = page
    };
    let requestUrl = '/ord/queryOrd';
    _this.search.curPage = activePage;
    _this.goodsList = new Page(_this.submit.getData(requestUrl, _this.search));
  }

  /**
   * 显示买家信息
   * @param event
   * @param i
   */
  showUserInfo(i) {
    i.style.display = 'block';
  }

  /**
   * 隐藏买家信息
   * @param i
   */
  hideBuyerInfo(i) {
    i.style.display = 'none';
  }

  deliverOrder(orderId) {
    this.curDeliverOrderId = orderId;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getDeliverOrderData(data) {
    this.curDeliverOrderId = null;
    if(data.type) this.queryDatas(data.page)//在当前页面发货之后需要刷新页面数据
  }
}
