import { Component, OnInit } from '@angular/core';
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {SettingsService} from "../../../core/settings/settings.service";
import {Router} from "@angular/router";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {SubmitService} from "../../../core/forms/submit.service";
import {isNullOrUndefined} from "util";
import {AppComponent} from "../../../app.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public flag: boolean = true;//定义boolean值用来控制内容组件是否显示
  datepickerModel: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  yearInfo: Array<string> = SettingsService.yearInfo; //获取年份信息
  month: Array<string> = SettingsService.month; //获取月份信息
  select: any = {}; //选择的年份和月份信息
  showType: any = {DAY: true, WEEK: false, MONTH: false}; //根据不同的状态显示
  weekForMonth: Array<string> = new Array(); //指定年月下的日期

  private queryType: any = 'DAY';//日期选择
  private queryTypes: any;//日期选择
  todaySale: any = new Date();
  yesterdaySale: any = new Date();
  queryTime: any = new Date();
  contrastTime: any = new Date();

  private data: any;
  now: any;
  prev: any;
  nowData: any;


  shopnow:any;
  goodsnow:any;

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
    _this.queryTime = RzhtoolsService.dataFormat(RzhtoolsService.getAroundDateByDate(new Date(this.queryTime), 0), 'yyyy-MM-dd');
    _this.qeuryAll();
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
  qeuryAll() {
    let me = this;
    let url = "/statistical/adminIndex";
    let data = {}
    let result = this.submit.getData(url, data);
    console.log("█ result ►►►",  result);
    me.data = result;
    me.now = me.data.todaySale;
    me.prev = me.data.yesterdaySale;
    me.shopnow=me.data.storeRanking;
    me.goodsnow=me.data.goodsRanking;
    me.optionPrevInfo();
  }

  /**
   * 绘制图表（私有）
   */
  private optionPrevInfo() {
    let _this = this;
    _this.optionPrev = {
      title: {
        text: '销售走势',
        left:"47%"
      },
      legend: {
        data: ['昨天','今天'],
        align: 'left',
        left:"46%",
        top:"8%",
        bottom:"10%"
      },
      color: ['#3398DB', '#42DBB1'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        right:"3%",
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
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
          data:  _this.prev.keys,
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
          name: '昨天',
          type: 'bar',
          barWidth: '30%',
          data: _this.prev.yaxis
        },
        {
          name:'今天',
          type: 'bar',
          barWidth: '30%',
          data: _this.now.yaxis
        }
      ]
    };
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
    };
    if (!_this.queryTime || isNullOrUndefined(_this.queryTime)) {
      AppComponent.rzhAlt("error", "请选择日期");
    } else {
      _this.qeuryAll();
    }
  }
}
