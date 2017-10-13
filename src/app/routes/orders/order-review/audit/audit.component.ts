import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Page} from '../../../../core/page/page';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute} from '@angular/router';
import {AjaxService} from '../../../../core/services/ajax.service';
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

  @Input('orderId') orderId: string;
  @Output() cancelOrder = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['orderId'] && !isNullOrUndefined(this.orderId)){
      console.log("█ orderId ►►►",  this.orderId);
      this.loadAgent();
      $('.wrapper > section').css('z-index', 200);
      this.showCancelWindow = true;
    }
  }

  constructor(private routeInfo:ActivatedRoute,private ajax:AjaxService) { }

  ngOnInit() {
    let _this = this;

    _this.ordno = this.routeInfo.snapshot.queryParams['ordno'];
  }

  hideWindow(){
    $('.wrapper > section').css('z-index', 114);
    this.showCancelWindow = false;
    this.cancelOrder.emit('hide')// 向外传值
  }


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


  canceslOrder(){
    let _this = this;
    _this.ajax.put({
      url: '/agentOrd/addAgentOrdReturnAudit',
      data: {
        'returnId':_this.staff.id,
        'ordno':_this.orderId,
        'result':'',
        'opinionCode':'',
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


}
