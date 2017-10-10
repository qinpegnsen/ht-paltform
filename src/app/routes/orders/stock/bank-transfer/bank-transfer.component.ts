import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../../core/forms/submit.service";
import {FileUploader} from "ng2-file-upload";
import {GetUidService} from "../../../../core/services/get-uid.service";
import {AppComponent} from "../../../../app.component";
declare var $: any;
@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.scss']
})
export class BankTransferComponent implements OnInit {

  private uuid;
  public selectBank:any;
  private code;
  private myImgs: any;//上传首页模板效果图
  /**
   * 图片上传
   * @type {FileUploader}
   * url  图片上传的接口地址
   * itemAlias  文件别名
   * queueLimit 上传文件控制
   */
  public uploader:FileUploader = new FileUploader({
    url: '/upload/basic/upload',
    itemAlias:"limitFile",
    queueLimit: 1
  });
  @Input('orderId') orderId: string;
  @Input('goodspay') goodspay: string;
  @Input('showBankWindow') showBankWindow: boolean;
  @Output() bankDate = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showBankWindow'] && changes['orderId']) {
      if(this.showBankWindow && this.orderId && !isNullOrUndefined(this.orderId) && this.goodspay && !isNullOrUndefined(this.goodspay)) $('.wrapper > section').css('z-index', 200);
      else $('.wrapper > section').css('z-index', 114);
    }
  }
  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(private submit:SubmitService, public GetUidService: GetUidService,) { }

  ngOnInit() {
    this.seletAllByTypeCode();
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
/*
* 添加付款人信息
* */
  addRemitCallBack(obj) {
    this.uploadImg(obj);
}

aa(obj){
  let url = "/agentOrd/addRemitCallBack";
  let data = {
    ordno: this.orderId,
    acct: this.goodspay,
    tc3rd:obj.tc3rd,
    bank:this.code,
    bacctName: obj.bacctName,
    voucherUrl: this.uuid,
    tradeTime: '',
  }
  let result = this.submit.postRequest(url,data);
}


/*
* 选择银行
* */
  seletAllByTypeCode(){
    let url = '/datadict/queryAllByTypeCode';
    let data = {
      typeCode:'common_use_bank_name'
    }
    this.selectBank=this.submit.getData(url, data);
  }

  fileChangeListeners() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if(this.uploader.queue.length > 1) this.uploader.queue[0].remove();
    this.myImgs = true;  //表示已经选了图片
  }
  /**
   * 图片上传
   */
  uploadImg(obj){
    let me = this;
    /**
     * 构建form时，传入自定义参数
     * @param item
     */
    me.uploader.onBuildItemForm = function (fileItem, form) {
      this.uuid=me.GetUidService.getUid();
      form.append('uuid', this.uuid);
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
      let res = JSON.parse(response);
      if (res.success) {
        console.log("█ '上传图片成功' ►►►",  '上传图片成功');
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


    /**
     * 所有图片都上传成功后执行添加文章
     */
    me.uploader.onCompleteAll=function(){
      me.aa(obj);
    }
  }

}
