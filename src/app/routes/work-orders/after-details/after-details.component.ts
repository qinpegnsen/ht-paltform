import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {MaskService} from "../../../core/services/mask.service";
import {isNullOrUndefined} from "util";
import {AfterService} from "../../sale/after.service";
import {WoManageComponent} from "../wo-manage/wo-manage.component";

@Component({
  selector: 'app-refund-details',
  templateUrl: './after-details.component.html',
  styleUrls: ['./after-details.component.scss']
})
export class AfterDetailsComponent implements OnInit {

  private afterNo: string;          //售后编码
  private wono: string;             //工单编码
  private LogisticsData: any;       //退货物流信息
  private afterData: any;           //售后详情数据
  private goodsAudits: any;         //商品审核是否通过枚举


  constructor(private router: Router,
              private parentComp: WoManageComponent,
              private submit: SubmitService,
              private after: AfterService,
              private tools: RzhtoolsService) {
  }

  ngOnInit() {
    let me = this;
    me.parentComp.detail = true;
    me.parentComp.detailType = 'wo';
    me.wono = me.submit.getParams('wono');

    me.goodsAudits = this.tools.getEnumDataList('1001');  // 商品审核是否通过
    let data;
    if (!isNullOrUndefined(me.wono)) data = {wono: me.wono};
    me.afterData = this.after.loadReqByWono(data);
    if(isNullOrUndefined(me.afterData)) me.afterData = null;
    me.afterNo = me.afterData.afterNo;
    me.LogisticsData = this.after.getOrderLogisticsData(me.afterNo);
    console.log("█ me.LogisticsData ►►►",  me.LogisticsData);

  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 15) + 'px';
    target.style.left = (event.clientX + 20) + 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

}
