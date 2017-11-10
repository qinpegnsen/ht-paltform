import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {SubmitService} from "../../../core/forms/submit.service";
import {isNullOrUndefined, isUndefined} from "util";
import {CertificationComponent} from "../certification/certification.component";
import {ReasonRejecService} from "./reason-rejec.service";
declare var $: any;
@Component({
  selector: 'app-reason-rejec',
  templateUrl: './reason-rejec.component.html',
  styleUrls: ['./reason-rejec.component.scss'],
  providers: [ReasonRejecService]
})
export class ReasonRejecComponent implements OnInit {

  @Input('orderId') orderId: string;
  @Input('showReasonWindow') showReasonWindow: boolean;
  @Output() upDate = new EventEmitter();
  @Input('curPage') curPage: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showReasonWindow'] && changes['orderId']) {
      if(this.showReasonWindow && this.orderId && !isNullOrUndefined(this.orderId)) $('.wrapper > section').css('z-index', 200);
      else $('.wrapper > section').css('z-index', 114);
    }
  }
  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }
  constructor(public reasonRejecService:ReasonRejecService,public certificationComponent:CertificationComponent) { }

  ngOnInit() {
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
    this.upDate.emit(type)
  }
  /*
  * 审核驳回原因
  * */
  delivery(obj){
    let url = '/custAuthInfo/updateState';
    let data = {
      id:this.orderId,
      state: 'UNPASS',
      verifyReason:obj.verifyReason,
    }
    let a=this.reasonRejecService.reasonReject(url, data);
    this.hideWindow("success");
    this.certificationComponent.aqeuryAll('AUDIT',this.curPage);
  }
}
