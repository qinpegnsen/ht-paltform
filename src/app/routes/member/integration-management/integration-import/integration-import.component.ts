import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {SubmitService} from "../../../../core/forms/submit.service";
import {AppComponent} from "../../../../app.component";
import {MaskService} from "../../../../core/services/mask.service";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');
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
  private data:any;//文件暗码
  constructor(private submitt:SubmitService) { }

  ngOnInit() {
  }
 //清空选中的表格
  changeFiles(){
    if(this.uploader.queue.length > 1)this.uploader.queue[0].remove();
  }
  //上传
  private upLoadExcel(submitUrl,submitData,method){
    let me = this;
    MaskService.showMask();//上传表格比较慢，显示遮罩层
    //执行上传
    me.uploader.uploadAll();
    //上传成功
    me.uploader.onSuccessItem = function (item, response, status, headers) {
      let res = JSON.parse(response);
      console.log("█ res ►►►",  res);
      if (res.success) {
        console.log("█ res.data ►►►",  res.data);
        me.iimport(res.data);
        console.log("█  me.data ►►►",   me.data);
      } else {
        AppComponent.rzhAlt('error','表格失败','表格上传失败！');
      }
    }
    // 上传失败
    me.uploader.onErrorItem = function (item, response, status, headers) {
      AppComponent.rzhAlt('error','表格失败', '表格上传失败！');
    };
  }
  //导入
  private iimport(uid){
    let url = '/custCoin/importCoin';
    let data = {
      uid:uid
    }
    let result=this.submitt.postRequest(url, data,false);
    console.log(result);
    this.errorFile = result;
  }
}
