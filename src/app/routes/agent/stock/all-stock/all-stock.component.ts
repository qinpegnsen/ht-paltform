import {Component, OnInit, ViewChild} from '@angular/core';
import {StockComponent} from '../stock.component';
import {Page} from '../../../../core/page/page';
import {PageEvent} from '../../../../shared/directives/ng2-datatable/DataTable';
import {SubmitService} from '../../../../core/forms/submit.service';
import {CancelComponent} from '../../../orders/orders/cancel/cancel.component';
import {isUndefined} from 'ngx-bootstrap/bs-moment/utils/type-checks';

@Component({
  selector: 'app-all-stock',
  templateUrl: './all-stock.component.html',
  styleUrls: ['./all-stock.component.scss']
})
export class AllStockComponent implements OnInit {
  public curCancelOrderId:string;
  public curDeliverOrderId:string;
  public lookLogisticsOrderId:string;
  private beginTime:string;
  private endTime:string;
  public goodsList: Page = new Page();
  @ViewChild('cancelBox') cancelBox: CancelComponent;

  constructor(private StockComponent:StockComponent,private submit: SubmitService,) { }

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
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/agentOrd/pageAgentStAprs';
    let requestData = {
      curPage: activePage,
      pageSize: 2,
      sortColumns: '',
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
  }

  /**
   * 显示买家信息
   * @param event
   * @param i
   */
  showUserInfo(i){
    i.style.display = 'block';
  }

  /**
   * 隐藏买家信息
   * @param i
   */
  hideBuyerInfo(i){
    i.style.display = 'none';
  }
  cancelOrder(orderId){
    this.curCancelOrderId = orderId;
  }
  deliverOrder(orderId){
    this.curDeliverOrderId = orderId;
  }
  lookLogistics(orderId){
    this.lookLogisticsOrderId = orderId;
  }
 /* /!**
   * 取消订单回调函数
   * @param data
   *!/
  getCancelOrderData(data){
    this.curCancelOrderId = null;
  }

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
