import {Component, OnInit} from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {isNullOrUndefined, isUndefined} from "util";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {SettingsService} from "../../../core/settings/settings.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {AppComponent} from "../../../app.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {zhCn} from "ngx-bootstrap/locale";
import {defineLocale} from "ngx-bootstrap";
import {ng2WalkerFactoryUtils} from "codelyzer/angular/ng2WalkerFactoryUtils";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-rp-pond',
  templateUrl: './rp-pond.component.html',
  styleUrls: ['./rp-pond.component.scss']
})
export class RpPondComponent implements OnInit {

  public balance: string;                      //奖池的余额
  public income: string;                       //奖池的历史总额
  public redPackData: any;                      //红包投放记录的数据
  public optionScale: any;                       //红包占比的统计图数据
  public optionClick: any;                       //红包点击率的统计图数据
  public showType: any = {DAY: true, WEEK: false, MONTH: false}; //根据不同的统计时间的类型显示
  public select: any = {}; //选择的年份和月份信息
  public yearInfo: Array<string> = SettingsService.yearInfo; //获取年份信息
  public month: Array<string> = SettingsService.month; //获取月份信息
  public weekForMonth: Array<string> = new Array(); //指定年月下的日期
  public queryTime: any = new Date();
  public queryType: any = 'DAY';               //统计时间的类型，默认是按天统计
  public datepickerModel: Date = new Date();
  public bsConfig: Partial<BsDatepickerConfig>;
  public queryTypes: any;                      //统计时间的类型
  public redPackStaticScale: any;              //企业占比统计
  public redPackStaticClick: any;              //企业点击统计
  public storeInvest: any;                      //企业投资
  public legendData: any;                      //企业占比图例数据
  public legendDataClick: any;                 //企业点击图例数据
  public seriesData: any;                      //企业占比系列数据
  public seriesDataClick: any;                 //企业点击系列数据
  public showStroeInvest: boolean = false;     //企业投资的弹窗
  public epSubname:any;                         //企业的简称
  public epCode:any;                          //企业的编码
  public storeCode:any;                       //店铺的编码
  public queryDateTime:any;                   //查询的时间
  public enterpriseList:any=new Array;        //获取正常状态企业列表
  public selectEnterCode:string;              //获取选择的企业的编码
  public subject:string='';                   //获取选择的企业的编码
  public querySubjects:any;                   //获取会计科目的类型列表
  public items:Array<string> = new Array();
  private value:any = {};

