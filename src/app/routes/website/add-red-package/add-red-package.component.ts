import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {WebstiteService} from "../webstite.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {listLocales} from "ngx-bootstrap/bs-moment";
import {AppComponent} from "../../../app.component";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {number} from "ng2-validation/dist/number";
import {PatternService} from "../../../core/forms/pattern.service";
const swal = require('sweetalert');
declare var $: any;

@Component({
  selector: 'app-add-red-package',
  templateUrl: './add-red-package.component.html',
  styleUrls: ['./add-red-package.component.scss'],
})
export class AddRedPackageComponent implements OnInit {

  public moduleList = [];                     //新增的红包规则的数组
  public moduleListCopy = [];                 //复制新增的红包规则的数组
  public settingNumber: any;                  //后台设置的红包的数量
  public deletebutton;                        //删除的按钮
  public datepickerModel:any;  //红包的日期
  public setDate: string;                     //经过转换过后设置的日期
  public setTime: string = '00:00:00';          //默认的时分秒
  public effectiveTimeStr: string;            //转换过后组合好的时间
  public minDate: Date = new Date();          //默认最小的日期
  public totalNum: string = '';               //红包的总数
  public totalAmount: string = '';            //红包的总额
  public sumOfNumArray: string;               //红包数量累计的总数
  public sumOfAmountArray: string;            //红包面额累计的总数
  bsConfig: Partial<BsDatepickerConfig>;
  locale: 'cn';
  locales = listLocales();

  constructor(public location: Location,
              public patternService: PatternService,
              public service: WebstiteService) {
    this.bsConfig = Object.assign({}, {
      locale: this.locale,
      dateInputFormat: 'YYYY-MM-DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY-MM-DD'
    });
  }

  ngOnInit() {
    this.datepickerModel=this.minDate=RzhtoolsService.getAroundDateByDate(new Date(),+1);
    this.formatSelDate();
    this.getSettingNum();
    this.deletebutton = {
      type: "delete",
      title: '删除红包规则',
    };
  }

  /**
   * 获取后台设置的红包的最小的数量
   */
  getSettingNum() {
    let url = '/rpSetting/countRpSettingNum';
    let data = {};
    this.totalNum = this.settingNumber = this.service.getSettingNum(url, data);
  }

  /**
   * 当红包数量再次改变的时候该表已经添加的红包规则的概率
   */
  changeNumber() {
    let probabilityArray = $("tr");
    for (var i = 0; i < probabilityArray.length; i++) {
      let value=Number($(probabilityArray[i]).find(".redPacketNumber").val())/Number(this.totalNum)
      $(probabilityArray[i]).find(".probability").val(value)
    };
  }

  /**
   * 根据数量生成概率
   * @param item
   * @param obj
   */
  getProbability(item, obj) {
    let probability = ((+item.num) / (+this.totalNum)).toFixed(2);
    $(obj).parents('tr').find('.probability').val(probability);//根据数量，自动生成概率
  }

  /**
   * 根据概率生成数量
   * @param item
   * @param obj
   */
  getNum(item, obj) {
    // let trueProbability=(+$(obj).val()).toFixed(2);
    // $(obj).val(trueProbability);//保留两位小数
    // let num = ((+this.totalNum) * (+item.probability)).toFixed(2);
    // $(obj).parents('tr').find('.redPacketNumber').val(num);//根据数量，自动生成概率
  }

  /**
   * 添加红包规则
   */
  add() {
    let bol = this.siteStep()//看红包的数量和总面额都设置好没
    if (!bol) {//如果返回false就说明没有设置好，中断下面的步骤
      return;
    }
    /**
     * 判断总的数量是否超过设定的红包数量
     */
    setTimeout(() => {

      this.getRedPacketNum()//获取添加规则前红包的累计数量
      this.getRedPacketAmount()//获取添加规则前红包累计的面额

      /**
       * 进行判断是否追加，如果添加规则前已经超出总数量和总面额就不能添加
       */
      if (Number(this.sumOfNumArray) > Number(this.totalNum)) {//超出的话禁止追加
        AppComponent.rzhAlt("info", '已超过红包设置的总数量');
      } else if (Number(this.sumOfNumArray) == Number(this.totalNum)) {//等于的话禁止追加
        AppComponent.rzhAlt("info", '红包总数量以分配完');
      } else if (Number(this.sumOfAmountArray) > Number(this.totalAmount)) {//超出的话禁止追加
        AppComponent.rzhAlt("info", '已超过红包设置的总面额');
      } else if (Number(this.sumOfAmountArray) == Number(this.totalAmount)) {//等于的话禁止追加
        AppComponent.rzhAlt("info", '红包总面额已分配完');
      } else {//如果红包的数量没有超出继续追加
        this.moduleList.push({
          amount: '1',
          num: '1',
          level: '1',
          probability: (1 / Number(this.totalNum)).toFixed(2),
        });
      }
    }, 0)
  }

