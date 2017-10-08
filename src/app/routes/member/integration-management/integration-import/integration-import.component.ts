import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {SubmitService} from "../../../../core/forms/submit.service";
import {AppComponent} from "../../../../app.component";
import {MaskService} from "../../../../core/services/mask.service";
import {isNullOrUndefined} from "util";
import {cli} from "webdriver-manager/built/lib/webdriver";
const swal = require('sweetalert');
declare var $: any;
@Component({
  selector: 'app-integration-import',
  templateUrl: './integration-import.component.html',
  styleUrls: ['./integration-import.component.scss']
})
export class IntegrationImportComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({//初始化上传方法
    url: '/upload/local/file',
    itemAlias:"file",
  });
  progress: number;//进度条
  private errorFile: string;
  private templateFile: string ="http://ovaetuonu.bkt.clouddn.com/templateCoin.xlsx";
  private onOff: boolean = false;
  constructor(private submitt:SubmitService) { }

  ngOnInit() {

  }
 //清空选中的表格
  changeFiles(){
    this.onOff = true; $("button").css({backgroundColor:"#37bc9b",border:"2px solid #37bc9b"})
    if(this.uploader.queue.length > 1) this.uploader.queue[0].remove();
  }

  //上传
  private upLoadExcel(submitUrl,submitData,method){
    let me = this;
  if(this.onOff){
    this.onOff = false;

    MaskService.showMask();//上传表格比较慢，显示遮罩层
    //执行上传
    me.uploader.uploadAll();
    //上传成功
    me.uploader.onSuccessItem = function (item, response, status, headers) {
      $("button").css({backgroundColor:"#f05050",border:"2px solid #f05050"})
      let res = JSON.parse(response);
      if (res.success) {
        me.iimport(res.data);
      } else {
        AppComponent.rzhAlt('error','表格失败','表格上传失败！');
      }
    }
    // 上传失败
    me.uploader.onErrorItem = function (item, response, status, headers) {
      AppComponent.rzhAlt('error','表格失败', '表格上传失败！');
    };
  }
  }
  //导入
  private iimport(uid){
    let url = '/custCoin/importCoin';
    let data = {
      uid:uid
    }
    let result=this.submitt.postRequest(url, data,false);
    // console.log(result);
    this.errorFile = result;
  }
}
