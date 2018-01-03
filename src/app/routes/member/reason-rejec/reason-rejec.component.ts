import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {isNullOrUndefined, isUndefined} from "util";
import {CertificationComponent} from "../certification/certification.component";
import {ReasonRejecService} from "./reason-rejec.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
declare var $: any;
@Component({
  selector: 'app-reason-rejec',
  templateUrl: './reason-rejec.component.html',
  styleUrls: ['./reason-rejec.component.scss'],
  providers: [ReasonRejecService]
})
export class ReasonRejecComponent implements OnInit {
  public state: any;//审核状态
  public showRecord: boolean = true;         //默认是通过
  public isAgree: string = 'Y';         //默认是通过
  public yesOrNo: any;         //商品审核是否通过枚举
  @Input('showReasonWindow') showReasonWindow: boolean;
  @Output() upDate = new EventEmitter();
  images: Array<string> = new Array();
  @Input('orderId') orderId: string;
  @Input('curPage') curPage: any;
  @Input('count') count: any = {};

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['showReasonWindow'] && changes['orderId']) {
      let me = this;
      me.images = new Array();
      if (this.showReasonWindow && this.orderId && !isNullOrUndefined(this.orderId)) {
        $('.wrapper > section').css('z-index', 200);
        me.images.push(me.count.idcardPic1, me.count.idcardPic2, me.count.idcardPic3);
      }
      else $('.wrapper > section').css('z-index', 114);
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);

  }

  constructor(public reasonRejecService: ReasonRejecService,
              public submit: SubmitService,
              public tools: RzhtoolsService,
              public certificationComponent: CertificationComponent) {

  }

  ngOnInit() {
    this.yesOrNo = this.tools.getEnumDataList('1001');  // 商品审核是否通过
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: string) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showReasonWindow = false;
    if (isUndefined(type)) type = 'cancel';
    this.upDate.emit(type);
  }


  /**
   * 认证通过
   */
  access(id) {
    let me = this;
    let url = '/custAuthInfo/updateState';
    let data = {
      id: id,
      state: 'PASS',
    }
    me.submit.putRequest(url, data);
    me.certificationComponent.aqeuryAll('AUDIT', me.curPage);
  }

  /*
   * 审核驳回原因
   * */
  delivery(obj) {
    let me = this;
    let url = '/custAuthInfo/updateState';
    let data = {
      id: this.orderId,
      state: 'UNPASS',
      verifyReason: obj.verifyReason,
    }
    let a = this.reasonRejecService.reasonReject(url, data);
    me.hideWindow("success");
    me.certificationComponent.aqeuryAll('AUDIT', me.curPage);
  }

  /**
   * 改变是否成功
   */
  changeIsAgree(isAgree) {
    if (isAgree == 'Y') {
      this.isAgree = 'N';
      this.showRecord = false;
    } else {
      this.isAgree = 'Y';
      this.showRecord = true;
    }
  }


  imageViewerReady($event: any) {
    console.log($event);
  }

}
