import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {WebstiteService} from "../webstite.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {listLocales} from "ngx-bootstrap/bs-moment";
import {AppComponent} from "../../../app.component";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {number} from "ng2-validation/dist/number";
import {PatternService} from "../../../core/forms/pattern.service";
import {isNullOrUndefined} from "util";
import {SiteComponent} from "../site/site.component";
import {Router} from "@angular/router";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {defineLocale} from "ngx-bootstrap";
import {zhCn} from "ngx-bootstrap/locale";
defineLocale('cn', zhCn);
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
  public addTemplate;                         //增加已生效的红包为模板
  public datepickerModel: any;                 //红包的日期
  public setDate: string;                     //经过转换过后设置的日期
  public setTime: string = '00:00:00';        //默认的时分秒
  public effectiveTimeStr: string;            //转换过后组合好的时间
  public minDate: Date = new Date();          //默认最小的日期
  public totalNum: string = '';               //红包的总数
  public siteNum: string = '';                //已经设置的红包总数
  public NoSiteNum: string = '';              //未经设置的红包总数
  public totalAmount: string = '';            //红包的总额
  public siteAmount: string = '';              //已经设置的红包总额
  public noUseAmount: string = '';            //未使用的红包总额
  public sumOfNumArray: string;               //红包数量累计的总数
  public sumOfAmountArray: string = '0';          //红包面额累计的总数
  public redPackData: any;                       //是否显示未生效的红包数据
  bsConfig: Partial<BsDatepickerConfig>;
  locale: 'cn';
  locales = listLocales();

  constructor(public location: Location,
              public patternService: PatternService,
              public router: Router,
              private submit: SubmitService,
              public service: WebstiteService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      dateInputFormat: 'YYYY-MM-DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY-MM-DD'
    });
  }

  ngOnInit() {
    this.datepickerModel = this.minDate = RzhtoolsService.getAroundDateByDate(new Date(), +1);
    this.formatSelDate();
    this.getSettingNum();
    this.qeuryNoUse('N');
    this.loadRpAccount();
    this.deletebutton = {
      type: "delete",
      title: '删除红包规则',
    };
    this.addTemplate = {
      title: "导入已生效规则",
      text: "导入已生效规则",
      type: "add-thc",
    };
  }

  /**
   * 添加生效的规则作为模板
   */
  addUsedTem() {
    let _this = this;
    swal({
        title: '新增模板会覆盖已设置好的数据，是否还要继续？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        _this.qeuryNoUse('Y');
      });
  }

  /**
   * 获取红包奖池的余额信息
   */
  loadRpAccount() {
    let url = "/rpAccount/loadRpAccount";
    let data = {};
    let result = this.submit.getData(url, data);
    this.totalAmount=result.balance;
    this.noUseAmount=this.totalAmount;
  }

  /**
   * 是否导入未生效规则列表
   */
  qeuryNoUse(isUsed) {
    let url = "/rpSetting/queryRpSettingAdmin";
    let data = {
      curPage: 1,
      isUsed: isUsed,
    };
    let result = this.submit.getData(url, data);
    if (result.voList.length > 0) {//如果未生效的存在就导入作为模板
      this.moduleList = this.reSiteTem(result.voList);
      console.log("█ this.moduleList  ►►►",  this.moduleList );
      setTimeout(() => {
        this.changeNumber();//获取红包的概率
        this.isTip();
      }, 0)
    }
  }

  /**
   * 提示总数量和总金额是否超过后台返回的
   */
  isTip() {
    if (this.getRedPacketNum() > this.totalNum) {
      AppComponent.rzhAlt("info", '已超过红包设置的总数量,请进行适当修改');
    }
    ;
    if (this.getRedPacketAmount() > this.totalAmount) {
      AppComponent.rzhAlt("info", '已超过红包设置的总金额,请进行适当修改');
    }
    ;
  }

  /**
   * 重新设置模板的数据，否则报非法字符
   */
  reSiteTem(data){
    let reSiteTemArr=[];
    for(let i=0;i<data.length;i++){
      let obj={
        amount:'',
        level:'',
        num:'',
        probability:'',
      };
      obj.amount=data[i].amount;
      obj.level=data[i].level;
      obj.num=data[i].num;
      obj.probability='1';//随便写的，只要为true就可以，之后重组数据，会删掉，这个这个概率之后也会重新计算
      reSiteTemArr.push(obj);
    }
    return reSiteTemArr;
  }

  /**
   * 获取后台设置的红包的最小的数量
   */
  getSettingNum() {
    let url = '/rpSetting/countRpSettingNum';
    let data = {};
    this.totalNum = this.settingNumber = this.service.getSettingNum(url, data);
    this.NoSiteNum=this.totalNum;
  }

  /**
   * 当红包数量再次改变的时候该表已经添加的红包规则的概率
   */
  changeNumber() {
    let probabilityArray = $("tr");
    for (var i = 0; i < probabilityArray.length; i++) {
      let value = Number((Number($(probabilityArray[i]).find(".redPacketNumber").val()) / Number(this.totalNum)) * 100).toFixed(2) + '%';
      $(probabilityArray[i]).find(".probability").text(value)
    }
    ;
  }

  /**
   * 根据数量生成概率
   * @param item
   * @param obj
   */
  getProbability(item, obj) {
    let probability = +(((+item.num) / (+this.totalNum)) * 100).toFixed(2) + "%";
    $(obj).parents('tr').find('.probability').text(probability);//根据数量，自动生成概率
    this.siteNum = this.getRedPacketNum();
    this.NoSiteNum = Number(this.totalNum) - Number(this.siteNum) + '';
    this.siteAmount = this.getRedPacketAmount();
    this.noUseAmount = Number(this.totalAmount) - Number(this.siteAmount) + '';
    this.isTip();
  }


  /**
   * 添加红包规则
   */
  add() {
    /**
     * 判断总的数量是否超过设定的红包数量
     */
    setTimeout(() => {
      this.getRedPacketNum()//获取添加规则前红包的累计数量
      /**
       * 进行判断是否追加，如果添加规则前已经超出总数量和总面额就不能添加
       */
      if (Number(this.sumOfNumArray) > Number(this.totalNum)) {//超出的话禁止追加
        AppComponent.rzhAlt("info", '已超过红包设置的总数量');
      } else if (Number(this.sumOfNumArray) == Number(this.totalNum)) {//等于的话禁止追加
        AppComponent.rzhAlt("info", '红包总数量以分配完');
      } else if (Number(this.sumOfAmountArray) > Number(this.totalAmount)) {//超出的话禁止追加
        AppComponent.rzhAlt("info", '已超过红包设置的总金额');
      } else if (Number(this.sumOfAmountArray) == Number(this.totalNum)) {//等于的话禁止追加
        AppComponent.rzhAlt("info", '红包总金额以分配完');
      } else {//如果红包的数量没有超出继续追加
        let amountV = $('tbody').find('.amount:last').val();
        if (isNullOrUndefined(amountV)) {
          amountV = 1;
        } else {
          ++amountV;
        }
        this.moduleList.push({
          amount: amountV,
          num: '1',
          level: '1',
          probability: Number((1 / Number(this.totalNum)) * 100).toFixed(2) + '%',
        });
        setTimeout(() => {//等页面渲染完毕之后再去加载
          this.siteAmount = this.getRedPacketAmount()//获取添加规则后红包累计的面额，因为面额不做限制，只是展示使用
          this.noUseAmount = Number(this.totalAmount) - Number(this.siteAmount) + '';
          this.siteNum = this.getRedPacketNum()//获取添加规则后红包累计的面额，因为面额不做限制，只是展示使用
          this.NoSiteNum = Number(this.totalNum) - Number(this.siteNum) + '';
        })
      }
    }, 0)
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
    return this.sumOfNumArray;
  }

  /**
   * 面额改变的时候再次统计现在的总面额
   */
  countAmount(value, obj) {
    $(obj).addClass('selected');
    let amounV = $("tbody").find('.amount:not(.selected)');//找到除了当前以外的其他的对象
    for (let i = 0; i < amounV.length; i++) {
      if ($(amounV[i]).val() == value) {
        AppComponent.rzhAlt("info", '红包的面额不能相同');
        $(".addMask").addClass('myMask');//增加遮罩，这时候禁止点击新增规则按钮
        $(".mySubmit").attr('disabled', 'true');//禁止提交
        $(".mySubmit").prop('disabled', 'true');//禁止提交
        return;
      }
    }
    $(".addMask").removeClass('myMask');//放开按钮
    $(obj).removeClass('selected');
    $(".mySubmit").removeAttr('disabled');//可以提交
    $(".mySubmit").removeProp('disabled');//可以提交
    this.siteAmount = this.getRedPacketAmount();
    this.noUseAmount = Number(this.totalAmount) - Number(this.siteAmount) + '';
    this.siteNum = this.getRedPacketNum();
    this.NoSiteNum = Number(this.totalNum) - Number(this.siteNum) + '';
    this.isTip();
  }

  /**
   * 获取红包的累计的面额
   */
  getRedPacketAmount() {
    let amountArray = $("tbody tr");
    let newAmountArray = [];//新的数组，用老保存所有红包的面额
    for (var i = 0; i < amountArray.length; i++) {
      newAmountArray.push($(amountArray[i]).find('.amount').val() * $(amountArray[i]).find('.redPacketNumber').val())
    }
    ;
    this.sumOfAmountArray = newAmountArray.reduce(this.sum, 0);
    return this.sumOfAmountArray;
  }

  /**
   * 删除当前的红包规则
   * @param event
   */
  delete(i) {
    let _this = this;
    swal({
        title: '确认删除此条红包的数据？',
        type: 'info',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal.close(); //关闭弹框
        _this.moduleList.splice(i, 1);
        setTimeout(()=>{
          _this.isTip();
        },0)
      });
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
      let result = this.service.addRedPackRules(url, data);
      if (result == '账户余额不足') {
        return;
      }
      this.router.navigate(['/main/website/redPacket/site']);
    }
  }
}
