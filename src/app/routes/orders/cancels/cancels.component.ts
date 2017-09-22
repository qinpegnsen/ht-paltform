import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
import {AjaxService} from '../../../core/services/ajax.service';
import {queryDef} from '@angular/core/src/view';
import {Page} from '../../../core/page/page';
import {SubmitService} from '../../../core/forms/submit.service';
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
  public goodsList: Page = new Page();
  private goodsAudits: any;  // 商品审核状态列表
  private query;  // 商品审核状态列表

  @Input('orderId') orderId: string;
  @Output() cancelOrder = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['orderId'] && !isNullOrUndefined(this.orderId)){
      console.log("█ orderId ►►►",  this.orderId);
      $('.wrapper > section').css('z-index', 200);
      this.showCancelWindow = true;
      this.queryDatas();
    }
  }

  constructor(private ajax:AjaxService, private submit: SubmitService,) { }

  ngOnInit() {
    let _this = this;

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
    _this.goodsAudits = _this.submit.getData(requestUrl, requestData).voList;
    console.log("█ _this.goodsAudits  ►►►",  _this.goodsAudits );
  }

  hideWindow(){
    $('.wrapper > section').css('z-index', 114);
    this.showCancelWindow = false;
    this.cancelOrder.emit('hide')// 向外传值
  }

  canceslOrder(){
    let _this = this;
    _this.ajax.put({
      url: '/agentOrd/closeApply',
      data: {
        'ordno':_this.ordnoA,
      },
      success: (res) => {
        if (res.success) {
          //_this.router.navigate(['/main/agent/agentperson'], {replaceUrl: true}); //路由跳转
          swal('已成功取消订单', '', 'success');
          // _this.AreasComponent.queryList()//实现刷新
        } else {
          swal(res.info);
        }
      },
      error: (data) => {
        swal('取消订单失败提交失败！', 'error');
      }
    })
  }
}
