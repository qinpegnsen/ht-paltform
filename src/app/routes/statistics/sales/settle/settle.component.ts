import {Component, OnInit} from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {SettingsService} from "../../../../core/settings/settings.service";
import {AppComponent} from "../../../../app.component";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-settle',
  templateUrl: './settle.component.html',
  styleUrls: ['./settle.component.scss']
})
export class SettleComponent implements OnInit {

  public flag: boolean = true;//定义boolean值用来控制内容组件是否显示
  select: any = {}; //选择的年份和月份信息
  weekForMonth: Array<string> = new Array(); //指定年月下的日期
  queryTimeBegin: any = new Date();
  queryTimeEnd: any = new Date();

  public data: any;
  nowData: any;
  dates: any;
  public bsConfig: Partial<BsDatepickerConfig>;

  constructor(public submit: SubmitService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY-MM-DD'
    });
  }

  ngOnInit() {
    let _this = this;
    _this.queryTimeBegin = RzhtoolsService.dataFormat(RzhtoolsService.getAroundDateByDate(new Date(this.queryTimeBegin), 0), 'yyyy-MM-dd');
    _this.queryTimeEnd = RzhtoolsService.dataFormat(RzhtoolsService.getAroundDateByDate(new Date(this.queryTimeEnd), 1), 'yyyy-MM-dd');
    _this.qeuryAll();
  }

  /**
   * 查询
   */
  qeuryAll() {
    let me = this;
    let url = "/statistical/sumSettle";
    let data = {
      queryTimeBegin: me.queryTimeBegin,
      queryTimeEnd: me.queryTimeEnd,
    }
    let result = this.submit.getData(url, data);
    me.data = result;
    me.nowData = me.data;
  }

  /**
   * 查询对应的数据信息（结算统计）
   * @param type 查询状态，如：日、周、月（DAY、WEEK、MONTH）
   */
  selectInfos() {
    let _this = this;
    _this.queryTimeBegin = RzhtoolsService.dataFormat(new Date(this.dates[0]), "yyyy-MM-dd");
    _this.queryTimeEnd = RzhtoolsService.dataFormat(new Date(this.dates[1]), "yyyy-MM-dd");
    if (!_this.queryTimeBegin || isNullOrUndefined(_this.queryTimeBegin) || !_this.queryTimeEnd || isNullOrUndefined(_this.queryTimeEnd)) {
      AppComponent.rzhAlt("error", "请选择日期");
    } else {
      _this.qeuryAll();
    }
  };
}
