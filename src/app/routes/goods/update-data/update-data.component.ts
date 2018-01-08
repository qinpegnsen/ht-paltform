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
  @Input('showUpdateWindow') showUpdateWindow: boolean;//是否显示修改弹窗
  @Input('name') name: string;//属性名称
  @Input('val') val:any;//属性值（所有）
  @Input('id') id:string;//商品id
  public valStr: string='';//每个属性值

  @Input() selTypeData: any; //选中的商品分类
  @Output() upDate = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    let me=this;
    me.valStr='';
    if(!isUndefined(me.val) && me.val.length > 0){
      for(let i = 0; i < me.val.length; i ++){
        me.valStr += me.val[i].enumValue +',';
        me.valStr = me.valStr.substring(0,me.valStr.length-1) + ",";
      }
    }
    if (changes['showUpdateWindow']) {
      if(me.showUpdateWindow) $('.wrapper > section'&& '.wrapper > footer ').css('z-index', 100);
      else $('.wrapper > section'&& '.wrapper > footer ').css('z-index', 10);
    }
  }
  ngOnDestroy(): void {
    $('.wrapper > section'&& '.wrapper > footer ').css('z-index', 10);
  }
  constructor(public submit:SubmitService,public basicPropertiesComponent:BasicPropertiesComponent ) { }

  ngOnInit() {
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: string) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    me.showUpdateWindow = false;
    if (isUndefined(type)) type = 'cancel';
    me.upDate.emit(type)
  }


  /**
   * 修改基本属性
   * @param obj
   */
  confirm(obj){
    let me=this;
    let url = '/goodsEnum/updateBaseEnum';
    let data = {
      id: this.val[0].enumTypeId,
      kindId:this.selTypeData.kindId,
      name: obj.name,
      vals: obj.valStr
    }
    let result=me.submit.postRequest(url, data);
    if(result=="商品分类基本属性已存在"){
     return;
    }else{
      me.hideWindow("success");
      me.basicPropertiesComponent.queryBaseEnumList();
    }

  }
}
