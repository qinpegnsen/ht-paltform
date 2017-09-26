import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {isNullOrUndefined} from "util";
import {AppComponent} from "../../../../app.component";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {SettingsService} from "../../../../core/settings/settings.service";

@Component({
  selector: 'app-analyze-users',
  templateUrl: './analyze-users.component.html',
  styleUrls: ['./analyze-users.component.scss']
})
export class AnalyzeUsersComponent implements OnInit {

  public flag: boolean = true;//定义boolean值用来控制内容组件是否显示
  datepickerModel: Date;
  bsConfig: Partial<BsDatepickerConfig>;
  yearInfo: Array<string> = SettingsService.yearInfo; //获取年份信息
  month: Array<string> = SettingsService.month; //获取月份信息
  select: any = {}; //选择的年份和月份信息
  showType: any = {DAY: true, WEEK: false, MONTH: false}; //根据不同的状态显示
  weekForMonth: Array<string> = new Array(); //指定年月下的日期

  private queryType: any = 'DAY';//日期选择
  private queryTypes: any;//日期选择
  queryTime: any = new Date();

  private data: any;
  now: string;
  prev: string;
  prevData: any;
  nowData: any;

  /**
   * 图表1
   */
 /* optionPrev = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
        data:[],
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
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data:[]
      }
    ]
  };*/
  optionPrev = {
    color: ['#cfccff'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
  /**
   * 图表2
   */
  optionaNow = {
    color: ['#cfccff'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
        data:[],
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
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: []
      }
    ]
  };

  constructor(private router: Router, private tools: RzhtoolsService, private submit: SubmitService) {
  }

  ngOnInit() {
    let _this = this;
    this.bsConfig = Object.assign({}, {
      showWeekNumbers: true
    });
    /**
     * 路由事件用来监听地址栏的变化
     * 1.当添加代理商出现的时候，代理商列表组件隐藏
     * 2.路由变化的时候，刷新页面
     */
    _this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) { // 当导航成功结束时执行
          console.log(event.url)
          if (event.url.indexOf('linkType') > 0) {
            _this.flag = false;
          } else if (event.url == '/main/users/users-new') {
            _this.flag = true;
            //_this.getAgentList() //刷新内容页面
          }
        }
      });
    _this.queryTypes = this.tools.getEnumDataList('1401');   //时间状态枚举列表
    this.queryTime = RzhtoolsService.getAroundDateByDate(this.queryTime, 0);
    this.queryTime = RzhtoolsService.dataFormat(this.queryTime, 'yyyy-MM-dd');
    this.qeuryAll(this.queryType, this.queryTime);
    // this.now = this.data.queryTime;
    // this.prev = this.data.contrastTime;
    // this.nowData = this.data[this.now];
    // this.prevData = this.data[this.prev];
    // this.option.xAxis[0].data = this.prevData.keys;
    // this.option.series[0].data = this.prevData.values;
    // this.optiona.xAxis[0].data = this.nowData.keys;
    // this.optiona.series[0].data = this.nowData.values;
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
  qeuryAll(queryType: string, queryTime: string) {
    let me = this;
    let url = "/statistical/addedCust";
    let data = {
      queryType: queryType,
      queryTime: queryTime,
    }
    let result = this.submit.getData(url, data);
    me.data = result;
    me.now = me.data.queryTime;
    me.prev = me.data.contrastTime;
    me.nowData = me.data[me.now];
    me.prevData = me.data[me.prev];
    me.optionPrev.xAxis[0].data = me.prevData.keys;
    me.optionPrev.series[0].data = me.prevData.values;

    me.optionaNow.xAxis[0].data = me.nowData.keys;
    me.optionaNow.series[0].data = me.nowData.values;
    console.log("█ result ►►►", me.optionPrev.xAxis[0].data);
    console.log("█ result ►►►", me.optionPrev.series[0].data);
    // console.logoptionPrev
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
    if (type == "DAY") {
      if (!_this.datepickerModel || isNullOrUndefined(_this.datepickerModel)) {
        AppComponent.rzhAlt("error", "请选择日期");
      } else {
        this.qeuryAll(this.queryType,this.queryTime);
        //TODO 业务实现
      }
    } else if (type == "WEEK") {
      if (isNullOrUndefined(_this.select.week) || _this.select.week == "") {
        AppComponent.rzhAlt("error", "请选择指定周");
      }else{
        this.qeuryAll(this.queryType, this.queryTime);
        //TODO 业务实现
      }
    } else if (type == "MONTH") {
      let time = _this.getMonth();
      if (time != null) {
        this.qeuryAll(this.queryType,this.queryTime);
        //TODO 业务实现
      }
    } else {
      AppComponent.rzhAlt("error", "查询异常");
    }
  }

}
