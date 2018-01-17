import {Component, OnInit} from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {isUndefined} from "util";
import {Page} from "../../../core/page/page";
import {Router} from "@angular/router";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {SubmitService} from "../../../core/forms/submit.service";
import {listLocales} from "ngx-bootstrap/bs-moment";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-cash-record',
  templateUrl: './cash-record.component.html',
  styleUrls: ['./cash-record.component.scss']
})
export class CashRecordComponent implements OnInit {
  public deposits: Page = new Page();
  public query: any = {};//查询条件
  public myTime;             //传查询的时间范围
  public detail = [];
  public states: any;
  locale = 'en';
  public curMenus=new Array();
  locales = listLocales();
  bsConfig: Partial<BsDatepickerConfig>;
  applyLocale(pop: any) {
    this.bsConfig = Object.assign({}, { locale: 'cn' });
    setTimeout(() => {
      pop.hide();
      pop.show();
    });
  }
  constructor(public router: Router,
              public tools: RzhtoolsService,
              public submitService: SubmitService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let me = this;
    me.queryDatas(1);// 获取品牌数据
    me.states = me.tools.getEnumDataList('1802');
    let curMenus=new Array();
    for(let i=0;i<me.states.length;i++){
      if(me.states[i].key=='DONE'||me.states[i].key=='FAIL'){
        curMenus.push(me.states[i])
      }
      me.curMenus=curMenus
    }

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
    let requestUrl = '/finaceStoreDraw/queryFinaceStoreDrawDone';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      drawState:_this.query.state,
      bacctName:_this.query.bacctName,
      dateStr:this.myTime?RzhtoolsService.dataFormat(this.myTime[0], 'yyyy/MM/dd') + '-' + RzhtoolsService.dataFormat(this.myTime[1], 'yyyy/MM/dd'):'',
    };
    _this.deposits = new Page(_this.submitService.getData(requestUrl, requestData));
    _this.detail = []
  }

  /**
   * 重置查询条件
   */
  resetQuery() {
    this.query = {};
    this.myTime = null;
    this.queryDatas(1);
  }
}
