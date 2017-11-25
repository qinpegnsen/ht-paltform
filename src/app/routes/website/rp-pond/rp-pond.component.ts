import { Component, OnInit } from '@angular/core';
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
defineLocale('cn', zhCn);

@Component({
  selector: 'app-rp-pond',
  templateUrl: './rp-pond.component.html',
  styleUrls: ['./rp-pond.component.scss']
})
export class RpPondComponent implements OnInit {

  public balance:string;                      //奖池的余额
  public income:string;                       //奖池的历史总额
  public redPackData:any                      //红包投放记录的数据
  public optionScale:any;                       //红包占比的统计图数据
  public optionClick:any;                       //红包点击率的统计图数据
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
  public legendData: any;                      //图例数据
  public legendDataClick: any;                 //企业点击图例数据
  public seriesData: any;                      //系列数据
  public seriesDataClick: any;                 //企业点击系列数据

  constructor(private submit: SubmitService,
              private tools: RzhtoolsService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
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
    this.loadRpAccount();
    this.qeuryPushOrder(1);
    this.qeuryScale();
    this.qeuryClick();
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
   * 获取红包奖池的信息
   */
  loadRpAccount() {
    let url = "/rpAccount/loadRpAccount";
    let data = {};
    let result = this.submit.getData(url, data);
    this.balance=result.balance;
    this.income=result.income;
  }

  /**
   * 红包投放记录
   */
  qeuryPushOrder(curPage,event?: PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let url = "/rpAccountRec/queryRpAccountRecAdmin";
    let data={
      curPage: activePage,
      pageSize:10,
    };
    let result = this.submit.getData(url, data);
    me.redPackData = new Page(result);
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
    if(result){
      this.redPackStaticScale = result;
      this.legendData=this.redPackStaticScale.names;
      this.seriesData=this.redPackStaticScale.voList;
      this.graphInfo();
    }
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
    if(result){
      this.redPackStaticClick = result;
      this.legendDataClick=this.redPackStaticClick.names;
      this.seriesDataClick=this.redPackStaticClick.voList;
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
   * 绘制图表
   */
  public graphInfo() {
    let _this = this;
    _this.optionScale = {
      title : {
        text: '企业红包投资占比饼状图',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: _this.legendData
      },
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:_this.seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]

      //
      // title : {
      //   text: '某站点用户访问来源',
      //   subtext: '纯属虚构',
      //   x:'center'
      // },
      // tooltip : {
      //   trigger: 'item',
      //   formatter: "{a} <br/>{b} : {c} ({d}%)"
      // },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left',
      //   data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      // },
      // series : [
      //   {
      //     name: '访问来源',
      //     type: 'pie',
      //     radius : '55%',
      //     center: ['50%', '60%'],
      //     data:[
      //       {value:335, name:'直接访问'},
      //       {value:310, name:'邮件营销'},
      //       {value:234, name:'联盟广告'},
      //       {value:135, name:'视频广告'},
      //       {value:1548, name:'搜索引擎'}
      //     ],
      //     itemStyle: {
      //       emphasis: {
      //         shadowBlur: 10,
      //         shadowOffsetX: 0,
      //         shadowColor: 'rgba(0, 0, 0, 0.5)'
      //       }
      //     }
      //   }
      // ]


    };

    _this.optionClick = {
      title : {
        text: '红包企业点击数占比饼状图',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: _this.legendData
      },
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:_this.seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]

      //
      // title : {
      //   text: '某站点用户访问来源',
      //   subtext: '纯属虚构',
      //   x:'center'
      // },
      // tooltip : {
      //   trigger: 'item',
      //   formatter: "{a} <br/>{b} : {c} ({d}%)"
      // },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left',
      //   data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      // },
      // series : [
      //   {
      //     name: '访问来源',
      //     type: 'pie',
      //     radius : '55%',
      //     center: ['50%', '60%'],
      //     data:[
      //       {value:335, name:'直接访问'},
      //       {value:310, name:'邮件营销'},
      //       {value:234, name:'联盟广告'},
      //       {value:135, name:'视频广告'},
      //       {value:1548, name:'搜索引擎'}
      //     ],
      //     itemStyle: {
      //       emphasis: {
      //         shadowBlur: 10,
      //         shadowOffsetX: 0,
      //         shadowColor: 'rgba(0, 0, 0, 0.5)'
      //       }
      //     }
      //   }
      // ]


    };


  }

}
