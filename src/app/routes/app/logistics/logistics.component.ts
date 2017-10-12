import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isUndefined} from 'util';
import {AjaxService} from '../../../core/services/ajax.service';
declare var $: any;
const swal = require('sweetalert');

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.scss']
})
export class LogisticsComponent implements OnInit {
  public showCancelWindow:boolean = false;

  @Input('orderId') orderId: string;
  @Output() upDate = new EventEmitter();
  @Output() cancelOrder = new EventEmitter();
  @Input('showAddWindow') showAddWindow: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showAddWindow']) {
      if (this.showAddWindow) $('.wrapper > section' && '.wrapper > footer').css('z-index', 100);
      else $('.wrapper > section'  && '.wrapper > footer').css('z-index', 10);
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section'  && '.wrapper > footer').css('z-index', 10);
  }
  constructor(private ajax:AjaxService) { }

  ngOnInit() {
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: string) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    // console.log("█ $('.wrapper > section').css('z-index') ►►►",  $('.wrapper > section').css('z-index'));
    this.showAddWindow = false;
    if (isUndefined(type)) type = 'cancel';
    this.upDate.emit(type)
  }

  /**
   * 选择需要显示的客户端类型
   */
  canceslOrder(){
    let _this = this;
    _this.ajax.post({
      url: '/phone/index/updateShow',
      data: {

      },
      success: (res) => {
        if (res.success) {
          swal('已成功修改', '', 'success');
          _this.hideWindow();
        } else {
          swal(res.info);
        }
      },
      error: (data) => {
        swal('修改失败！', 'error');
      }
    })
  }


}
