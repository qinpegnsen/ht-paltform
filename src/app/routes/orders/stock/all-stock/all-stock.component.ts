import {Component, OnInit, ViewChild} from '@angular/core';
import {StockComponent} from '../stock.component';
import {Page} from '../../../../core/page/page';
import {PageEvent} from '../../../../shared/directives/ng2-datatable/DataTable';
import {SubmitService} from '../../../../core/forms/submit.service';
import {CancelComponent} from '../../../orders/orders/cancel/cancel.component';
import {isUndefined} from 'ngx-bootstrap/bs-moment/utils/type-checks';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/bs-moment';
import {zhCn} from 'ngx-bootstrap/locale';
import {RzhtoolsService} from '../../../../core/services/rzhtools.service';
defineLocale('cn', zhCn);


@Component({
  selector: 'app-all-stock',
  templateUrl: './all-stock.component.html',
  styleUrls: ['./all-stock.component.scss']
})
export class AllStockComponent implements OnInit {
  public orderType: number = 1;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  private agentAcct;
  private agentName;
  private agentOrdno;
  private agentTime;
  public curCancelOrderId: string;
  public curDeliverOrderId: string;
  public lookLogisticsOrderId: string;
  private beginTime: string;
  private endTime: string;
  public goodsList: Page = new Page();
  @ViewChild('cancelBox') cancelBox: CancelComponent;

  constructor(private StockComponent: StockComponent, private submit: SubmitService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let _this = this;
    _this.StockComponent.orderType = 1;
    _this.queryDatas(1)
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage, event?: PageEvent) {
    console.log('█ this.agentTime ►►►', this.agentTime);

    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/agentOrd/queryAgentOrdAdmin';
    //格式化时间格式
    let dateStr = '';
    if (this.agentTime) {
      dateStr = RzhtoolsService.dataFormat(this.agentTime[0], 'yyyy/MM/dd') + '-' + RzhtoolsService.dataFormat(this.agentTime[1], 'yyyy/MM/dd');
    }

    let requestData = {
      curPage: activePage,
      pageSize: 10,
      sortColumns: '',
      agentAcct: _this.agentAcct,
      goodsName: _this.agentName,
      ordno: _this.agentOrdno,
      dateStr: dateStr,
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
    console.log("█ _this.goodsList ►►►",  _this.goodsList);
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
    console.log("█ orderId ►►►",  orderId);
    this.curCancelOrderId = orderId;
  }

 /* deliverOrder(orderId) {
    this.curDeliverOrderId = orderId;
  }

  lookLogistics(orderId) {
    this.lookLogisticsOrderId = orderId;
  }*/

  /**
   * 取消订单回调函数
   * @param data
   */
  getCancelOrderData(data) {
    this.curCancelOrderId = null;
  }

  /*
   /!**
   * 发货回调函数
   * @param data
   *!/
   getDeliverOrderData(data){
   this.curDeliverOrderId = null;
   }
   /!**
   * 查询物流回调函数
   * @param data
   *!/
   getLogisticsData(data){
   this.lookLogisticsOrderId = null;
   }*/

}
