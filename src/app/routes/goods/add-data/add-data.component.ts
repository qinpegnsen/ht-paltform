import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
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
  @Input('showAddWindow') showAddWindow: boolean;//弹窗是否显示
  @Input() selTypeData: any; //选中的商品分类
  @Output() addData = new EventEmitter();
  public selData:any;//选中的商品值
  public kindId: any;//选中的商品kindId
  public level:any;//选中的商品等级


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showAddWindow']) {
      if (this.showAddWindow) $('.wrapper > section'&& '.wrapper > footer ').css('z-index', 100);
      else $('.wrapper > section'&& '.wrapper > footer ').css('z-index',10);
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section'&& '.wrapper > footer ').css('z-index', 10);
  }

  constructor(public submit: SubmitService, public addDataService: AddDataService, public routeInfo: ActivatedRoute, public goods: GoodsService) {
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
    me.showAddWindow = false;
    if (isUndefined(type)) type = 'cancel';
    me.addData.emit(type)
  }

  /*
   * 确认提交
   * */
  delivery(obj) {
    let _this = this, selInfo = _this.selTypeData;
    if ((isNullOrUndefined(this.kindId) || this.kindId == "") && selInfo) _this.getKind(selInfo);
    if (this.level==3) {
      let url = '/goodsEnum/addGoodsBaseEnum';
      let data = {
        kindId: _this.kindId,
        name: obj.name,
        vals: obj.vals
      }
      let result = this.addDataService.addGoodsBaseEnum(url, data);
      if (result == "请选择三级分类" || result=="") {
        return;
      } else {
        _this.hideWindow("success");
      }
    } else {
      AppComponent.rzhAlt("error", "请选择三级分类");
    }
  }
  //查询分类
  getKind(data) {
    this.kindId = data.kindId;
    this.level=data.level;
    this.selData=data;
  }

}
