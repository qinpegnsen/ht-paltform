import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
import {ActivatedRoute} from '@angular/router';
import {SubmitService} from '../../../../core/forms/submit.service';
import {AjaxService} from '../../../../core/services/ajax.service';
import {Page} from '../../../../core/page/page';
import {AwaitingDeliveryComponent} from '../awaiting-delivery/awaiting-delivery.component';
import {AllStockComponent} from '../all-stock/all-stock.component';
import {PatternService} from '../../../../core/forms/pattern.service';
declare var $: any;
const swal = require('sweetalert');

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.scss']
})
export class LogisticsComponent implements OnInit {
  public showCancelWindow:boolean = false;
  public goodsList: Page = new Page();
  public goodsAudits: any;  // 商品审核状态列表
  public ordno:string;//获取区域编码
  public expressNos;
  public expressCode;

  @Input('orderId') orderId: string;
  @Output() cancelOrder = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['orderId'] && !isNullOrUndefined(this.orderId)){
      //console.log("█ orderId ►►►",  this.orderId);
      $('.wrapper > section').css('z-index', 200);
      this.showCancelWindow = true;
      this.queryDatas();
    }
  }


  constructor(public ajax:AjaxService, public submit: SubmitService,public routeInfo:ActivatedRoute,public AwaitingDeliveryComponent:AwaitingDeliveryComponent,public AllStockComponent:AllStockComponent,public patterns: PatternService) { }

  ngOnInit() {
    let _this = this;
    _this.ordno = this.routeInfo.snapshot.queryParams['ordno'];
  }



  hideWindow(){
    $('.wrapper > section').css('z-index', 114);
    this.showCancelWindow = false;
    this.cancelOrder.emit('hide')// 向外传值
  }

  /**
   * 查询所有物流公司
   */
  queryDatas(){
    let _this = this, activePage = 1;
    let requestUrl = '/basicExpress/queryBasicExpressIsUseList';
    let requestData = {
      queryKeywords:''
    };
    _this.goodsAudits = _this.submit.getData(requestUrl, requestData);
    console.log("█ _this.goodsAudits  ►►►",  _this.goodsAudits );
  }

  /***
   * 设置发货
   */
  canceslOrder(){
    let _this = this;
    _this.ajax.put({
      url: '/agentOrd/updateStateToDelivery',
      data: {
        'ordno':_this.orderId,
        'expressNo':_this.expressNos,
        'expressCode':_this.expressCode
      },
      success: (res) => {
        if (res.success) {
          swal('已成功发货', '', 'success');
          _this.hideWindow();
          _this.AwaitingDeliveryComponent.queryDatas(1);
          _this.AllStockComponent.queryDatas(1);
        } else {
          swal(res.info);
        }
      },
      error: (data) => {
        swal('申请发货提交失败！', 'error');
      }
    })
  }
}
