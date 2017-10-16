import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
import {BasicPropertiesComponent} from "../basic-properties/basic-properties.component";
import {cli} from "webdriver-manager/built/lib/webdriver";
declare var $: any;
@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit,OnChanges,OnDestroy {
  @Input('showUpdateWindow') showUpdateWindow: boolean;
  @Input('name') name: string;
  @Input('val') val:any;
  @Input('id') id:string;

  @Input() selTypeData: any; //选中的商品分类
  @Output() upDate = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    console.log("█ this.val ►►►",  this.val);
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


  /**
   * 修改基本属性
   * @param obj
   */
  confirm(obj){
    let url = '/goodsEnum/updateBaseEnum';
    let data = {
      id: this.val[0].enumTypeId,
      kindId:this.selTypeData.kindId,
      name: obj.name,
      vals: obj.val
    }
    let result=this.submit.postRequest(url, data);
    this.hideWindow("success");
    this.basicPropertiesComponent.queryBaseEnumList();
  }
}
