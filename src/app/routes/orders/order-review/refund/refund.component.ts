import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from "@angular/core";
import {isNullOrUndefined, isUndefined} from "util";
import {Page} from "../../../../core/page/page";
import {SubmitService} from "../../../../core/forms/submit.service";
import {FileUploader} from "ng2-file-upload";
import {GetUidService} from "../../../../core/services/get-uid.service";
import {AppComponent} from "../../../../app.component";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {RefundService} from "./refund.service";
import {ToRefundComponent} from "../to-refund/to-refund.component";
import {PatternService} from "../../../../core/forms/pattern.service";
import {ActivatedRoute} from "@angular/router";
import {OrderReviewService} from "../order-review.service";
declare var $: any;
const swal = require('sweetalert');
@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss'],
  providers: [RefundService]
})
export class RefundComponent implements OnInit {
  public select: any = {}; //选择的年份和月份信息
  public nowTime:any = {};//当前时间（年月日）
  public timeIsValid: boolean = true;
  public goodsList: Page = new Page();
  public ordno: string;//获取区域编码
  public selectBank: any;
  public code: string = '';
  public realPay:any;//退款金额
  @Input('showRefundWindow') showRefundWindow: boolean;
  bsConfig: Partial<BsDatepickerConfig>;
  public showSec: boolean = true;
  datepickerModel: Date = new Date();
  myTime: Date = new Date();
  queryTime: any = new Date;
  public time;
  public uuid;//图片暗码
  public order:number;//订单编号

  /**
   * 图片上传
   * @type {FileUploader}
   * url  图片上传的接口地址
   * itemAlias  文件别名
   * queueLimit 上传文件控制
   */
  public uploader: FileUploader = new FileUploader({
    url: OrderReviewService.fincneUpload,
    itemAlias: "limitFile",
    allowedFileType: ["image"],
    queueLimit: 1
  });

  @Input('curPage') curPage: string;
  @Input('orderId') orderId: string;
  @Input('goodspay') goodspay: string;
  @Output() refundDate = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showRefundWindow']) {
      if (this.showRefundWindow) {
        $('.wrapper > section').css('z-index', 200);
        this.queryRealPay();// 查询退款金额
      }
      else $('.wrapper > section').css('z-index', 114);
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(public submit: SubmitService, public GetUidService: GetUidService, public refundService: RefundService,
              public toRefundComponent: ToRefundComponent, public patterns: PatternService,public routeInfo: ActivatedRoute) {

    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      dateInputFormat: 'YYYY-MM-DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY-MM-DD'
    });
  }

  ngOnInit() {
    let _this = this;
    _this.select.year = new Date().getFullYear();//获取默认年
    _this.select.month = new Date().getMonth()+1;//获取默认月
    _this.select.day = new Date().getDate();//获取默认日
    _this.nowTime= new Date(_this.select.year+"-"+_this.select.month+"-"+_this.select.day);
    _this.seletAllByTypeCode();
    _this.formatSelDate(); //格式化所选日期及时间
  }

  /**
   * 格式化所选日期及时间
   */
  public  formatSelDate() {
    let _this = this;
    _this.queryTime = RzhtoolsService.dataFormat(new Date(_this.datepickerModel), "yyyy-MM-dd");//获取日历选中时间
    _this.time = RzhtoolsService.dataFormat(new Date(_this.myTime), "HH:mm:ss");//获取日历选中时间
  }

  /*
   查询退款金额
   */
  queryRealPay() {
    let _this = this;
    let url = "/agentOrd/loadAgentOrdReturn";
    let data={
      ordno: _this.orderId,
    }
    _this.realPay = _this.submit.getData(url,data);
  }

  /*
   * 添加汇款人信息
   * */
  addRemitCallBack(obj) {
    let _this = this;
    this.formatSelDate();
    let url = "/agentOrd/confirmRefundRemit";
    let data = {
      ordno: _this.orderId,
      payBankCode: _this.code,
      payAcct: obj.payAcct,
      payBacctName: obj.payBacctName,
      voucherUrlUUID: _this.uuid,
      tradeTimeStr: this.queryTime + " " + this.time,
    }
    let result = this.refundService.refundTransfer(url, data);
    if (isNullOrUndefined(result)) {
      this.code = null;
      this.uploader.queue = [];
      this.hideWindow("success");
      this.toRefundComponent.queryDatas(this.curPage)
    } else {
      AppComponent.rzhAlt("error", '数据存在问题');
    }
  }


  /**
   *关闭弹窗
   */
  hideWindow(type?: string) {
    let me=this;
    $('.wrapper > section').css('z-index', 114);
    me.showRefundWindow = false;
    if (isUndefined(type)) type = 'cancel';
    me.refundDate.emit('type')// 向外传值
    me.code = null;
    me.uploader.queue = [];
  }

  /*
   * 选择银行
   * */
  seletAllByTypeCode() {
    let url = '/datadict/queryAllByTypeCode';
    let data = {
      typeCode: 'common_use_bank_name'
    }
    this.selectBank = this.submit.getData(url, data);
  }

  /**
   * 图片上传
   */
  uploadImg(obj) {
    let me = this;
    /**
     * 构建form时，传入自定义参数
     * @param item
     */
    me.uploader.onBuildItemForm = function (fileItem: any, form: any) {
      me.uuid = me.GetUidService.getUid();
      form.append('uuid', me.uuid);
    };

    /**
     * 执行上传
     */
    me.uploader.uploadAll();
    /**
     * 上传成功处理
     * @param item 上传列表
     * @param response 返回信息
     * @param status 状态
     * @param headers 头信息
     */
    me.uploader.onSuccessItem = function (item, response, status, headers) {
      me.addRemitCallBack(obj);//图片上传成功添加信息
      let res = JSON.parse(response);
      if (res.success) {
      } else {
        AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
      }
    };
    /**
     * 上传失败处理
     * @param item 上传列表
     * @param response 返回信息
     * @param status 状态
     * @param headers 头信息
     */
    me.uploader.onErrorItem = function (item, response, status, headers) {
      AppComponent.rzhAlt('error', '上传失败', '图片上传失败！');
    };
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event, i) {
    i.style.display = 'block';
    i.style.top = (event.clientY - 140) + 'px';
    i.style.left = (event.clientX - 350) + 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }

  isValid() {
    let _this=this;
    _this.timeIsValid = true;
  }

  changed() {
    let _this=this;
    _this.timeIsValid = false;
  }
}
