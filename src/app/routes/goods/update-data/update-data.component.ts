import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
import {BasicPropertiesComponent} from "../basic-properties/basic-properties.component";
declare var $: any;
@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit,OnChanges,OnDestroy {
  @Input('showUpdateWindow') showUpdateWindow: boolean;
  @Output() upDate = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showUpdateWindow']) {
      if(this.showUpdateWindow) $('.wrapper > section').css('z-index', 200);
      else $('.wrapper > section').css('z-index', 114);
    }
  }
  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }
  constructor(private submit:SubmitService,private basicPropertiesComponent:BasicPropertiesComponent ) { }

  ngOnInit() {
  }
  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: string) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showUpdateWindow = false;
    if (isUndefined(type)) type = 'cancel';
    this.upDate.emit(type)
  }

  delivery(obj){
    let url = '/goodsEnum/updateGoodsEnumVal';
    let data = {
      id: obj.id,
      name: obj.name,
      enumTypeId: obj.enumTypeId
    }
    let result=this.submit.putRequest(url, data);
    this.basicPropertiesComponent.queryDatas();
  }
}
