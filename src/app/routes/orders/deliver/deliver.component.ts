import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from 'util';
import {SubmitService} from '../../../core/forms/submit.service';
import {PatternService} from '../../../core/forms/pattern.service';
import {PlatformOrderService} from '../platform-order.service';
import {AjaxService} from '../../../core/services/ajax.service';
import {PlatformPendingComponent} from '../platform-pending/platform-pending.component';
declare var $: any;
const swal = require('sweetalert');

@Component({
  selector: 'app-deliver',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.scss']
})
export class DeliverComponent implements OnInit {
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
      this.expressList = this.platformOrderService.getBasicExpressList();   //物流公司列表
      this.showDeliverWindow = true;
      this.expressNo = null;      //每次出来把上次填的订单号清除，快递公司就算了，留着吧
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(public platformOrderService: PlatformOrderService, public submit: SubmitService, public pattern: PatternService, public ajax: AjaxService,public platformPendingComponent:PlatformPendingComponent) {
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
    //console.log("█ data ►►►", data);
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
    let _this = this;
    _this.ajax.get({
      url: '/ord/plantDelivery',
      data: {
        ordno: this.orderId,
        expressCode: this.expressCode,
        expressNo: this.expressNo
      },
      success: (res) => {
        if (res.success) {
          swal('已成功发货', '', 'success');
          _this.hideWindow();
          _this.platformPendingComponent.queryDatas(1)
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
