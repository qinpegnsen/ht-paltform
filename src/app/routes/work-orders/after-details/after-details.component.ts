import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {isNullOrUndefined} from "util";
import {Location} from "@angular/common";
import {AfterService} from "../../sale/after.service";

@Component({
  selector: 'app-refund-details',
  templateUrl: './after-details.component.html',
  styleUrls: ['./after-details.component.scss']
})
export class AfterDetailsComponent implements OnInit {

  public detailType:string;         //详情类型
  public afterNo: string;          //售后编码
  public wono: string;             //工单编码
  public LogisticsData: any;       //退货物流信息
  public afterData: any;           //售后详情数据
  public goodsAudits: any;         //商品审核是否通过枚举
  public afterTailList: any;       //查看售后单跟踪信息


  constructor(public router: Router,
              public submit: SubmitService,
              public location: Location,
              public after: AfterService,
              public tools: RzhtoolsService) {
  }

  ngOnInit() {
    let me = this;
    me.detailType = 'after';
    me.wono = me.submit.getParams('wono');
    me.goodsAudits = this.tools.getEnumDataList('1001');  // 商品审核是否通过
    let data;
    if (!isNullOrUndefined(me.wono)) data = {wono: me.wono};
    me.afterData = this.after.loadReqByWono(data);
    if(isNullOrUndefined(me.afterData)) me.afterData = null;
    me.afterNo = me.afterData.afterNo;
    me.LogisticsData = this.after.getOrderLogisticsData(me.afterNo);
    me.afterTailList = this.after.loadAfterTailList({afterNo: me.afterNo});
    if (isNullOrUndefined(me.afterData)) me.afterData = null;

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

  back(){
    this.location.back();
  }

}
