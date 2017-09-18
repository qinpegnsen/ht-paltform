import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-deliver-goods',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.scss']
})
export class DeliverComponent implements OnInit {
  public showDeliverWindow:boolean = false;
  @Input('orderId') orderId: string;
  @Output() deliverGoods = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['orderId'] && !isNullOrUndefined(this.orderId)){
      console.log("█ orderId ►►►",  this.orderId);
      $('.wrapper > section').css('z-index', 200);
      this.showDeliverWindow = true;
    }
  }
  constructor() { }

  ngOnInit() {

  }

  /**
   * 关闭组件
   */
  hideWindow(){
    $('.wrapper > section').css('z-index', 114);
    this.showDeliverWindow = false;
    this.deliverGoods.emit('hide')// 向外传值
  }

  /**
   * 已选区域
   * @param data
   */
  getSelectArea(data){
    console.log("█ data ►►►",  data);
  }

  /**
   * 显示编辑框
   * @param target
   */
  showEditBox(target){
    $(target).removeClass('hide')
  }
  /**
   * 显示编辑框
   * @param target
   */
  hideEditBox(target){
    $(target).addClass('hide')
  }

}
