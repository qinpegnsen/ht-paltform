import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
import {Page} from "../../../../core/page/page";
declare var $: any;
const swal = require('sweetalert');
@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
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
      $('.wrapper > section' && '.wrapper > footer ').css('z-index', 100);
      this.showCancelWindow = true;
    }
  }
  constructor() { }

  ngOnInit() {
  }
  /**
   *
   */
  hideWindow(){
    $('.wrapper > section'&& '.wrapper > footer ').css('z-index', 40);
    this.showCancelWindow = false;
    this.cancelOrder.emit('hide')// 向外传值
  }

}
