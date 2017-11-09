import {Component, DoCheck, OnInit} from "@angular/core";
import {OrdersComponent} from "../orders.component";
import {Page} from "../../../../core/page/page";
import {PageEvent} from "angular2-datatable";
import {isUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
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
  private showList: boolean = true;     //是否显示列表页
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
    me.queryDatas()
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
    if(event.refresh) this.queryDatas();//在详情页面发货返回需要刷新页面数据
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
  public queryDatas(event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
      _this.search.curPage = activePage;
    }
    let requestUrl = '/ord/plantQueryOrd';
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
    if(data.type) this.queryDatas()//在当前页面发货之后需要刷新页面数据
  }

}
