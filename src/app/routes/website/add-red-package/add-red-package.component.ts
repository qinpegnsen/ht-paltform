import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {WebstiteService} from "../webstite.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {listLocales} from "ngx-bootstrap/bs-moment";
import {TimepickerConfig} from "ngx-bootstrap";
const swal = require('sweetalert');
declare var $: any;

/**
 * 对时间的配置
 * @returns {TimepickerConfig&{hourStep: number, minuteStep: number, showMeridian: boolean, readonlyInput: boolean, mousewheel: boolean}}
 */
export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true
  });
}

@Component({
  selector: 'app-add-red-package',
  templateUrl: './add-red-package.component.html',
  styleUrls: ['./add-red-package.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]//注入配置好的默认的时间
})
export class AddRedPackageComponent implements OnInit {

  public moduleList = [];             //新增的红包规则的数组
  public deletebutton;                //删除的按钮
  public datepickerModel: Date = new Date();  //红包的日期
  public minDate: Date = new Date();          //默认最小的日期
  // public minTime: Date = new Date();          //默认显示的最小的时分秒
  public showSec: boolean = true;           //是否显示秒，默认不显示
  public myTime: string;                    //红包的时分秒
  public totalNum: string;                  //红包的总数
  public totalPrice: string;                //红包的总额
  bsConfig: Partial<BsDatepickerConfig>;
  locale: 'cn';
  locales = listLocales();
  constructor(public location: Location,public service: WebstiteService) {
    // this.minTime.setHours(8);//最小的时间
    // this.minTime.setMinutes(0);
    this.bsConfig = Object.assign({}, {
      locale: this.locale,
      dateInputFormat: 'YYYY-MM-DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY-MM-DD'
    });
  }

  ngOnInit() {
    this.deletebutton = {
      type: "delete",
      title: '删除红包规则',
    };
  }

  /**
   * 根据数量生成概率
   * @param item
   * @param obj
   */
  getProbability(item,obj){
   let  probability=(+item.num)/(+this.totalNum);
    $(obj).parents('tr').find('.probability').val(probability);//根据数量，自动生成概率
  }

  /**
   * 根据概率生成数量
   * @param item
   * @param obj
   */
  getNum(item,obj){
    let  num=(+this.totalNum)*(+item.probability);
    $(obj).parents('tr').find('.redPacketNumber').val(num);//根据数量，自动生成概率
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow() {
    this.location.back();
  }


  /**
   * 显示编辑框
   * @param target
   */
  showEditBox(target) {
    $(target).removeClass('hide')
  }

  /**
   * 显示编辑框
   * @param target
   */
  hideEditBox(target) {
    $(target).addClass('hide')
  }

  /**
   * 确认发货
   */
  delivery() {
    this.location.back();
  }

  /**
   * 添加红包规则
   */
  add() {

    this.moduleList.push({
      amount: '',
      num: '',
      level: '',
      effectiveTimeStr: '',
    });

    /**
     * 判断总的数量是否超过设定的红包数量
     */
    let numberArr=$("tr").find(".redPacketNumber");
    console.log("█ numberArr ►►►",  numberArr);
  }

  /**
   * 删除当前的红包规则
   * @param event
   */
  delete(i) {
    let _this = this;
    swal({
        title: '确认删除此信息？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        _this.moduleList.splice(i, 1)
      }
    );
  }

  /**
   * 关闭右侧滑动页面
   */
  cancel() {
    let _this = this
    _this.location.back();
  }

  /**
   * 增加红包规则
   */
  addRedPackRules(){
    let _this = this;
    let url='/rpSetting/addRpSettingBatch';
    let json={
      rpSettingStrVOList:this.moduleList
    };
    let data={
      rpSettingBatchStr:JSON.stringify(json)
    };
    this.service.addRedPackRules(url,data);
    _this.location.back();
  }

}
