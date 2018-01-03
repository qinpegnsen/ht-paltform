import { Component, OnInit } from '@angular/core';
import {isUndefined} from 'ngx-bootstrap/bs-moment/utils/type-checks';
import {Page} from '../../../core/page/page';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {PlatformOrderService} from '../platform-order.service';
import {SubmitService} from '../../../core/forms/submit.service';
import {PageEvent} from '../../../shared/directives/ng2-datatable/DataTable';

@Component({
  selector: 'app-platform-payment',
  templateUrl: './platform-payment.component.html',
  styleUrls: ['./platform-payment.component.scss']
})
export class PlatformPaymentComponent implements OnInit {

  public path: string;       //路由
  public ordState: string;    //订单类型
  public curCancelOrderId: string;
  public curDeliverOrderId: string;
  public lookLogisticsOrderId: string;
  public goodsList: Page = new Page();
  public phone: string;
  public ordno: string;
  public LogisticsData: any;//物流信息
  public showList: boolean = true;     //是否显示列表页
  public bsConfig: Partial<BsDatepickerConfig>;

  constructor(public platformOrderService: PlatformOrderService, public submit: SubmitService) {

  }

  ngOnInit() {
    let me = this;
    me.queryDatas(1)
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
    event.single = true;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    if(event.refresh) this.queryDatas(1);//在详情页面发货返回需要刷新页面数据
  }

  /**
   *显示物流信息
   * @param orderId
   */
  showLogistics(Logistics,ordno) {
    Logistics.style.display = 'block';
    if(isUndefined(ordno)) ordno = ordno;
    this.LogisticsData = this.platformOrderService.getOrderLogisticsData(ordno);
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
  public queryDatas(curPage,event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      sortColumns: '',
      phone: _this.phone,
      ordno: _this.ordno,
      ordState:'CR'
    };
    let requestUrl = '/ord/queryPlantOrd';
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

  deliverOrder(orderId) {
    this.curDeliverOrderId = orderId;
  }

  /**
   * 发货回调函数
   * @param data
   */
  getDeliverOrderData(data) {
    this.curDeliverOrderId = null;
    if(data.type) this.queryDatas(1)//在当前页面发货之后需要刷新页面数据
  }
}
