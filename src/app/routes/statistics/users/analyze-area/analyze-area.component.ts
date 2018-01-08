import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {SettingsService} from "../../../../core/settings/settings.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {Router} from "@angular/router";
import {SubmitService} from "../../../../core/forms/submit.service";
import {AppComponent} from "../../../../app.component";
declare var $: any;
@Component({
  selector: 'app-analyze-area',
  templateUrl: './analyze-area.component.html',
  styleUrls: ['./analyze-area.component.scss']
})
export class AnalyzeAreaComponent implements OnInit {


  public flag: boolean = true;//定义boolean值用来控制内容组件是否显示
  datepickerModel: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  yearInfo: Array<string> = SettingsService.yearInfo; //获取年份信息
  month: Array<string> = SettingsService.month; //获取月份信息
  select: any = {}; //选择的年份和月份信息
  showType: any = {DAY: true, WEEK: false, MONTH: false}; //根据不同的状态显示
  weekForMonth: Array<string> = new Array(); //指定年月下的日期

  public queryType: any = 'DAY';//日期选择
  public queryTypes: any;//日期选择
  public queryContent: any = "ORDSUM";//内容选择
  public queryContentText: any = "下单金额(元)";//内容选择
  public queryContents;//内容选择

  queryTime: any = new Date();

  public data: any;
  now: string;
  nowData: any;

  public option = {};

  constructor(public router: Router, public tools: RzhtoolsService, public submit: SubmitService) {
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
    _this.queryTime = RzhtoolsService.dataFormat(RzhtoolsService.getAroundDateByDate(new Date(this.queryTime), 0), 'yyyy-MM-dd')
    _this.qeuryAll();
  }

  public getOption(maxs) {
    let _this = this;
    _this.option = {
      title: {
        text: '下单金额区域分析',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        min: 0,
        max: maxs,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: _this.queryContentText,
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: _this.nowData.areaMap
        },
      ]
    };
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
    _this.select.year = new Date().getFullYear();//获取默认年
    _this.select.month = '0'+(new Date().getMonth() + 1);//获取默认月
    _this.getWeekListByMonth();
    if (_this.queryType == "MONTH") _this.showType = {DAY: false, WEEK: false, MONTH: true};
    else if (_this.queryType == "WEEK") _this.showType = {DAY: false, WEEK: true, MONTH: false};
    else if (_this.queryType == "DAY") _this.showType = {DAY: true, WEEK: false, MONTH: false};
  }

  /**
   * 查询
   */
  qeuryAll(type?: string, obj?) {
    let me = this;
    if (!isNullOrUndefined(type)) me.queryContent = type;
    let url = "/statistical/analyseArea";
    let data = {
      queryType: me.queryType,
      queryTime: me.queryTime,
      queryContent: me.queryContent
    }
    let result = this.submit.getData(url, data);
    me.data = result;
    me.nowData = me.data;
    let maxs;//地图最大值
    if (isNullOrUndefined(me.nowData.resultList) || me.nowData.resultList.length == 0) {
      maxs = 100;
    } else if (!isNullOrUndefined(me.nowData.resultList) && me.nowData.resultList.length > 0) {
      if (me.queryContent == 'ORDSUM') {
        maxs = me.nowData.resultList[0].ordSum;
      } else if (me.queryContent == 'ORDCOUNT') {
        maxs = me.nowData.resultList[0].ordCount;
      } else if (me.queryContent == 'ORDCUSTCOUNT') {
        maxs = me.nowData.resultList[0].custCount;
      }
    }
    me.getOption(maxs);
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
      } else if (now > start || now > end) {//两个月的交界处
        _this.select.week = ele;//获取默认周
      }
    });
  }

  /**
   * 查询对应的数据信息（新增会员数）
   * @param type 查询状态，如：日、周、月（DAY、WEEK、MONTH）
   */
  selectInfos() {
    let _this = this, type = _this.queryType;
    switch (type) {
      case 'DAY':
        _this.queryTime = RzhtoolsService.dataFormat(new Date(this.datepickerModel), "yyyy-MM-dd");
        break;
      case 'MONTH':
        _this.queryTime = _this.getMonth();
        break;
      case 'WEEK':
        _this.queryTime = _this.select.week;
        break;
    }
    ;

    if (!_this.queryTime || isNullOrUndefined(_this.queryTime)) {
      AppComponent.rzhAlt("error", "请选择日期");
    } else {
      _this.qeuryAll();
    }
  }
}
