import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {isNullOrUndefined} from "util";
import {OperationService} from "../operation.service";
declare var $: any;

@Component({
  selector: 'app-get-class',
  templateUrl: './get-class.component.html',
  styleUrls: ['./get-class.component.scss']
})
export class GetClassComponent implements OnInit {
  private myKindName:string = '';
  private kindId: string;
  private kindList: any;
  private show: boolean;

  @Output() myData = new EventEmitter();

  constructor(private operationService: OperationService) {  };

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
        if(_this.show) {      //当窗口处于显示状态，则关闭选框并输出数据
          _this.myConfirm();
        }
      }
    });
  }

  /**
   * 获取分类
   * @param myKindId
   * @param myKindName
   */
  getKindList(myKindId, myKindName, level) {
    let me = this;
    if (level == 1) me.myKindName = '';
    if(me.myKindName == '') me.myKindName = myKindName;
    else me.myKindName += '>' + myKindName;
    me.kindId = myKindId;
    if(level == 3){
      me.myConfirm(); // 如果是第三级，关闭窗口
    }else{  //不是第三级则获取下一级
      me.kindList = me.operationService.getKindList(myKindId);
    }

  }

  /**
   * 显示分类选择器并查询一级分类
   */
  showSelectKind() {
    let me = this;
    if (me.show) {
      me.show = false;
    }else {
      me.show = true;
      me.myKindName == '';
    }
    if(me.show) {
      me.kindList = me.operationService.getKindList()
    }
  }

  /**
   * 重置城市信息
   */
  refresh() {
    this.myKindName = '';
    this.kindId = '';
    this.kindList = this.operationService.getKindList();
    this.myData.emit({
      kindId: this.kindId,
      myKindName: this.myKindName
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
      myKindName: this.myKindName
    });
  }

}
