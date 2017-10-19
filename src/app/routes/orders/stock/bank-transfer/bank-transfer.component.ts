import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
import {FileUploader} from "ng2-file-upload";
import {GetUidService} from "../../../../core/services/get-uid.service";
import {AppComponent} from "../../../../app.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {RzhtoolsService} from "../../../../core/services/rzhtools.service";
import {AwaitingDeliveryComponent} from "../awaiting-delivery/awaiting-delivery.component";
import {BankTransferService} from "./bank-transfer.service";
import {cli} from "webdriver-manager/built/lib/webdriver";
import {Router} from "@angular/router";
import {PendingPaymentComponent} from "../pending-payment/pending-payment.component";
import {PatternService} from "../../../../core/forms/pattern.service";
declare var $: any;
@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.scss'],
  providers: [BankTransferService]
})
export class BankTransferComponent implements OnInit {

  datepickerModel: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;

  public showSec: boolean = true;
  private summary;
  myTime: Date = new Date();
  queryTime: any = new Date;
  private time;
  private uuid;
  public selectBank: any;
  private code;
  public imgs = {
    pic: "",
    summary: ""
  }
  /**
   * 图片上传
   * @type {FileUploader}
   * url  图片上传的接口地址
   * itemAlias  文件别名
   * queueLimit 上传文件控制
   */
  public uploader: FileUploader = new FileUploader({
    url: '/upload/basic/upload',
    itemAlias: "limitFile",
    queueLimit: 1
  });
  @Input('orderId') orderId: string;
  @Input('goodspay') goodspay: string;
  @Input('curPage') curPage: string;
  @Input('showBankWindow') showBankWindow: boolean;
  @Output() bankDate = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showAddWindow']) {
      if (this.showBankWindow) $('.wrapper > section' && '.wrapper > footer ').css('z-index', 100);
      else $('.wrapper > section' && '.wrapper > footer ').css('z-index', 10);
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section' && '.wrapper > footer ').css('z-index', 10);
  }

  constructor(private submit: SubmitService, public GetUidService: GetUidService, private tools: RzhtoolsService,
              private pendingPaymentComponent: PendingPaymentComponent, public router: Router,
              private bankTransferService: BankTransferService,private patterns:PatternService) {
    this.bsConfig = Object.assign({}, {
      locale: 'cn',
      dateInputFormat: 'YYYY-MM-DD',//将时间格式转化成年月日的格式
      containerClass: 'theme-blue',
      rangeInputFormat: 'YYYY-MM-DD'
    });
  }

  ngOnInit() {
    this.formatSelDate(); //格式化所选日期及时间
    this.seletAllByTypeCode();//银行选择
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: string) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showBankWindow = false;
    if (isUndefined(type)) type = 'cancel';
    this.bankDate.emit(type)
  }

  /**
   * 格式化所选日期及时间
   */
  private  formatSelDate() {
    let _this = this;
    _this.queryTime = RzhtoolsService.dataFormat(new Date(_this.datepickerModel), "yyyy-MM-dd");//获取日历选中时间
    _this.time = RzhtoolsService.dataFormat(new Date(_this.myTime), "HH:mm:ss");//获取日历选中时间
  }

  /*
   * 添加付款人信息
   * */
  addRemitCallBack(obj) {
    this.formatSelDate();
    let url = "/agentOrd/addAgentOrdPayRecRemit";
    this.imgs.pic = this.uuid;
    this.imgs.summary = this.summary;
    let data = {
      ordno: this.orderId,
      acct: obj.acct,
      tc3rd: obj.tc3rd,
      bankCode: this.code,
      bacctName: obj.bacctName,
      finacePlatRecPicJson: JSON.stringify(this.imgs),
      tradeTime: this.queryTime + " " + this.time,
      remark: obj.remark
    }
    let result = this.bankTransferService.bankTransfer(url, data);
    if (result.success) {
      this.code = null;
      this.summary=null;
      this.uploader.queue = [];
      this.hideWindow("success");
      this.pendingPaymentComponent.queryDatas(this.curPage)
    } else {
      AppComponent.rzhAlt("error", result.info);
    }
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
      me.addRemitCallBack(obj);
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
   * 时分秒1数转换为2
   */
  addZero(num) {
    return num > 9 ? num + '' : '0' + num;
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event, i) {
    i.style.display = 'block';
    i.style.top = (event.clientY + 15) + 'px';
    i.style.left = (event.clientX + 20) + 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }
}
