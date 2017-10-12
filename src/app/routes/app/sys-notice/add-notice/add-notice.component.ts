import {Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../../core/settings/settings.service";
import {SysNoticeComponent} from "../sys-notice.component";
import {OperationService} from "../../../operation/operation.service";
import {PatternService} from "../../../../core/forms/pattern.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
defineLocale('cn', zhCn);
@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.scss']
})
export class AddNoticeComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  myTime: Date = new Date();                     //待日期的时分秒
  private time;                                  //不带日期的时分秒
  date: any = new Date();                        //插件选择的日期
  minDate: any = new Date();                     //插件选择的日期下限
  myDate: any = new Date();                      //转换过后的日期

  constructor(
    public settings: SettingsService,
    public parent:SysNoticeComponent,
    private operationService: OperationService,
    public patterns: PatternService,
  ) {
    this.settings.showRightPage("30%");
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      dateInputFormat: 'YYYY-MM-DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  /**
   * 1.获取参数的类型
   * 2.对按钮进行赋值
   */
  ngOnInit() { }

  /**
   * 时分秒1位数转换为2位数
   */
  addZero(num) {
    return num > 10 ? num + '' : '0' + num;
  }

  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  // 提交
  submit(obj){
    this.myDate = RzhtoolsService.dataFormat(new Date(this.date), "yyyy-MM-dd");//获取日历选中时间
    let hour = this.myTime.getHours();

    let minutes = this.myTime.getMinutes();
    let seconds = this.myTime.getSeconds();

    this.time = this.addZero(hour) + ':' + this.addZero(minutes) + ':' + this.addZero(seconds);
    let url='/announce/addAnnounce';
    let data={
      title:obj.title,
      content:obj.content,
      url:obj.url,
      endTime:this.myDate+" "+this.time
    }
    let result=this.operationService.addNewArticle(url,data);
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
    this.parent.queryNoticeList();
  }
}
