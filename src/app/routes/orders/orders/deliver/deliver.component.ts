import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {OrdersService} from "../orders.service";
import {SubmitService} from "../../../../core/forms/submit.service";
declare var $: any;

@Component({
  selector: 'app-deliver-goods',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.scss']
})

export class DeliverComponent implements OnInit, OnDestroy, OnChanges {
  public showDeliverWindow: boolean = false;
  public expressList: any;   //物流公司列表
  public expressNo: any;     //快递公司快递号
  public expressCode: any;   //快递公司唯一代码
  @Input('orderId') orderId: string;
  @Input('page') page: string;
  @Output() deliverGoods = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderId'] && !isNullOrUndefined(this.orderId)) {
      $('.wrapper > section').css('z-index', 200);
      this.expressList = this.ordersServe.getBasicExpressList();   //物流公司列表
      console.log("█ expr ►►►",  this.expressList);
      this.showDeliverWindow = true;
      this.expressNo = null;      //每次出来把上次填的订单号清除，快递公司就算了，留着吧
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(private ordersServe: OrdersService, public submit: SubmitService) {
  }

  ngOnInit() {

  }


  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: boolean) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showDeliverWindow = false;
    if (isUndefined(type)) type = false;
    this.deliverGoods.emit({
      type: type,
      page: me.page
    })// 向外传值
  }

  /**
   * 已选区域
   * @param data
   */
  getSelectArea(data) {
    console.log("█ data ►►►", data);
  }

  /**
   * 显示编辑框
   * @param target
   */
  showEditBox(target) {
    $(target).removeClass('hide')
  }

  /**
   * 显示编辑框
   * @param target
   */
  hideEditBox(target) {
    $(target).addClass('hide')
  }

  /**
   * 确认发货
   */
  delivery() {
    let url = '/ord/plantDelivery';
    let data = {
      ordno: this.orderId,
      expressCode: this.expressCode,
      expressNo: this.expressNo
    }
    let result = this.submit.getRequest(url, data);
    if (isNullOrUndefined(result)) this.hideWindow(true)
  }

}
