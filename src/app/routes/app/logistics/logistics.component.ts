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

  @Output() upDate = new EventEmitter();
  @Output() cancelOrder = new EventEmitter();
  @Input('showAddWindow') showAddWindow: boolean;
  @Input('indexId') indexId:string;
  @Input('indexData') indexData:any;

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


  public changeIndexData(client){
    if(client=='web'){
      this.indexData.web= this.indexData.web=='Y'?'N':'Y';
    }
    else if(client=='wap'){
      this.indexData.wap= this.indexData.wap=='Y'?'N':'Y';
    }
    else if(client=='wx'){
      this.indexData.wx= this.indexData.wx=='Y'?'N':'Y';
    }
    else  if(client=='android'){
      this.indexData.android= this.indexData.android=='Y'?'N':'Y';
    }
    else if(client=='ios'){
      this.indexData.ios= this.indexData.ios=='Y'?'N':'Y';
    }
  }
  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: string) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    // console.log("█ $('.wrapper > section').css('z-index') ►►►",  $('.wrapper > section').css('z-index'));
    me.showAddWindow = false;
    if (isUndefined(type)) type = 'cancel';
    me.upDate.emit(type)
  }

  /**
   * 选择需要显示的客户端类型
   */
  canceslOrder(indexId){
    let _this = this;
    _this.ajax.post({
      url: '/phone/index/updateShow',
      data: {
        id:indexId,
        web:_this.indexData.web,
        wap:_this.indexData.wap,
        wx:_this.indexData.wx,
        android:_this.indexData.android,
        ios:_this.indexData.ios,
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
