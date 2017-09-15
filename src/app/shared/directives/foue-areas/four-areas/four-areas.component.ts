import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
declare var $: any;

@Component({
  selector: 'app-four-areas',
  templateUrl: './four-areas.component.html',
  styleUrls: ['./four-areas.component.scss']
})
export class FourAreasComponent implements OnInit {
  private show: boolean = false;
  private areas: any;
  private areaCode: string = '';
  private adr: string = '';
  @Input() private selectedAreaName: string;
  @Output() myData = new EventEmitter();

  constructor(private tools: RzhtoolsService) {  };

  ngOnInit() {
    if (this.selectedAreaName != '' || !isNullOrUndefined(this.selectedAreaName)) this.adr = this.selectedAreaName;
    /**
     * 点击区域选框外页面时，关闭选框
     * @type {SelectAreaComponent}
     * @private
     */
    let _this = this;
    $('body').click(function (e) {
      let event = e.target.attributes['class'];
      if (isNullOrUndefined(event) || isNullOrUndefined(event.nodeValue) || event.nodeValue.indexOf("rzh-sel-city") <= 0) {
        if(_this.show){
          _this.cityConfirm()
        }
      } //关闭选框
    });
  }

  /**
   * 获取地区列表
   * @param fullName 全名
   * @param myAreaCode 区域编码
   * @param isOld 是否为老版
   */
  getArea(fullName, myAreaCode, level) {
    let me = this;
    me.adr = fullName;
    me.areaCode = myAreaCode;
    if (level == 4) {  // 如果是第四级了
      me.cityConfirm();
    }else{
      me.areas = me.tools.getAreaList(myAreaCode, level);
      if(isNullOrUndefined(me.areas)) me.cityConfirm();// 如果查出来第四级没有数据，则隐藏选择框
    };
  }

  /**
   * 显示城市选择器并获取省级列表
   */
  showSelectArea() {
    let me = this;
    if (me.show) return;
    me.show = true;
    me.areas = me.tools.getAreaList();
  }

  /**
   * 重置城市信息
   */
  freshCitys() {
    this.adr = '';
    this.areaCode = '';
    this.areas = this.tools.getAreaList();
    this.myData.emit({
      areaCode: this.areaCode,
      adr: this.adr
    });
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
