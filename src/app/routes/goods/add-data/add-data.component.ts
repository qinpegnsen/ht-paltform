import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
import {BasicPropertiesComponent} from "../basic-properties/basic-properties.component";
import {AppComponent} from "../../../app.component";
import {AddDataService} from "./add-data.service";
import {ActivatedRoute} from "@angular/router";
import {GoodsService} from "../goods.service";
declare var $: any;
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
  providers: [AddDataService]
})
export class AddDataComponent implements OnInit, OnChanges, OnDestroy {
  @Input('showAddWindow') showAddWindow: boolean;
  @Input() selTypeData: any; //选中的商品分类
  @Output() addData = new EventEmitter();
  @Output() upDate = new EventEmitter();
  private kindId: any;
  private isLastLevel: boolean;

  private Id: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showAddWindow']) {
      console.log("█ this.selTypeData ►►►", this.selTypeData);
      if (this.showAddWindow) $('.wrapper > section').css('z-index', 200);
      else $('.wrapper > section').css('z-index', 114);
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(private submit: SubmitService, private basicPropertiesComponent: BasicPropertiesComponent,
              private addDataService: AddDataService, private routeInfo: ActivatedRoute, private goods: GoodsService) {
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
    let _this = this, selInfo = _this.selTypeData;
    if ((isNullOrUndefined(this.kindId) || this.kindId == "") && selInfo) _this.getKind(selInfo);
    if (this.isLastLevel) {
      let url = '/goodsEnum/addGoodsBaseEnum';
      let data = {
        kindId: this.kindId,
        name: obj.name,
        vals: obj.vals
      }
      let result = this.addDataService.addGoodsBaseEnum(url, data);
      console.log("█ result ►►►",  result);
      if (result == "分类中未选中最后一级") {
        return;
      } else {
        this.hideWindow("success");
        this.basicPropertiesComponent.queryBaseEnumList(this.kindId);
      }
    } else {
      AppComponent.rzhAlt("error", "分类未选中最后一级");
    }
  }

  //查询分类
  getKind(data) {
    this.kindId = data.kindId;
    this.isLastLevel = data.isLastLevel;
  }

}
