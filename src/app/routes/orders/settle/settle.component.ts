import {Component, OnInit} from "@angular/core";
import {Page} from "../../../core/page/page";
import {SubmitService} from "../../../core/forms/submit.service";
import {PageEvent} from "angular2-datatable";
import {isNullOrUndefined, isUndefined} from "util";
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
  public rate:any;     //抽成比例
  public time:any;     //时间
  public toTypes:any; //结算对象类型
  public query = {
    toType: '',
    to_name: '',
    ordno: '',
    startTime: null,
    endTime: null,
    pageSize: 20,
    curPage: 1,
  };
  public detail = [];
  constructor(public submitService: SubmitService, public tools: RzhtoolsService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY-MM-DD'
    });
  }

  ngOnInit() {
    let me = this;
    me.toTypes = this.tools.getEnumDataList('1901');  // 结算对象类型
    me.queryRate();    //查询抽成比例
    me.queryDatas();// 获取数据
  }

  /**
   * 清空时间
   */
  clearDate(){
    this.time = null;
    this.queryDatas();// 获取数据
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryDatas(event?: PageEvent) {
    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    }
    let requestUrl = '/ord/queryPlantSettle';
    if(!isNullOrUndefined(_this.time)){
      _this.query.startTime = RzhtoolsService.dataFormat(new Date(_this.time[0]), "yyyy-MM-dd");
      _this.query.endTime = RzhtoolsService.dataFormat(new Date(_this.time[1]), "yyyy-MM-dd");
    }else{
      _this.query.startTime = null;
      _this.query.endTime = null;
    }
    _this.query.curPage = activePage;
    _this.deposits = new Page(_this.submitService.getData(requestUrl, _this.query));
  }

  /**
   * 查询抽成比例
   */
  queryRate(){
    let _this = this;
    let requestUrl = '/datadict/loadInfoByCode';
    let requestData = {
      code:'settle_order_commision_scale'
    };
    let res = _this.submitService.getData(requestUrl, requestData);
    if(!isNullOrUndefined(res)) _this.rate = res;
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


}
