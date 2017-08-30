import {Component, OnInit} from "@angular/core";
// import moment = require("../../../../../../node_modules/@types/moment/node_modules/moment/moment");
@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
  // CALENDAR PROPS
  public dt: Date = new Date();
  dateShow: boolean = false; //显示、隐藏日期框
  public minDate: Date = void 0;
  public events: Array<any>;
  private kk:string;

  public formats: Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
  public format: string = this.formats[0];
  opened: boolean = false;
  constructor() {

  }

  option = {
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
        type: 'line',//数据呈折线展现
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };

  ngOnInit() {
  }

  // CALENDAR METHODS
  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public today(): void {
    this.dt = new Date();
  }

  // todo: implement custom class cases
  public getDayClass(date: any, mode: string): string {
    if (mode === 'day') {
      let dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (let i = 0; i < this.events.length; i++) {
        let currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return this.events[i].status;
        }
      }
    }

    return '';
  }

  public disabled(date: Date, mode: string): boolean {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  }

  public open(): void {
    this.opened = !this.opened;
  }




  /**
   * 开启日期选择框
   */
  showDate() {
    let _this = this;
    _this.dateShow = !_this.dateShow;
  }

  /**
   * 日期选择完成
   * @returns {Date|number}
   */
  selDate() {
    let _this = this;
    _this.dateShow = !_this.dateShow;
    return _this.dt && _this.dt.getTime() || new Date().getTime();
  }

}
