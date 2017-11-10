import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../core/settings/settings.service";
import {SubmitService} from "../../../core/forms/submit.service";
declare var $: any;
@Component({
  selector: 'app-edit-pw',
  templateUrl: './edit-pw.component.html',
  styleUrls: ['./edit-pw.component.scss']
})
export class EditPwComponent implements OnInit {

  constructor(public settings: SettingsService,public submitt: SubmitService) { }

  ngOnInit() {
  }
  //密码判断
  validate() {
    var pwd = $("#pwd").val();
    var comfirmPwd = $("#comfirmPwd").val();
    //判断两次密码输入是否一致
    if(pwd == comfirmPwd)
    {
      $("#tishi").html("两次密码相同");
      $("#tishi").css("color","green");
    }
    else {
      $("#tishi").html("两次密码不相同");
      $("#tishi").css("color","red")

    }
  }
  //取消
  cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }
  //提交修改
  submita(res){
    console.log("res--",res);
      let url = '/admin/updatePwd';
      let data = {
        pwd:res.form._value.pwd,
        comfirmPwd:res.form._value.comfirmPwd,
        oldpwd:res.form._value.oldpwd,
      }
      this.submitt.postRequest(url, data);
}
}
