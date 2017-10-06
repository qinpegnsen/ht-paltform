import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {SettingsService} from "../../../../core/settings/settings.service";
import {isNullOrUndefined} from "util";
import {AppComponent} from "../../../../app.component";

@Component({
  selector: 'app-hot-sale',
  templateUrl: './hot-sale.component.html',
  styleUrls: ['./hot-sale.component.scss']
})
export class HotSaleComponent implements OnInit {

  public flag: boolean = true;//定义boolean值用来控制内容组件是否显示
  datepickerModel: Date= new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  yearInfo: Array<string> = SettingsService.yearInfo; //获取年份信息
  month: Array<string> = SettingsService.month; //获取月份信息
  select: any = {}; //选择的年份和月份信息
  showType: any = {DAY: true, WEEK: false, MONTH: false}; //根据不同的状态显示
  weekForMonth: Array<string> = new Array(); //指定年月下的日期

  private queryType: any = 'DAY';//日期选择
  private queryTypes: any;//日期选择
  private queryContent: any="ORDSUM";//内容选择
  private queryContentText: any="下单金额(元)";//内容选择
  private queryContents;//内容选择

  queryTime: any = new Date();

  private data: any;
  now: string;
  nowData: any;

  /**
   * 图表1
   */
  public optionPrev = {};


  constructor(private router: Router, private tools: RzhtoolsService, private submit: SubmitService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      dateInputFormat: 'YYYY-MM-DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let _this = this;
    _this.queryTypes = this.tools.getEnumDataList('1401');   //时间状态枚举列表
    _this.queryContents = this.tools.getEnumDataList('1402');   //内容状态枚举列表
    _this.queryTime = RzhtoolsService.dataFormat(RzhtoolsService.getAroundDateByDate(new Date(this.queryTime), 0), 'yyyy-MM-dd');
    _this.qeuryAll();
    _this.select.year = new Date().getFullYear();
    _this.select.month = new Date().getMonth()+1;
    _this.weekForMonth = _this.tools.getWeekListByMonth( _this.select.year, _this.select.month);
    _this.weekForMonth.forEach(ele => {
      let start =  new Date(ele.split('~')[0]).getTime();
      let end =  new Date(ele.split('~')[1]).getTime();
      let now = new Date().getTime();
      if(now > start && now < end){
        _this.select.week = ele;
      };
    });
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
   * 选择不同的显示条件
   */
  search() {
    let _this = this;
    if (_this.queryType == "MONTH") _this.showType = {DAY: false, WEEK: false, MONTH: true};
    else if (_this.queryType == "WEEK") _this.showType = {DAY: false, WEEK: true, MONTH: false};
    else if (_this.queryType == "DAY") _this.showType = {DAY: true, WEEK: false, MONTH: false};
  }

  /**
   * 查询
   */
  qeuryAll(type?:string,obj?) {
    let me = this;
    if(!isNullOrUndefined(type)) me.queryContent = type;
    me.queryContentText = me.queryContent=='ORDSUM'?'下单金额(元)':'下单数量';
    let url = "/statistical/hotsGoods";
    let data = {
      queryType: me.queryType,
      queryTime: me.queryTime,
      queryContent: me.queryContent
    }
    let result = this.submit.getData(url, data);
    me.data = result;
    me.nowData =me.data;
    me.optionPrevInfo();
    console.log("█ result ►►►",  result);
  }

  /**
   * 绘制图表（私有）
   */
  private optionPrevInfo(){
    let _this = this;
    _this.optionPrev = {
      title: {
        left:"center",
        text: '买家排行20名'
      },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show : true,
        right:"3%",
        feature : {
          dataView : {show: true, readOnly: false},
          magicType : {show: true, type: ['line', 'bar']},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: _this.nowData.keys,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name:_this.queryContentText ,
          type: 'bar',
          barWidth: '30%',
          data: _this.nowData.yaxis
        }
      ]
    }; //绘制图表
  }

  /**
   * 根据指定年月获取周列表
   */
  getWeekListByMonth() {
    let _this = this, time = _this.getMonth();
    if (time != null) _this.weekForMonth = _this.tools.getWeekListByMonth(time.split("-")[0], time.split("-")[1]); //获取周列表
  }


  /**
   * 查询对应的数据信息（新增会员数）
   * @param type 查询状态，如：日、周、月（DAY、WEEK、MONTH）
   */
  selectInfos() {
    let _this = this, type = _this.queryType;
    switch (type){
      case 'DAY':
        _this.queryTime = RzhtoolsService.dataFormat(new Date(this.datepickerModel), "yyyy-MM-dd");
        break;
      case 'MONTH':
        _this.queryTime = _this.getMonth();
        break;
      case 'WEEK':
        _this.queryTime = _this.select.week;
        break;
    };
    if (!_this.queryTime || isNullOrUndefined(_this.queryTime)) {
      AppComponent.rzhAlt("error", "请选择日期");
    } else {
      _this.qeuryAll();
    }
  }

}
