import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Data, NavigationEnd, Router} from "@angular/router";
import {zhCn} from "ngx-bootstrap/locale";
import {defineLocale} from "ngx-bootstrap";
import {SubmitService} from "../../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {SettingsService} from "../../../../core/settings/settings.service";
import {isNullOrUndefined} from "util";
import {AppComponent} from "../../../../app.component";
defineLocale('cn', zhCn);
@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {

  public flag: boolean = true;//定义boolean值用来控制内容组件是否显示
  datepickerModel: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  yearInfo: Array<string> = SettingsService.yearInfo; //获取年份信息
  month: Array<string> = SettingsService.month; //获取月份信息
  weekForMonth: Array<string> = new Array(); //指定年月下的日期
  // info:Date=new Date();
  select: any = {}; //选择的年份和月份信息

  showType: any = {DAY: true, WEEK: false, MONTH: false}; //根据不同的状态显示

  private queryType: any = 'DAY';//日期选择
  contrastTime: any = new Date();
  private queryTypes: any;//日期选择
  queryTime: any = new Date();
   info: any = new Date();

  private data: any;
  now: string;
  prev: string;
  prevData: any;
  nowData: any;

  /**
   * 图表1
   */
  public optionPrev = {};


  constructor(private router: Router, private tools: RzhtoolsService, private submit: SubmitService,private routeInfo:ActivatedRoute) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      dateInputFormat: 'YYYY-MM-DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let _this = this;
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
    _this.queryTime = RzhtoolsService.dataFormat(RzhtoolsService.getAroundDateByDate(new Date(this.queryTime), 0), 'yyyy-MM-dd');
    _this.qeuryAll(_this.queryType, _this.queryTime);
    _this.select.year = new Date().getFullYear();
    _this.select.month = new Date().getMonth()+1;
    _this.weekForMonth = _this.tools.getWeekListByMonth( _this.select.year, _this.select.month,);
    _this.weekForMonth.forEach(ele => {
      let start =  new Date(ele.split('~')[0]).getDate();
      let end =  new Date(ele.split('~')[1]).getDate();
      let now = new Date().getDate();
      if(now > start && now <end){
        _this.select.week = ele;
      }else if(now==start||now==end){
        _this.select.week = ele;
      } ;
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
  qeuryAll(queryType: string, queryTime: any) {
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
    me.optionPrevInfo();

  }

  /**
   * 绘制图表（私有）
   */
  private optionPrevInfo() {
    let _this = this;
    _this.optionPrev = {
      title: {
        text: '新增会员统计',
        left:"47%",
      },
      legend: {
        data: [_this.prev, _this.now],
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
          data: _this.prevData.keys,
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
          name: _this.prev,
          type: 'bar',
          barWidth: '30%',
          data: _this.prevData.yaxis
        },
        {
          name: _this.now,
          type: 'bar',
          barWidth: '30%',
          data: _this.nowData.yaxis
        }
      ]
    };
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

    // if (type == "DAY") {
    //   if (!_this.datepickerModel || isNullOrUndefined(_this.datepickerModel)) {
    //     AppComponent.rzhAlt("error", "请选择日期");
    //   } else {
    //     // console.log("█ type  ►►►", type);
    //     // console.log("█ this.queryTime ►►►", this.queryTime);
    //     _this.qeuryAll(_this.queryType, _this.queryTime);
    //     //TODO 业务实现
    //   }
    // } else if (type == "WEEK") {
    //   if (isNullOrUndefined(_this.select.week) || _this.select.week == "") {
    //     AppComponent.rzhAlt("error", "请选择指定周");
    //   } else {
    //     _this.queryTime = _this.select.week;
    //     _this.qeuryAll(_this.queryType, _this.queryTime);
    //     //TODO 业务实现
    //   }
    // } else if (type == "MONTH") {
    //   let time = _this.getMonth();
    //   if (time != null) {
    //     _this.queryTime = _this.getMonth();
    //     _this.qeuryAll(_this.queryType, _this.queryTime);
    //     //TODO 业务实现
    //   }
    // } else {
    //   AppComponent.rzhAlt("error", "查询异常");
    // }
    if (!_this.queryTime || isNullOrUndefined(_this.queryTime)) {
      AppComponent.rzhAlt("error", "请选择日期");
    } else {
      _this.qeuryAll(_this.queryType, _this.queryTime);
    }
  }
}
