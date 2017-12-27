import {Component, OnInit} from "@angular/core";
import {AjaxService} from "../../../../core/services/ajax.service";
import {SubmitService} from "../../../../core/forms/submit.service";
import {Page} from "../../../../core/page/page";
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {listLocales} from "ngx-bootstrap/bs-moment";
import {isUndefined} from "ngx-bootstrap/bs-moment/utils/type-checks";
import {defineLocale} from "ngx-bootstrap";
import {zhCn} from "ngx-bootstrap/locale";
defineLocale('cn', zhCn);
@Component({
  selector: 'app-integration-details',
  templateUrl: './integration-details.component.html',
  styleUrls: ['./integration-details.component.scss']
})
export class IntegrationDetailsComponent implements OnInit {
  public data: Page = new Page();
  public phone:string='';//查询的会员手机
  public authStates:any;    //操作类型枚举
  public authState:string='';//操作类型
  public custTrueName:string='';//操作类型
  public myTime;                      //传查询的时间范围
  locale = 'en';
  locales = listLocales();
  bsConfig: Partial<BsDatepickerConfig>;
  applyLocale(pop: any) {
    this.bsConfig = Object.assign({}, { locale: 'cn' });
    setTimeout(() => {
      pop.hide();
      pop.show();
    });
  }
  constructor(public ajax: AjaxService, public submit: SubmitService,public tools: RzhtoolsService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      rangeInputFormat: 'YYYY/MM/DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue'
    });
  }

  ngOnInit() {
    let _this=this;
    _this.qeuryAllService(1);
    _this.authStates = this.tools.getEnumDataList('1027');   //操作类型枚举列表

  }

  //重消币明细--查询分页
  qeuryAllService(curPage,event?:PageEvent){
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let url = "/custCoin/query";
    let data={
      curPage: activePage,
      pageSize:20,
      phone:me.phone,
      logType:me.authState,
      custTrueName:me.custTrueName,
      createTime:this.myTime?RzhtoolsService.dataFormat(this.myTime[0], 'yyyy/MM/dd') + '-' + RzhtoolsService.dataFormat(this.myTime[1], 'yyyy/MM/dd'):'',
    }
    let result = this.submit.getData(url,data);

    me.data = new Page(result);

  }
}
