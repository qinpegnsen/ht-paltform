import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {isNullOrUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
import {StoreService} from "../../store.service";
import {MaskService} from "../../../../core/services/mask.service";
import {PatternService} from "../../../../core/forms/pattern.service";
declare var $: any;

@Component({
  selector: 'app-shop-audit',
  templateUrl: './shop-audit.component.html',
  styleUrls: ['./shop-audit.component.scss']
})
export class ShopAuditComponent implements OnInit {
  public refresh: boolean = false;//是否审核，以此判断父页面是否需要刷新
  public storeCode: string;//店铺编码
  public shopInfo: any;//店铺信息
  public shopAudits: any;//审核结果枚举
  public auditRecords: any;//审核记录
  public audit: any = {};//审核结果
  public patterns: any;//正则
  public minBuildGoldRate: number;//最小抽取建设金的比例
  public maxBuildGoldRate: number;//最大抽取建设金的比例
  public buildGoldRateTip: string;//抽取建设金的比例提示
  public buildGoldRateError: boolean = false;//满足抽取建设金的比例限制
  public minAdRate: number;//最小抽取广告费的比例
  public maxAdRate: number;//最大抽取广告费的比例
  public adRateTip: string;//抽取广告费的比例提示
  public adRateError: boolean = false;//满足抽取广告费的比例限制

  constructor(public location: Location,
              public storeService: StoreService,
              public pattern: PatternService,
              public submitService: SubmitService) {
    this.patterns = this.pattern;
  }

  ngOnInit() {
    let me = this, shopInfo, auditRecords;
    me.storeCode = me.submitService.getParams('storeCode');
    if (me.storeCode) {
      shopInfo = me.storeService.getShopInfo(me.storeCode);
      auditRecords = me.storeService.getShopAuditRecord(me.storeCode);
    }
    if (!isNullOrUndefined(shopInfo)) me.shopInfo = shopInfo;
    if (!isNullOrUndefined(auditRecords)) me.auditRecords = auditRecords;
    me.shopAudits = [{key: 'PASS', val: '通过'}, {key: 'UNPASS', val: '不通过'}];  // 审核是否通过
    me.audit.auditResult = 'UNPASS';//默认不通过
    me.queryRates();//查询抽成比例
  }

  /**
   * 审核通过
   */
  auditPass() {
    let me = this;
    MaskService.showMask();//显示遮罩层
    let data = {
      storeCode: me.storeCode,
      buildGoldRate: me.audit.buildGoldRate,
      adRate: me.audit.adRate
    }
    me.submitService.putRequest('/stores/auditPass', data, true);
    me.refresh = true;
  }

  /**
   * 审核驳回
   */
  auditReject() {
    let me = this;
    MaskService.showMask();//显示遮罩层
    let data = {
      storeCode: me.storeCode,
      opinion: me.audit.opinion
    }
    me.submitService.putRequest('/stores/auditReject', data, true);
    me.refresh = true;
  }


  /**
   * 查询抽成比例
   */
  queryRates() {
    let _this = this, requestUrl = '/datadict/loadInfoByCode';
    let minBuildGoldRate = _this.submitService.getData(requestUrl, {code: 'STORE_ORDER_SETTLE_BG_MIN_RATE'});
    let maxBuildGoldRate = _this.submitService.getData(requestUrl, {code: 'STORE_ORDER_SETTLE_BG_MAX_RATE'});
    let minAdRate = _this.submitService.getData(requestUrl, {code: 'STORE_ORDER_SETTLE_AD_MIN_RATE'});
    let maxAdRate = _this.submitService.getData(requestUrl, {code: 'STORE_ORDER_SETTLE_AD_MAX_RATE'});
    if (!isNullOrUndefined(minBuildGoldRate)) _this.minBuildGoldRate = Number(minBuildGoldRate);//最小抽取建设金的比例
    if (!isNullOrUndefined(maxBuildGoldRate)) _this.maxBuildGoldRate = Number(maxBuildGoldRate);//最大抽取建设金的比例
    if (!isNullOrUndefined(minAdRate)) _this.minAdRate = Number(minAdRate);     //最小抽取广告费的比例
    if (!isNullOrUndefined(maxAdRate)) _this.maxAdRate = Number(maxAdRate);     //最大抽取广告费的比例
    this.buildGoldRateTip = `请输入${_this.minBuildGoldRate}~${_this.maxBuildGoldRate}之间的整数`;
    this.adRateTip = `请输入${_this.minAdRate}~${_this.maxAdRate}之间的整数`;
  }

  /**
   * 监听抽取建设金比例输入
   * @param value
   */
  listenBuildGoldRate(value){
    if(value > this.maxBuildGoldRate || value < this.minBuildGoldRate) this.buildGoldRateError = true;
    else this.buildGoldRateError = false;
  }

  /**
   * 监听抽取广告费比例输入
   * @param value
   */
  listenAdRate(value){
    if(value > this.maxAdRate || value < this.minAdRate) this.adRateError = true;
    else this.adRateError = false;
  }

  back() {
    this.location.back();
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

}

