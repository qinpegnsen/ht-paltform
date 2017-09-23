import {Component, OnInit, ViewChild} from '@angular/core';
import {OrdersComponent} from "../orders.component";
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {isUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
import {CancelComponent} from "../cancel/cancel.component";
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
  public ordState: string;    //订单类型
  public curCancelOrderId: string;
  public curDeliverOrderId: string;
  public lookLogisticsOrderId: string;
  public goodsList: Page = new Page();
  public custCode: string;
  public LogisticsData: any;//物流信息
  public bsConfig: Partial<BsDatepickerConfig>;

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
    //获取当前路由
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
      switch (me.path) {
        case "all-orders":
          me.parentComp.orderType = '';
          me.ordState = '';
          break;
        case "wait-for-send":
          me.parentComp.orderType = 'PREPARE';
          me.ordState = 'PREPARE';
          break;
        case "delivery":
          me.parentComp.orderType = 'DELIVERY';
          me.ordState = 'DELIVERY';
          break;
        case "finished":
          me.parentComp.orderType = 'SUCCESS';
          me.ordState = 'SUCCESS';
          break;
        case "canceled":
          me.parentComp.orderType = 'CLOSE';
          me.ordState = 'CLOSE';
          break;
      }
    });
    me.queryDatas(1)
  }

  /**
   *显示物流信息
   * @param orderId
   */
  showLogistics(Logistics,ordno) {
    Logistics.style.display = 'block';
    /*if(isUndefined(ordno))*/ ordno = '1234123451235';
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
    let requestUrl = '/ord/queryOrd';
    let requestData = {
      curPage: activePage,
      pageSize: 5,
      custCode: _this.custCode,
      ordState: _this.ordState
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
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
