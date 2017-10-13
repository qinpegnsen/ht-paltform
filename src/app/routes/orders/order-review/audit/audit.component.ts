import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Page} from '../../../../core/page/page';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute} from '@angular/router';
import {AjaxService} from '../../../../core/services/ajax.service';
import {SubmitService} from '../../../../core/forms/submit.service';
declare var $: any;
const swal = require('sweetalert');


@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  public showCancelWindow:boolean = false;
  public goodsList: Page = new Page();
  public ordno:string;//获取区域编码
  private staff:any = {};
  private id;
  private goodsAudits: any;
  private code;
  private result;

  @Input('orderId') orderId: string;
  @Output() cancelOrder = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['orderId'] && !isNullOrUndefined(this.orderId)){
      console.log("█ orderId ►►►",  this.orderId);
      this.loadAgent();
      $('.wrapper > section').css('z-index', 200);
      this.showCancelWindow = true;
      this.queryDatas();
    }
  }

  constructor(private routeInfo:ActivatedRoute,private ajax:AjaxService,private submit: SubmitService) { }

  ngOnInit() {
    let _this = this;

    _this.ordno = this.routeInfo.snapshot.queryParams['ordno'];
  }

  /**
   *
   */
  hideWindow(){
    $('.wrapper > section').css('z-index', 114);
    this.showCancelWindow = false;
    this.cancelOrder.emit('hide')// 向外传值
  }

  /**
   *查询审核中的详细数据
   */
  loadAgent(){
      this.ajax.get({
        url: '/agentOrd/loadAgentOrdReturn',
        async: false, //同步请求
        data: {ordno: this.orderId},
        success: (res) => {
          this.staff = res.data;
          console.log("█ this.staff ►►►",  this.staff);

        },
        error: (res) => {
          console.log("post limit error");
        }
      });
  }

  /**
   * 提交审核
   */
  canceslOrder(){
    let _this = this;
    _this.ajax.put({
      url: '/agentOrd/addAgentOrdReturnAudit',
      data: {
        'returnId':_this.staff.id,
        'ordno':_this.orderId,
        'result':_this.result,
        'opinionCode':_this.code,
      },
      success: (res) => {
        if (res.success) {
          swal('已成功申请', '', 'success');
          _this.hideWindow();
        } else {
          swal(res.info);
        }
      },
      error: (data) => {
        swal('申请发货提交失败！', 'error');
      }
    })
  }

  /**
   * 查询审核意见（从数据字典中获取）
   */
  queryDatas(){
    let _this = this, activePage = 1;
    let requestUrl = '/datadict/queryAllByTypeCode';
    let requestData = {
      typeCode:'refund_reason_plat'
    };
    _this.goodsAudits = _this.submit.getData(requestUrl, requestData);
    console.log("█ _this.goodsAudits  ►►►",  _this.goodsAudits );
  }


}
