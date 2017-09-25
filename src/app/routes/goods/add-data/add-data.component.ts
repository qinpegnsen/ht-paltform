import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
declare var $: any;
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit,OnChanges{
  @Input('showAddWindow') showAddWindow: boolean;
  @Output() addData = new EventEmitter();
  @Output() upDate = new EventEmitter();
  private kindId:string;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showAddWindow']) {
      $('.wrapper > section').css('z-index', 200);
    }
  }

  constructor(private submit:SubmitService) {
  }

  ngOnInit() {
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: string) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showAddWindow = false;
    if (isUndefined(type)) type = 'cancel';
    this.addData.emit(type)
  }

  delivery(obj){
    let url = '/goodsEnum/addGoodsBaseEnum';
    let data = {
      kindId:this.kindId,
      name: obj.name,
      vals: obj.vals
    }
    let result=this.submit.postRequest(url, data);

    console.log("█ result ►►►",  result);
  }

  //查询分类
  getKind(data) {
    this.kindId = data.kindId;
  }

}
