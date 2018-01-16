import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from "@angular/core";
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
declare var $: any;
@Component({
  selector: 'app-agree-cash',
  templateUrl: './agree-cash.component.html',
  styleUrls: ['./agree-cash.component.scss']
})
export class AgreeCashComponent implements OnInit {

  public showCashWindow: boolean = false;
  @Input('curId') curId: string;//id
  @Input('bank') bank: string;//收款人开户行
  @Input('name') name: string;//收款人姓名
  @Input('acct') acct: string;//收款人账户
  @Input('drawMoney') drawMoney: string;//提现金额
  @Input('page') page: string;//分页
  @Output() addRe = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['curId'] && !isNullOrUndefined(this.curId)) {
      $('.wrapper > section').css('z-index', 200);
      this.showCashWindow = true;
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(public submit: SubmitService) {
  }

  ngOnInit() {
  }


  /**
   * 添加完成提交表单
   */
  addFinished() {
    let me = this;
    let url = '/finaceStoreDraw/updateStateDeal';
    let data = {
      id: me.curId,
    }
    me.submit.postRequest(url, data);
    me.hideWindow(true)// 关闭当前窗口，向父页面传递信息
  }


  /**
   * 关闭当前窗口，向父页面传递信息
   */
  hideWindow(type?: boolean) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    me.showCashWindow = false;
    if (isUndefined(type)) type = false;
    me.addRe.emit({
      type: type,
      page: me.page
    })// 向外传值
  }

}
