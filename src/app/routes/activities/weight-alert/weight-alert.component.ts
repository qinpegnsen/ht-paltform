import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from 'util';
import {SubmitService} from '../../../core/forms/submit.service';
import {PatternService} from '../../../core/forms/pattern.service';
import {AjaxService} from '../../../core/services/ajax.service';
import {AppComponent} from "../../../app.component";
import {ActivitiesService} from "../activities.service";
declare var $: any;
const swal = require('sweetalert');

@Component({
  selector: 'app-weight-alert',
  templateUrl: './weight-alert.component.html',
  styleUrls: ['./weight-alert.component.scss']
})
export class WeightAlertComponent implements OnInit {
  public showDeliverWindow: boolean = false;
  public curWeight:any;   //重置后的权重
  @Input('orderId') orderId: string;
  @Input('weight') weight: string;
  @Input('page') page: string;
  @Output() deliverGoods = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderId'] && !isNullOrUndefined(this.orderId)) {
      $('.wrapper > section').css('z-index', 200);
      this.showDeliverWindow = true;
      this.curWeight='';
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor( public submit: SubmitService, public pattern: PatternService, public ajax: AjaxService,public activitiesService:ActivitiesService) {
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
   * 设置权重
   */
  delivery() {
    let url='/rpStore/updateRpStoreWeight';
    let data={
      id: this.orderId,
      weight: this.curWeight,
    };
    if(this.curWeight>2147483647){
      AppComponent.rzhAlt("info", '请输入小于2147483647数字');
      return;
    }
    let result=this.activitiesService.updateRpStoreWeight(url,data);
    if(result){
      this.hideWindow(true);
    }
  }
}
