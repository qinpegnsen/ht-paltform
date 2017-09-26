import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit, OnChanges,OnDestroy {
  public showCancelWindow:boolean = false;
  @Input('orderId') orderId: string;
  @Output() cancelOrder = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['orderId'] && !isNullOrUndefined(this.orderId)){
      console.log("█ orderId ►►►",  this.orderId);
      $('.wrapper > section').css('z-index', 200);
      this.showCancelWindow = true;
    }
  }
  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }


  constructor() { }

  ngOnInit() {

  }

  hideWindow(){
    $('.wrapper > section').css('z-index', 114);
    this.showCancelWindow = false;
    this.cancelOrder.emit('hide')// 向外传值
  }

}
