import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {FileUploader} from "ng2-file-upload";
import {MaskService} from "../../../core/services/mask.service";
import {AppComponent} from "../../../app.component";
import {SubmitService} from "../../../core/forms/submit.service";
import {GetUidService} from "../../../core/services/get-uid.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
declare var $: any;
@Component({
  selector: 'app-audit-alert',
  templateUrl: './audit-alert.component.html',
  styleUrls: ['./audit-alert.component.scss']
})
export class AuditAlertComponent implements OnInit {
  public showWindow: boolean = false;
  public uploader: FileUploader = new FileUploader({
    url: 'upload/basic/upload',
    itemAlias: "limitFile"
  }); //初始化上传方法
  myImg: boolean = false;
  uuid: string;
  voncher: any = {
    id: null,
    payBank: null,
    payAcct: null,
    payBacctName: null,
    remark: null,
    voucherUrl: null
  };
  commomBanks: any;
  @Input('curId') curId: string;
  @Input('page') page: string;
  @Output() addRecord = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['curId'] && !isNullOrUndefined(this.curId)) {
      console.log("█ curId ►►►", this.curId);
      this.voncher.id = this.curId;
      $('.wrapper > section').css('z-index', 200);
      this.showWindow = true;
      this.getCommonBankList();
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }


  constructor(private submit: SubmitService,
              private tools: RzhtoolsService,
              private getUid: GetUidService) {
  }

  ngOnInit() {
  }

  /**
   * 监听图片选择
   * @param $event
   */
  fileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.uploader.queue.length > 1) this.uploader.queue[0].remove();
    this.myImg = true;  //表示已经选了图片
  }

  /**
   * 添加完成提交表单
   */
  addFinished(){
    let me = this;
    this.voncher.uuid = null;
    me.upLoadImg(); //上传图片及提交数据
  }

  /**
   * 获取常用银行列表
   */
  getCommonBankList(){
    let url = '/datadict/querryDatadictList';
    let data = {
      code: 'common_use_bank_name'
    }
    let banks = this.submit.getRequest(url, data);
    if(!isNullOrUndefined(banks)) this.commomBanks = banks.voList;
  }

  /**
   * 关闭当前窗口，向父页面传递信息
   */
  hideWindow(type?: boolean) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showWindow = false;
    if (isUndefined(type)) type = false;
    this.addRecord.emit({
      type: type,
      page: me.page
    })// 向外传值
    this.voncher = {
      id: null,
      payBank: null,
      payAcct: null,
      payBacctName: null,
      remark: null,
      voucherUrl: null
    };
  }

  /**
   * 上传图片及提交数据
   * @param submitData
   * @param submitUrl
   * @param method : post/put
   */
  private upLoadImg(){
    let me = this;
    MaskService.showMask();//上传图片比较慢，显示遮罩层
    //上传之前
    me.uploader.onBuildItemForm = function(fileItem, form){
      me.uuid = me.getUid.getUid();
      form.append('uuid', me.uuid);
    };
    //执行上传
    me.uploader.uploadAll();
    //上传成功
    me.uploader.onSuccessItem = function (item, response, status, headers) {
      let res = JSON.parse(response);
      if (res.success) {
        if (!isNullOrUndefined(me.uuid)) me.voncher.voucherUrl = me.uuid;
      } else {
        AppComponent.rzhAlt('error','上传失败', '图片上传失败！');
      }
    }
    // 上传失败
    me.uploader.onErrorItem = function (item, response, status, headers) {
      AppComponent.rzhAlt('error','上传失败', '图片上传失败！');
    };
    //上传完成，不管成功还是失败
    me.uploader.onCompleteAll = function(){
      me.submitFormDataAndRefresh()
    }

    //如果没有选择图片则直接提交
    if(!me.uploader.isUploading){   // 图片已经传过了，但是数据提交失败了，改过之后可以直接提交
      if (!isNullOrUndefined(me.uuid)) me.voncher.voucherUrl = me.uuid;
      me.submitFormDataAndRefresh();
    }
  }

  /**
   * 提交数据，刷新父当前页组件数据
   * method: post
   * @param submitUrl
   * @param submitData
   */
  private submitFormDataAndRefresh(){
    let me = this;
    if(isNullOrUndefined(me.voncher.uuid)){
      AppComponent.rzhAlt('warning','请上传汇款凭证');
      return;
    }
    me.submit.postRequest('/rpCustWithdraw/updateStateToDone', me.voncher);
    me.hideWindow(true)// 关闭当前窗口，向父页面传递信息
  }
}
