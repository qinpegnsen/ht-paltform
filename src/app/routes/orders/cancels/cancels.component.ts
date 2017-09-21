import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
import {AjaxService} from '../../../core/services/ajax.service';
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
  @Input('orderId') orderId: string;
  @Output() cancelOrder = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['orderId'] && !isNullOrUndefined(this.orderId)){
      console.log("█ orderId ►►►",  this.orderId);
      $('.wrapper > section').css('z-index', 200);
      this.showCancelWindow = true;
    }
  }

  constructor(private ajax:AjaxService) { }

  ngOnInit() {
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
        'ordno':_this.ordnoA
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
