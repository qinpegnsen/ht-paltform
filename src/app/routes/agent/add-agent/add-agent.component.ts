import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingsService} from '../../../core/settings/settings.service';
import {AjaxService} from "../../../core/services/ajax.service";
const swal = require('sweetalert');


@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {
  public linkType: string;
  private staff = {}

  constructor( public settings: SettingsService,private ajax:AjaxService,private router:Router,private routeInfo:ActivatedRoute) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    this.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
  }

  /**
   * 关闭右侧滑动页面
   */
  cancel(){
    //this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
    this.router.navigate(['/main/agent/agentperson']);
  }

  addLimitList(value){
    let _this = this;
    //添加代理商信息
    if(_this.linkType = 'addArticle'){
      _this.ajax.post({
        url: '/agent/addAgent',
        data: {
          'agentName':value.agentName,
          'agentLevel':value.agentLevel,
          'agentAcct':value.agentAcct,
          'agentPwd':value.agentPwd,
          'leader':value.leader,
          'mobile':value.mobile,
          'idcard':value.idcard,
          'idcardImage1uuid':value.idcardImage1uuid,
          'idcardImage2uuid':value.idcardImage2uuid,
          'areaCode':value.areaCode,
          'address':value.address,
          'coordinateLng':value.coordinateLng,
          'coordinateLat':value.coordinateLat,
          'description':value.description
        },
        success: (res) => {
          if (res.success) {
            _this.router.navigate(['/main/website/areas'], {replaceUrl: true}); //路由跳转
            swal('添加代理商提交成功！', '','success');
           // _this.AreasComponent.queryList()//实现刷新
          } else {
            swal('添加代理商提交失败====！', 'error');
          }
        },
        error: (data) => {
          swal('添加代理商提交失败！', '','error');
        }
      })
    }
    //修改代理商信息
    else {
      _this.ajax.put({
        url: '/agent/updateAgentBasic',
        data: {
          'agentName':value.agentName,
          'agentLevel':value.agentLevel,
          'agentAcct':value.agentAcct,
          'agentPwd':value.agentPwd,
          'leader':value.leader,
          'mobile':value.mobile,
          'idcard':value.idcard,
          'idcardImage1uuid':value.idcardImage1uuid,
          'idcardImage2uuid':value.idcardImage2uuid,
          'areaCode':value.areaCode,
          'address':value.address,
          'coordinateLng':value.coordinateLng,
          'coordinateLat':value.coordinateLat,
          'description':value.description
        },
        success: (res) => {
          console.log(res)
          if (res.success) {
            _this.router.navigate(['/main/website/areas'], {replaceUrl: true});   //路由跳转
            swal('修改区域信息成功！', '','success');
            //_this.AreasComponent.queryList()//实现刷新
          } else {
            let errorMsg = res.data.substring(res.data.indexOf('$$') + 2, res.data.indexOf('@@'))
            swal(res.info, errorMsg, 'error');
          }
        },
        error: (data) => {
          swal('修改区域信息失败！', '','error');
        }
      });
    }
  }
}