  constructor(private submit: SubmitService,
              private tools: RzhtoolsService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      dateInputFormat: 'YYYY-MM-DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    this.storeInvest = {
      title: "企业投资",
      text: "企业投资",
      type: "add-thc"
    };
    this.queryTime = RzhtoolsService.dataFormat(RzhtoolsService.getAroundDateByDate(new Date(this.queryTime), 0), 'yyyy-MM-dd');
    this.queryTypes = this.tools.getEnumDataList('1401');   //时间状态枚举列表
    this.loadRpAccount();
    this.qeuryPushOrder(1);
    this.qeuryScale();
    this.qeuryClick();
    this.getEnterpriseList();//获取正常企业的列表
    this.querySubjects = this.tools.getEnumDataList('3106');   //时间状态枚举列表
  }

  /**
   * 获取选择的企业的信息
   * @param value
   */
  public selected(value:any):void {
    this.selectEnterCode=value.id;
  }

  /**
   * 输入框的值
   * @param value
   */
  public typed(value:any):void {
  }

  /**
   * 删除信息
   * @param value
   */
  public removed(value:any):void {
    this.selectEnterCode='';
  }

  /**
   * 刷新的值
   * @param value
   */
  public refreshValue(value:any):void {
    this.value = value;
  }

  /**
   * 统计时间的类型
   */
  search() {
    let _this = this;
    _this.select.year = new Date().getFullYear();//获取默认年
    _this.select.month ='0'+( new Date().getMonth() + 1);//获取默认月
    _this.getWeekListByMonth();
    if (_this.queryType == "MONTH") _this.showType = {DAY: false, WEEK: false, MONTH: true};
    else if (_this.queryType == "WEEK") _this.showType = {DAY: false, WEEK: true, MONTH: false};
    else if (_this.queryType == "DAY") _this.showType = {DAY: true, WEEK: false, MONTH: false};
  }

  /**
   * 根据指定年月获取周列表
   */
  getWeekListByMonth() {
    let _this = this, time = _this.getMonth();
    if (time != null) _this.weekForMonth = _this.tools.getWeekListByMonth(time.split("-")[0], time.split("-")[1]);
    //获取周列表
    _this.weekForMonth.forEach(ele => {//为了默认显示当前日期所在的周
      let start = new Date(ele.split('~')[0]).getDate();
      let end = new Date(ele.split('~')[1]).getDate();
      let now = new Date().getDate();
      if (now > start && now < end) {
        _this.select.week = ele;
      } else if (now == start || now == end) {
        _this.select.week = ele;//获取默认周
      }else if ((start<now&&now>end)&&(Math.abs(start-end)!=6)) {//两个月的交界处 28  29  3
        _this.select.week = ele;//获取默认周
      }else if(start>now&&now<end&&(Math.abs(start-end)!=6)){//两个月的交界处 28 3 2
        _this.select.week = ele;//获取默认周
      }
    });
  }

  /**
   * 获取红包奖池的信息
   */
  loadRpAccount() {
    let url = "/rpAccount/loadRpAccount";
    let data = {};
    let result = this.submit.getData(url, data);
    if (result) {
      this.balance = result.balance;
      this.income = result.income;
    }
  }

  /**
   * 获取正常企业的列表
   */
  getEnterpriseList(){
    let url = "/enterprise/list";
    let data = {};
    let result = this.submit.getData(url, data);
    if (result) {
      for(let i=0;i<result.length;i++){
        let obj;
        obj={
          id:result[i].epCode,
          text:result[i].epName
        };
        this.enterpriseList.push(obj);
      };
      this.items=this.enterpriseList
    }
  }

  /**
   * 奖池流水记录
   */
  qeuryPushOrder(curPage, event?: PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    ;
    //格式化时间格式
    let dateStr = '';
    if (this.queryDateTime) {
      dateStr = RzhtoolsService.dataFormat(this.queryDateTime[0], 'yyyy/MM/dd') + '-' + RzhtoolsService.dataFormat(this.queryDateTime[1], 'yyyy/MM/dd');
    }
    let url = "/rpAccountRec/queryRpAccountRecAdmin";
    let data = {
      curPage: activePage,
      pageSize: 25,
      epCode: this.selectEnterCode,
      epSubname: this.epSubname,
      storeCode: this.storeCode,
      dateStr:dateStr,
      subject:this.subject,
    };
    let result = this.submit.getData(url, data);
    me.redPackData = new Page(result);
  }

  /**
   * 清空时间
   */
  clearTime(){
    this.queryDateTime = null;
    this.qeuryPushOrder(1);// 获取数据
  }

  /**
   * 查询统计红包企业投资占比
   */
  qeuryScale() {
    let me = this;
    let url = "/rpStatistics/queryRpAccountRecDetails";
    let data = {
      queryType: me.queryType,
      queryTime: me.queryTime,
    }
    let result = this.submit.getData(url, data);
    if (result) {
      this.redPackStaticScale = result;
      this.legendData = this.redPackStaticScale.name;
      this.seriesData = this.redPackStaticScale.value;
      this.graphInfoScale();
    }
  }

  /**
   *展示红包企业的弹窗
   */
  showAlert() {
    this.showStroeInvest = true;
  }

  /**
   * 弹窗企业投资回调函数
   * @param data
   */
  getDeliverOrderData() {
    this.showStroeInvest = false;
    this.qeuryPushOrder(1);
  }

  /**
   * 查询统计红包企业投资占比
   */
  qeuryClick() {
    let me = this;
    let url = "/rpStatistics/queryRpStoreClickDetails";
    let data = {
      queryType: me.queryType,
      queryTime: me.queryTime,
    }
    let result = this.submit.getData(url, data);
    if (result) {
      this.redPackStaticClick = result;
      this.legendDataClick = this.redPackStaticClick.name;
      this.seriesDataClick = this.redPackStaticClick.value;
      this.graphInfoClick();
    }
  }

  /**
   * 搜索对应的数据信息（新增会员数）
   * @param type 查询状态，如：日、周、月（DAY、WEEK、MONTH）
   */
  selectInfos() {
    let type = this.queryType;
    switch (type) {
      case 'DAY':
        this.queryTime = RzhtoolsService.dataFormat(new Date(this.datepickerModel), "yyyy-MM-dd");
        break;
      case 'MONTH':
        this.queryTime = this.getMonth();
        break;
      case 'WEEK':
        this.queryTime = this.select.week;
        break;
    }
    ;
    if (!this.queryTime || isNullOrUndefined(this.queryTime)) {
      AppComponent.rzhAlt("error", "请选择日期");
    } else {
      this.qeuryScale();
      this.qeuryClick();
    }
  }

  /**
   * 获取年份和月份信息
   */
  getMonth() {
    let _this = this, ret: string = null;
    if (!_this.select || isNullOrUndefined(_this.select.year) || _this.select.year == "") AppComponent.rzhAlt("error", "年份必选");
    else if (isNullOrUndefined(_this.select.month) || _this.select.month == "") AppComponent.rzhAlt("error", "月份必选");
    else ret = _this.select.year + "-" + _this.select.month;
    return ret;
  }

  /**
   * 绘制企业占比图
   */
  public graphInfoScale() {
    let _this = this;
    if (isNullOrUndefined(_this.legendData) || _this.legendData.length == 0) _this.legendData = ["无数据"];
    if (isNullOrUndefined(_this.seriesData) || _this.seriesData.length == 0) _this.seriesData = [{
      name: "无数据",
      value: "0"
    }];
    _this.optionScale = {
      title: {
        text: '企业红包投资占比统计',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: _this.legendData,
        type: 'scroll',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: _this.seriesData,
          // stillShowZeroSum:false,//数据为0的时候也显示饼图
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  /**
   * 绘制企业点击率饼图
   */
  public graphInfoClick() {
    let _this = this;
    if (isNullOrUndefined(_this.legendDataClick) || _this.legendDataClick.length == 0) _this.legendDataClick = ["无数据"];
    if (isNullOrUndefined(_this.seriesDataClick) || _this.seriesDataClick.length == 0) _this.seriesDataClick = [{
      name: "无数据",
      value: "0"
    }];
    _this.optionClick = {
      title: {
        text: '红包企业点击数占比统计',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: _this.legendDataClick,
        type: 'scroll',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: _this.seriesDataClick,
          // stillShowZeroSum:false,//数据为0的时候也显示饼图
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}
