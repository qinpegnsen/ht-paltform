import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from "@angular/core";
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {FileUploader} from "ng2-file-upload";
import {AppComponent} from "../../../app.component";
declare var $: any;
@Component({
  selector: 'app-agree-cash',
  templateUrl: './agree-cash.component.html',
  styleUrls: ['./agree-cash.component.scss']
})
export class AgreeCashComponent implements OnInit {

  public showCashWindow: boolean = false;
  @Input('curId') curId: string;
  @Input('bank') bank: string;
  @Input('name') name: string;
  @Input('acct') acct: string;
  @Input('currentId2') currentId2: any;
  @Input('drawMoney') drawMoney: string;
  @Input('page') page: string;
  @Output() addRe = new EventEmitter();
  public payWay: string = '';
  public uploader: FileUploader = new FileUploader({
    url: 'upload/basic/upload',
    itemAlias: "limitFile"
  }); //初始化上传方法
  myImg: boolean = false;
  uuid: string;
  voncher: any = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['curId'] && !isNullOrUndefined(this.curId)) {
      this.voncher.id = this.curId;
      $('.wrapper > section').css('z-index', 200);
      this.showCashWindow = true;
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(public submit: SubmitService,
              public tools: RzhtoolsService,) {
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
    this.submit.postRequest(url, data);
    me.hideWindow(true)// 关闭当前窗口，向父页面传递信息
  }


  /**
   * 关闭当前窗口，向父页面传递信息
   */
  hideWindow(type?: boolean) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showCashWindow = false;
    if (isUndefined(type)) type = false;
    this.addRe.emit({
      type: type,
      page: me.page
    })// 向外传值
    this.voncher = {};
  }


  /**
   * 提交数据，刷新父当前页组件数据
   * method: post
   * @param submitUrl
   * @param submitData
   */
  public submitFormDataAndRefresh() {
    let me = this;
    if (isNullOrUndefined(me.voncher.uuid)) {
      AppComponent.rzhAlt('warning', '请上传汇款凭证')
      return;
    }
    me.submit.postRequest('/finaceStoreDraw/uploadVoucher', me.voncher);
    me.hideWindow(true)// 关闭当前窗口，向父页面传递信息
  }
}
