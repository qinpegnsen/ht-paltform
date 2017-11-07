import {Component, OnInit} from "@angular/core";
import {OrderReviewComponent} from "../order-review.component";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {SubmitService} from "../../../../core/forms/submit.service";
import {Page} from "../../../../core/page/page";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {OrderReviewService} from "../order-review.service";

@Component({
  selector: 'app-to-audit',
  templateUrl: './to-audit.component.html',
  styleUrls: ['./to-audit.component.scss']
})
export class ToAuditComponent implements OnInit {
  public orderType: number = 1;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  private agentAcct;
  private agentTime;
  public curCancelOrderId: string;
  public curDeliverOrderId: string;
  public lookLogisticsOrderId: string;
  private beginTime: string;
  private endTime: string;
  public goodsList: Page = new Page();
  private LogisticsData//物流信息

  constructor(private OrderReviewComponent:OrderReviewComponent, private submit: SubmitService,private OrderReviewService:OrderReviewService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let _this = this;
    _this.OrderReviewComponent.orderType = 2;
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
    let requestUrl = '/agentOrd/queryAgentOrdReturnList';
    //格式化时间格式
    let dateStr = '';
    if (this.agentTime) {
      dateStr = RzhtoolsService.dataFormat(this.agentTime[0], 'yyyy/MM/dd') + '-' + RzhtoolsService.dataFormat(this.agentTime[1], 'yyyy/MM/dd');
    }
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      stAftAudit:'AUDIT'
    };
    _this.goodsList = new Page(_this.submit.getData(requestUrl, requestData));
  }

  /**
   *显示物流信息
   * @param orderId
   */
  showLogistics(Logistics,ordno) {
    Logistics.style.display = 'block';
    if(isUndefined(ordno)) ordno = ordno;
    this.LogisticsData = this.OrderReviewService.getOrderLogisticsData(ordno);
  }
  /**
   *隐藏物流信息
   * @param orderId
   */
  hideLogistics(Logistics) {
    Logistics.style.display = 'none';
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
