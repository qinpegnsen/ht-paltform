import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-look-logistics',
  templateUrl: './look-logistics.component.html',
  styleUrls: ['./look-logistics.component.scss']
})
export class LookLogisticsComponent implements OnInit {
  public showLogisticsWindow:boolean = false;
  @Input('orderId') orderId: string;
  @Output() lookOver = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['orderId'] && !isNullOrUndefined(this.orderId)){
      console.log("█ orderId ►►►",  this.orderId);
      $('.wrapper > section').css('z-index', 200);
      this.showLogisticsWindow = true;
    }
  }
  constructor() { }

  ngOnInit() {

  }

  hideWindow(){
    $('.wrapper > section').css('z-index', 114);
    this.showLogisticsWindow = false;
    this.lookOver.emit('hide')// 向外传值
  }

}
