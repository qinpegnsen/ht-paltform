import {Component, OnInit} from "@angular/core";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {PageEvent} from "angular2-datatable";
import {isUndefined} from "util";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {defineLocale} from "ngx-bootstrap/bs-moment";
import {zhCn} from "ngx-bootstrap/locale";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
defineLocale('cn', zhCn);

@Component({
  selector: 'app-settle',
  templateUrl: './settle.component.html',
  styleUrls: ['./settle.component.scss']
})
export class SettleComponent implements OnInit {
  public deposits: Page = new Page();
  public bsConfig: Partial<BsDatepickerConfig>;
  private query = {
    settleObj: '',
    ordno: '',
    time: null
  };
  private detail = [];
  constructor(private submitService: SubmitService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY-MM-DD'
    });
  }
  time(){
    console.log("█ this.query.time ►►►",  RzhtoolsService.dataFormat(new Date(this.query.time[0]), "yyyy-MM-dd"));
    console.log("█ this.query.time ►►►",  RzhtoolsService.dataFormat(new Date(this.query.time[1]), "yyyy-MM-dd"));
  }

  ngOnInit() {
    let me = this;
    me.queryDatas(1);// 获取品牌数据
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 20) + 'px';
    target.style.left = (event.clientX + 30) + 'px';
  }

  /**
   * 隐藏大图
   * @param event
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }
  /**
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(index) {
    if (this.detail[index]) this.detail[index] = false;
    else this.detail[index] = true;
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(curPage, event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let requestUrl = '/finaceDraw/query';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      drawState: 'DONE'
    };
    _this.deposits = new Page(_this.submitService.getData(requestUrl, requestData));
    this.detail = []
  }


}
