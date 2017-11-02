import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {MaskService} from "../../../core/services/mask.service";
import {AfterService} from "../after.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-refund-details',
  templateUrl: './after-details.component.html',
  styleUrls: ['./after-details.component.scss']
})
export class AfterDetailsComponent implements OnInit {

  private type: string;             //类型,处理/查看详情
  private parentPath: string;             //类型,处理/查看详情
  private afterNo: string;          //售后编码
  private LogisticsData: any;       //退货物流信息
  private afterData: any;           //售后详情数据
  private afterTailList: any;       //查看售后单跟踪信息
  private opinion: string;          //审核意见
  private goodsAudits: any;         //商品审核是否通过枚举
  private isPass: string = 'Y';     //是否同意退货
  private isAgree: string = 'Y';    //是否同意退货
  public expressData: any;          //获取快递的公司和单号


  constructor(private router: Router,
              private submit: SubmitService,
              private after: AfterService,
              private tools: RzhtoolsService) {
  }

  ngOnInit() {
    let me = this;
    me.type = me.submit.getParams('type');
    me.afterNo = me.submit.getParams('afterNo');
    me.parentPath = me.submit.getParams('parentPath');
    me.LogisticsData = this.after.getOrderLogisticsData(me.afterNo);

    me.goodsAudits = this.tools.getEnumDataList('1001');  // 商品审核是否通过
    let data;
    if (!isNullOrUndefined(me.afterNo)) data = {afterNo: me.afterNo};
    me.afterData = this.after.loadReqByAfterNo(data);
    me.afterTailList = this.after.loadAfterTailList(data);
    if (isNullOrUndefined(me.afterData)) me.afterData = null;
  }

  /**
   * 审核退款申请
   */
  auditRefund() {
    let me = this;
    MaskService.showMask();//显示遮罩层
    let data = {
      afterNo: me.afterData.afterNo,
      opinion: me.opinion,
      isAgree: me.isAgree
    }
    me.submit.postRequest('/after/agreeRefundMoney', data, true);
  }

  /**
   * 审核退货申请
   */
  auditReturn() {
    let me = this;
    MaskService.showMask();//显示遮罩层
    let data = {
      afterNo: me.afterData.afterNo,
      opinion: me.opinion,
      isAgree: me.isAgree
    }
    me.submit.postRequest('/after/dealReturnGoods', data, true);
  }

  /**
   * 审核退货商品
   */
  auditReturnGoods() {
    let me = this;
    MaskService.showMask();//显示遮罩层
    let data = {
      afterNo: me.afterData.afterNo,
      opinion: me.opinion,
      isPass: me.isPass
    }
    me.submit.postRequest('/after/checkRefundGoods', data, true);
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
    this.router.navigate(['/main/sale/'+this.parentPath], { replaceUrl: true ,preserveQueryParams: true });
  }

}
