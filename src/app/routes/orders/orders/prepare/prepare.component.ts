import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {OrdersComponent} from "../orders.component";
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
import {CancelComponent} from "../cancel/cancel.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {ActivatedRoute} from "@angular/router";
import {OrdersService} from "../orders.service";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-prepare',
  templateUrl: './prepare.component.html',
  styleUrls: ['./prepare.component.scss']
})
export class PrepareComponent implements OnInit ,DoCheck {
  ngDoCheck(): void {
    sessionStorage.setItem('orderPrepareSearch',JSON.stringify(this.search))
  }
  public path: string;       //路由
  public ordState: string;    //订单类型
  public curCancelOrderId: string;
  public curDeliverOrderId: string;
  public lookLogisticsOrderId: string;
  public goodsList: Page = new Page();
  public custPhone: string;
  public ordno: string;
  public LogisticsData: any;//物流信息
  public bsConfig: Partial<BsDatepickerConfig>;
  public search = {
    curPage: 1,
    pageSize: 5,
    custPhone: null,
    ordno: null,
    ordState: null,
    searchType: 'ordno'
  };

  constructor(private parentComp: OrdersComponent,
              private route: ActivatedRoute,
              public orderServe: OrdersService,
              private submit: SubmitService,) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY/MM/DD'
    });
  }

  ngOnInit() {
    let me = this;
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
    })
    let search = sessionStorage.getItem('orderPrepareSearch');
    if(!isNullOrUndefined(search)){
      me.search = JSON.parse(search);
    }
    me.queryDatas(1)
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
  public queryDatas(curPage, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/ord/plantQueryOrd';
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

  cancelOrder(orderId) {
    this.curCancelOrderId = orderId;
    console.log("█ orderId ►►►", orderId);
  }

  deliverOrder(orderId) {
    this.curDeliverOrderId = orderId;
  }

  lookLogistics(orderId) {
    this.lookLogisticsOrderId = orderId;
  }

  /**
   * 取消订单回调函数
   * @param data
   */
  getCancelOrderData(data) {
    this.curCancelOrderId = null;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getDeliverOrderData(data) {
    this.curDeliverOrderId = null;
    if(data.type) this.queryDatas(data.page)
  }

  /**
   * 查询物流回调函数
   * @param data
   */
  getLogisticsData(data) {
    this.lookLogisticsOrderId = null;
  }
}
