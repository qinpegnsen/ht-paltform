import { Component, OnInit } from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.scss']
})
export class StaticsComponent implements OnInit {

  redPackStatic: any;                   //红包统计
  now: any;
  prev: any;
  optionPrev:any;                       //统计图的配置
  constructor(private submit: SubmitService) { }

  ngOnInit() {
    this.qeuryAll()
  }

  /**
   * 查询
   */
  qeuryAll() {
    let me = this;
    let url = "/statistical/adminIndex";
    let data = {}
    let result = this.submit.getData(url, data);
    if(result){
      this.redPackStatic = result;
      me.now = me.redPackStatic.todaySale;
      me.prev = me.redPackStatic.yesterdaySale;
      this.graphInfo();
    }
  }

  /**
   * 绘制图表
   */
  public graphInfo() {
    let _this = this;
    _this.optionPrev = {
      title: {
        text: '一个月的红包金额',
        left:'center'
      },
      legend: { //图例
        data: ['领取红包金额','发放红包金额'],
        align: 'left',
        left:"center",
        top:"8%",
      },
      color: ['#3398DB', '#42DBB1'],  //图例颜色列表，不设置会有默认的
      tooltip: { //提示框组件
        trigger: 'axis',         // 坐标轴指示器，坐标轴触发有效
        axisPointer: {
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        right:"3%",
        feature: {
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true    //是否包含坐标轴的刻度标签。
      },
      xAxis: [
        {
          type: 'category',   //类目轴，还有'time' 时间轴，'value' 数值轴
          data:  _this.prev.keys,
          axisTick: {//坐标轴刻度相关设置
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
          name: '领取红包金额',
          type: 'bar',
          barWidth: '30%',
          data: _this.prev.yaxis
        },
        {
          name:'发放红包金额',
          type: 'bar',
          barWidth: '30%',
          data: _this.now.yaxis
        }
      ]
    };
  }
}
