import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
import {BasicPropertiesComponent} from "../basic-properties/basic-properties.component";
declare var $: any;
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit, OnChanges, OnDestroy {
  @Input('showAddWindow') showAddWindow: boolean;
  @Output() addData = new EventEmitter();
  @Output() upDate = new EventEmitter();
  private kindId: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showAddWindow']) {
      console.log("█ this.showAddWindow ►►►", this.showAddWindow);
      if (this.showAddWindow) $('.wrapper > section').css('z-index', 200);
      else $('.wrapper > section').css('z-index', 114);
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(private submit: SubmitService, private basicPropertiesComponent: BasicPropertiesComponent) {
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
    // console.log("█ $('.wrapper > section').css('z-index') ►►►",  $('.wrapper > section').css('z-index'));
    this.showAddWindow = false;
    if (isUndefined(type)) type = 'cancel';
    this.addData.emit(type)
  }

  /*
   * 确认提交
   * */
  delivery(obj) {
    let url = '/goodsEnum/addGoodsBaseEnum';
    let data = {
      kindId: this.kindId,
      name: obj.name,
      vals: obj.vals
    }
    let result = this.submit.postRequest(url, data, true);
    if (result == "分类id不能为空") {
      return;
    } else {
      this.hideWindow("success");
      this.basicPropertiesComponent.queryBaseEnumList();
    }
  }

  //查询分类
  getKind(data) {
    this.kindId = data.kindId;
  }

}
