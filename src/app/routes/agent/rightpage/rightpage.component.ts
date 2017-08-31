import { Component, OnInit } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {SettingsService} from "../../../core/settings/settings.service";
import {ActivatedRoute,Router} from '@angular/router';
const swal = require('sweetalert');

@Component({
  selector: 'app-rightpage',
  templateUrl: './rightpage.component.html',
  styleUrls: ['./rightpage.component.scss']
})
export class RightpageComponent implements OnInit {
  private queryId:number;//获取添加，修改的ID
  public agentCode:string;//获取代理商编码
  private limitForm = {
    agentCode: '',
    agentPwd:'',
    agentNewPwd:''
  }

  // 构造 初始化
  constructor(public settings: SettingsService,private router:Router,private ajax:AjaxService,private routeInfo:ActivatedRoute) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }
  ngOnInit() {
    this.queryId = this.routeInfo.snapshot.queryParams['id'];
    this.agentCode = this.routeInfo.snapshot.queryParams['agentCode'];
  }
  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  addLimitList(value){
    let _this = this;
    if(_this.queryId == 2){
      _this.ajax.put({
        url: '/agent/updateAgentPwd',
        data: {
          'agentCode': value.agentCode,
          'agentPwd': value.agentPwd,
          'agentNewPwd': value.agentNewPwd
        },
        success: (res) => {
          if (res.success) {
            _this.router.navigate(['/main/website/areas'], {replaceUrl: true}); //路由跳转
            swal('修改密码提交成功！', '','success');
            //_this.AreasComponent.queryList()//实现刷新
          } else {
            swal('修改密码提交失败====！', 'error');
          }
        },
        error: (data) => {
          swal('修改密码提交失败！', '','error');
        }
      })
    }
  }
}
