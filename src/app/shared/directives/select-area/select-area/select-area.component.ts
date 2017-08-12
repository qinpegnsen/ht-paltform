import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
declare var $: any;

@Component({
  selector: 'app-select-area',
  templateUrl: './select-area.component.html',
  styleUrls: ['./select-area.component.scss'],
  providers: [RzhtoolsService]
})
export class SelectAreaComponent implements OnInit {
  private show: boolean = false;
  private areas: any;
  private areaCode: string = '';
  private adr: string = '';
  @Input() private required: boolean;
  @Input() private selectedAreaName: string;
  @Output() myData = new EventEmitter();

  constructor(private tools: RzhtoolsService) {
  };

  ngOnInit() {
    if (this.selectedAreaName != '' || !isNullOrUndefined(this.selectedAreaName))this.adr = this.selectedAreaName;
    /**
     * 点击区域选框外页面时，关闭选框
     * @type {SelectAreaComponent}
     * @private
     */
    let _this = this;
    $('body').click(function (e) {
      let event = e.target.attributes['class'];
      if (isNullOrUndefined(event) || isNullOrUndefined(event.nodeValue) || event.nodeValue.indexOf("rzh-sel-city") <= 0) _this.show = false; //关闭选框
    });
  }

  /**
   * 获取地区列表
   * @param fullName 全名
   * @param myAreaCode 区域编码
   * @param isOld 是否为老版
   */
  getArea(fullName, myAreaCode, isOld) {
    let me = this;
    me.show = true;
    me.areas = me.tools.getAreaByCode(myAreaCode, isOld).children;
    me.adr = fullName;
    me.areaCode = myAreaCode;
    if (isNullOrUndefined(me.areas) || me.areas.length == 0) {
      me.cityConfirm();
    }
  }

  /**
   * 显示城市选择器并获取省级列表
   */
  showSelectArea() {
    let me = this;
    if (me.show) return;
    me.show = true;
    me.areas = me.tools.getAreaByCode('');
  }

  /**
   * 重置城市信息
   */
  freshCitys() {
    this.adr = '';
    this.areas = this.tools.getAreaByCode('');
  }

  /**
   * 确定选择城市
   */
  cityConfirm() {
    this.show = false;
    if (this.adr == '') {
      this.areaCode = ''
    }
    this.myData.emit({
      areaCode: this.areaCode,
      adr: this.adr
    });
  }
}
