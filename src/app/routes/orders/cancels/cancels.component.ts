import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
import {AjaxService} from '../../../core/services/ajax.service';
import {Page} from '../../../core/page/page';
import {SubmitService} from '../../../core/forms/submit.service';
import {ActivatedRoute} from '@angular/router';
import {RzhtoolsService} from '../../../core/services/rzhtools.service';
declare var $: any;
const swal = require('sweetalert');

@Component({
  selector: 'app-cancels',
  templateUrl: './cancels.component.html',
  styleUrls: ['./cancels.component.scss']
})
export class CancelsComponent implements OnInit {
  public showCancelWindow:boolean = false;
  public ordnoA;
  public code;
  public goodsList: Page = new Page();
  public goodsAudits: any;
  public query;  // 商品审核状态列表
  public staff={};
  public ordno:string;//获取区域编码
  public reqMoney;

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

  constructor(public ajax:AjaxService, public submit: SubmitService,public routeInfo:ActivatedRoute,public rzhtools:RzhtoolsService) { }

  ngOnInit() {
    let _this = this;
    _this.ordno = this.routeInfo.snapshot.queryParams['ordno'];
  }

  /**
   * 输入两位小数
   * @param target
   * @param type
   */
  twoNum(target,type?){
    this.rzhtools.auditInputValueForNum(target,type);
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

  hideWindow(bol){
    $('.wrapper > section').css('z-index', 114);
    this.showCancelWindow = false;
    this.cancelOrder.emit({hide:'hide',bol:bol})// 向外传值
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
        'reqMoney':_this.reqMoney
      },
      success: (res) => {
        if (res.success) {
          swal('关闭申请已提交', '', 'success');
          _this.hideWindow(true);
        } else {
          swal(res.info,'','error');
        }
      },
      error: (data) => {
        swal('关闭申请提交失败！','' ,'error');
      }
    })
  }
}
