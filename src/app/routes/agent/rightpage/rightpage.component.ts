import { Component, OnInit } from '@angular/core';
import {AjaxService} from "../../../core/services/ajax.service";
import {SettingsService} from "../../../core/settings/settings.service";
import {ActivatedRoute,Router} from '@angular/router';
import {RegionComponent} from "../region/region.component";
import {isNullOrUndefined} from "util";
const swal = require('sweetalert');

@Component({
  selector: 'app-rightpage',
  templateUrl: './rightpage.component.html',
  styleUrls: ['./rightpage.component.scss']
})
export class RightpageComponent implements OnInit {
  public queryId:number;//获取添加，修改的ID
  public agentCode:string;//获取代理商编码
  public organ={}
  public limitForm = {
    agentCode: '',
    agentPwd:'',
    agentNewPwd:''
  }
  public staff:any = {};
  // 构造 初始化
  constructor(public settings: SettingsService,public router:Router,public ajax:AjaxService,public routeInfo:ActivatedRoute,public RegionComponent:RegionComponent) {
    this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }
  ngOnInit() {
    this.queryId = this.routeInfo.snapshot.queryParams['id'];
    this.agentCode = this.routeInfo.snapshot.queryParams['agentCode'];

    this.loadAgent();
  }
  // 取消
  cancel(){
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  /**
   * 请求代理商详细数据，并显示()
   */
  loadAgent(){
    if(!isNullOrUndefined(this.agentCode)) {
      this.ajax.get({
        url: '/agent/loadByAgentCode',
        async: false, //同步请求
        data: {agentCode: this.agentCode},
        success: (res) => {
          this.staff = res.data;
          if(isNullOrUndefined(this.staff)) this.staff = {}
        },
        error: (res) => {
          console.log("post limit error");
        }
      });
    }
  }

  //获取区域数据
  public getAreaData(area){
    let me = this;
    me.organ['areaCode'] = area.areaCode;
  }

  /**
   * 添加代理区域
    * @param value
   */
  addLimitList(value){
    let _this = this;
    if(_this.queryId == 2){
    }else if(_this.queryId == 1){
      _this.ajax.post({
        url: '/agentArea/addAgentArea',
        async: false,
        data: {
          'areaCode': _this.organ['areaCode'] ,
          'remark': value.remark,
        },
        success: (res) => {
          if (res.success) {
            _this.router.navigate(['/main/agent/region'], {replaceUrl: true}); //路由跳转
            swal('已添加代理区域！', '','success');
            _this.RegionComponent.controlDatas()//实现刷新
          } else {
            swal(res.info,'','error');
          }
        },
        error: (data) => {
          swal('添加代理区域失败！', '','error');
        }
      })
    }
  }
}
