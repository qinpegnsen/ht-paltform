import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {zhCn} from "ngx-bootstrap/locale";
import {defineLocale} from "ngx-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {
  // private myForm: FormGroup;
  // public orderType: number = 1;
  // minDate: Date = new Date();
  // maxDate: Date = new Date();

  datepickerModel: Date;
  daterangepickerModel: Date[];
  constructor(private formBuilder: FormBuilder) {

    // this.myForm = this.formBuilder.group({}, {
    //   locale: 'cn',
    //   date: null,
    //   range: null,
    //   // minDate: this.minDate.getDate() - 1,
    //   // maxDate: this.maxDate.getDate() + 7,
    //   containerClass: 'theme-blue'
    // });

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
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
  optiona = {
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

  ngOnInit() {
  }

}
