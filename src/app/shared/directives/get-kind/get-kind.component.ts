import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {isNullOrUndefined} from "util";
import {GoodsService} from "../../../routes/goods/goods.service";
declare var $: any;

@Component({
  selector: 'app-get-kind',
  templateUrl: './get-kind.component.html',
  styleUrls: ['./get-kind.component.scss'],
  providers: [GoodsService]
})
export class GetKindComponent implements OnInit {
  private myKindName: string = '';
  private kindId: string;
  private kindList: any;
  private show: boolean;
  private isLastLevel: boolean = false;

  @Output() myData = new EventEmitter();


  constructor(private goods: GoodsService) {
  };

  ngOnInit() {
    /**
     * 点击选框外页面时，关闭选框
     * @type {SelectAreaComponent}
     * @private
     */
    let _this = this;
    $('body').click(function (e) {
      let event = e.target.attributes['class'];
      if (isNullOrUndefined(event) || isNullOrUndefined(event.nodeValue) || event.nodeValue.indexOf("rzh-sel-kind") <= 0) {
        if (_this.show) {      //当窗口处于显示状态，则关闭选框并输出数据
          _this.myConfirm();
        }
      }
    });
  }

  /**
   * 获取分类
   * @param kind
   */
  getKindList(kind: any) {
    let me = this, level = kind.level, myKindName = kind.kindName, myKindId = kind.id, haveChildren = kind.haveChildren;
    if (level == 1) me.myKindName = '';
    if (me.myKindName == '') me.myKindName = myKindName; else me.myKindName += '>' + myKindName;
    me.kindId = myKindId;
    if (!haveChildren) {
      me.isLastLevel = true; //最后一级
      me.myConfirm(); // 如果是最后一级，关闭窗口
    } else {  //不是最后一级，获取下一级
      me.kindList = me.goods.getKindList(myKindId);
    }

  }

  /**
   * 显示分类选择器并查询一级分类
   */
  showSelectKind() {
    let me = this;
    if (me.show) {
      me.show = false;
    } else {
      me.show = true;
      me.myKindName == '';
    }
    if (me.show) me.kindList = me.goods.getKindList()
  }

  /**
   * 重置城市信息
   */
  refresh() {
    this.myKindName = '';
    this.kindId = '';
    this.kindList = this.goods.getKindList();
    this.myData.emit({
      kindId: this.kindId,
      myKindName: this.myKindName,
      isLastLevel:this.isLastLevel
    });
  }


  /**
   * 确定
   */
  myConfirm() {
    this.show = false;
    if (this.kindId == '' || isNullOrUndefined(this.kindId)) {
      this.myKindName = ''
    }
    this.myData.emit({
      kindId: this.kindId,
      myKindName: this.myKindName,
      isLastLevel:this.isLastLevel
    });
  }

}
