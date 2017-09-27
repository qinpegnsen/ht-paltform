import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
import {AjaxService} from '../../../core/services/ajax.service';
import {Page} from '../../../core/page/page';
import {SubmitService} from '../../../core/forms/submit.service';
import {ActivatedRoute} from '@angular/router';
declare var $: any;
const swal = require('sweetalert');

@Component({
  selector: 'app-cancels',
  templateUrl: './cancels.component.html',
  styleUrls: ['./cancels.component.scss']
})
export class CancelsComponent implements OnInit {
  public showCancelWindow:boolean = false;
  private ordnoA;
  private code;
  public goodsList: Page = new Page();
  private goodsAudits: any;  // 商品审核状态列表
  private query;  // 商品审核状态列表
  public staff={};
  public ordno:string;//获取区域编码

  @Input('orderId') orderId: string;
  @Output() cancelOrder = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['orderId'] && !isNullOrUndefined(this.orderId)){
      console.log("█ orderId ►►►",  this.orderId);

      $('.wrapper > section').css('z-index', 200);
      this.showCancelWindow = true;
      this.queryDatas();
      this.displayDates();
    }
  }

  constructor(private ajax:AjaxService, private submit: SubmitService,private routeInfo:ActivatedRoute) { }

  ngOnInit() {
    let _this = this;
    _this.ordno = this.routeInfo.snapshot.queryParams['ordno'];
  }

  /**
   * 显示关闭申请中的条件
   */
  displayDates(){
    if(typeof(this.ordno)) {
      this.ajax.get({
        url: '/agentOrd/loadAgentOrdPayRec',
        async: false, //同步请求
        data: {ordno: this.orderId},
        success: (res) => {
          console.log("█ res ►►►",  res);
          if(!isNullOrUndefined(res.data)){
            this.staff = res.data;
          }

        },
        error: (res) => {
          console.log("post limit error");
        }
      });
    }
  }

  /**
   * 查询关闭订单原因
   */
  queryDatas(){
    let _this = this, activePage = 1;
    let requestUrl = '/datadict/querryDatadictList';
    let requestData = {
      code:'refund_reason_cust'
    };
    _this.goodsAudits = _this.submit.getData(requestUrl, requestData);
    console.log("█ _this.goodsAudits  ►►►",  _this.goodsAudits );
  }

  hideWindow(){
    $('.wrapper > section').css('z-index', 114);
    this.showCancelWindow = false;
    this.cancelOrder.emit('hide')// 向外传值
  }

  /**
   * 代理商订单关闭申请
   */
  canceslOrder(){
    let _this = this;
    _this.ajax.put({
      url: '/agentOrd/confirmCloseApply',
      data: {
        'ordno':_this.orderId,
        'reasonCode':_this.code,
      },
      success: (res) => {
        if (res.success) {
          swal('已成功取消订单', '', 'success');
          _this.hideWindow();
        } else {
          swal(res.info,'','error');
        }
      },
      error: (data) => {
        swal('取消订单失败提交失败！','' ,'error');
      }
    })
  }
}