  /**
   * 设置红包的步骤
   * 1.设置红包数量
   * 2.设置红包总金额
   *
   */
  siteStep() {
    if (this.totalNum == '') {
      AppComponent.rzhAlt("info", '请先设置红包的总数量');
      return false;
    } else if (this.totalAmount == '') {
      AppComponent.rzhAlt("info", '请先设置红包的总面额');
      return false;
    }
    return true;
  }

  /**
   * 数组的求和公式
   * @param acc
   * @param value
   * @returns {number}
   */
  sum(acc, value) {
    return (+acc) + (+value)
  }

  /**
   * 获取红包的累计数量
   */
  getRedPacketNum() {
    let numArray = $("tr").find(".redPacketNumber");
    let newNumArray = [];//新的数组，用老保存所有红包的数量
    for (var i = 0; i < numArray.length; i++) {
      newNumArray.push($(numArray[i]).val())
    }
    ;
    this.sumOfNumArray = newNumArray.reduce(this.sum, 0);
  }

  /**
   * 获取红包的累计的面额
   */
  getRedPacketAmount() {
    let amountArray = $("tr").find(".amount");
    let newAmountArray = [];//新的数组，用老保存所有红包的面额
    for (var i = 0; i < amountArray.length; i++) {
      newAmountArray.push($(amountArray[i]).val())
    }
    ;
    this.sumOfAmountArray = newAmountArray.reduce(this.sum, 0);
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
   * 格式化所选日期及时间
   */

  formatSelDate() {
    let _this = this;
    _this.setDate = RzhtoolsService.dataFormat(new Date(_this.datepickerModel), "yyyy-MM-dd");//获取日历选中时间
  }

  /**
   * 对数据进行重构，因为后台要求的不要概率，要生效时间
   */
  refactorData() {
    this.moduleListCopy = this.moduleList.slice(0);//深拷贝，还是没实现
    for (let i = 0; i < this.moduleListCopy.length; i++) {//删除概率，增加生效时间
      if (this.moduleListCopy[i].probability) {
        delete this.moduleListCopy[i].probability;
        this.moduleListCopy[i].effectiveTimeStr = this.effectiveTimeStr;
      }
    }
  }

  /**
   * 增加红包规则
   */
  addRedPackRules() {
    this.getRedPacketAmount()//获取添加规则后的总面额
    this.getRedPacketNum()//获取添加规则后的总数量
    if (Number(this.sumOfNumArray) > Number(this.totalNum)) {
      AppComponent.rzhAlt("info", '已超过红包设置的总数量');
    } else if (Number(this.sumOfNumArray) < Number(this.totalNum)) {
      AppComponent.rzhAlt("info", '未达到红包设置的总数量');
    } else if (Number(this.sumOfAmountArray) > Number(this.totalAmount)) {
      AppComponent.rzhAlt("info", '已超过红包设置的总面额');
    } else if (Number(this.sumOfAmountArray) < Number(this.totalAmount)) {
      AppComponent.rzhAlt("info", '未达到红包设置的总面额');
    } else {
      this.formatSelDate()//获取红包设置的时间
      this.effectiveTimeStr = this.setDate + ' ' + this.setTime;//红包生效的时间
      this.refactorData()//重构数据
      let url = '/rpSetting/addRpSettingBatch';
      let json = {
        rpSettingStrVOList: this.moduleListCopy
      };
      let data = {
        rpSettingBatchStr: JSON.stringify(json)
      };
      this.service.addRedPackRules(url, data);
      this.location.back();
    }
  }
}
