import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {SettingsService} from "../../../core/settings/settings.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {AppComponent} from "../../../app.component";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.scss']
})
export class StaticsComponent implements OnInit {

  public redPackStatic: any;                   //红包统计
  public queryTime: any = new Date();
  public select: any = {}; //选择的年份和月份信息
  public datepickerModel: Date = new Date();
  public bsConfig: Partial<BsDatepickerConfig>;
  public yearInfo: Array<string> = SettingsService.yearInfo; //获取年份信息
  public month: Array<string> = SettingsService.month; //获取月份信息
  public weekForMonth: Array<string> = new Array(); //指定年月下的日期
  public queryType: any = 'DAY';               //统计时间的类型，默认是按天统计
  public queryTypes: any;                      //统计时间的类型
  public showType: any = {DAY: true, WEEK: false, MONTH: false}; //根据不同的统计时间的类型显示
  public now: any;
  public prev: any;
  public optionPrev:any;                       //统计图的配置
  public locale: 'cn';
  constructor(private submit: SubmitService,
              private tools: RzhtoolsService) {
    this.bsConfig = Object.assign({}, {
      locale: this.locale,
      dateInputFormat: 'YYYY-MM-DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    this.queryTime = RzhtoolsService.dataFormat(RzhtoolsService.getAroundDateByDate(new Date(this.queryTime), 0), 'yyyy-MM-dd');
    this.queryTypes = this.tools.getEnumDataList('1401');   //时间状态枚举列表
    this.select.year = new Date().getFullYear();//获取默认年
    this.select.month = new Date().getMonth() + 1;//获取默认月
    this.weekForMonth = this.tools.getWeekListByMonth(this.select.year, this.select.month,);//获取当前年份当前月份下面周的集合
    this.weekForMonth.forEach(ele => {//为了默认显示当前日期所在的周
      let start = new Date(ele.split('~')[0]).getDate();
      let end = new Date(ele.split('~')[1]).getDate();
      let now = new Date().getDate();
      if (now > start && now < end) {
        this.select.week = ele;
      } else if (now == start || now == end) {
        this.select.week = ele;//获取默认周
      }
    });
    this.qeuryAll();
  }

  /**
   * 统计时间的类型
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
  qeuryAll() {
    let me = this;
    let url = "/rpStatistics/queryRpStatisticsAdmin";
    let data = {
      queryType: me.queryType,
      queryTime: me.queryTime,
    }
    let result = this.submit.getData(url, data);
    if(result){
      this.redPackStatic = result;
      me.now = me.redPackStatic.todaySale;
      me.prev = me.redPackStatic.yesterdaySale;
      this.graphInfo();
    }
  }

  /**
   * 搜索对应的数据信息（新增会员数）
   * @param type 查询状态，如：日、周、月（DAY、WEEK、MONTH）
   */
  selectInfos() {
    let  type = this.queryType;
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
    };
    if (!this.queryTime || isNullOrUndefined(this.queryTime)) {
      AppComponent.rzhAlt("error", "请选择日期");
    } else {
      this.qeuryAll();
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
   * 绘制图表
   */
  public graphInfo() {
    let _this = this;
  //   _this.optionPrev = {
  //     title: {
  //       text: '一个月的红包金额',
  //       left:'center'
  //     },
  //     legend: { //图例
  //       data: ['领取红包金额','发放红包金额'],
  //       align: 'left',
  //       left:"center",
  //       top:"8%",
  //     },
  //     color: ['#3398DB', '#42DBB1'],  //图例颜色列表，不设置会有默认的
  //     tooltip: { //提示框组件
  //       trigger: 'axis',         // 坐标轴指示器，坐标轴触发有效
  //       axisPointer: {
  //         type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
  //       }
  //     },
  //     toolbox: {
  //       show: true,
  //       right:"3%",
  //       feature: {
  //         magicType: {show: true, type: ['line', 'bar']},
  //         restore: {show: true},
  //         saveAsImage: {show: true}
  //       }
  //     },
  //     grid: {
  //       left: '3%',
  //       right: '4%',
  //       bottom: '3%',
  //       containLabel: true    //是否包含坐标轴的刻度标签。
  //     },
  //     xAxis: [
  //       {
  //         type: 'category',   //类目轴，还有'time' 时间轴，'value' 数值轴
  //         data:  _this.prev.keys,
  //         axisTick: {//坐标轴刻度相关设置
  //           alignWithLabel: true
  //         }
  //       }
  //     ],
  //     yAxis: [
  //       {
  //         type: 'value'
  //       }
  //     ],
  //     series: [
  //       {
  //         name: '领取红包金额',
  //         type: 'bar',
  //         barWidth: '30%',
  //         data: _this.prev.yaxis
  //       },
  //       {
  //         name:'发放红包金额',
  //         type: 'bar',
  //         barWidth: '30%',
  //         data: _this.now.yaxis
  //       }
  //     ]
  //   };
  }
}
