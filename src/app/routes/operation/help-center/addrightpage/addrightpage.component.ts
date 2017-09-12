import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../../core/settings/settings.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubmitService} from "../../../../core/forms/submit.service";
import {HelpInterlocutionComponent} from "../help-interlocution/help-interlocution.component";

@Component({
  selector: 'app-addrightpage',
  templateUrl: './addrightpage.component.html',
  styleUrls: ['./addrightpage.component.scss']
})
export class AddrightpageComponent implements OnInit {
  public id: number;
  public linkType: string;
  public updataDataa: any;

  constructor(public settings: SettingsService, private router: Router, private routeInfo: ActivatedRoute,
              private sub: SubmitService, private submitt: SubmitService,private helpInterlocutionComponent:HelpInterlocutionComponent) {
               this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    //路由中获取对应参数
    let _this = this;
    _this.id = _this.routeInfo.snapshot.queryParams['id'];
    _this.linkType = _this.routeInfo.snapshot.queryParams['linkType'];

    if (_this.linkType == "updateCount") {//分类帮助--若为修改操作,获取信息
      _this.updataDataa = _this.submitt.getData("/helpKind/loadById", {id: _this.id}); //获取数据字典key
      console.log(_this.updataDataa)
    }
  }

  // 取消
  cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

 // 提交
  submit(res) {
    if (this.linkType == 'aa') {
      let url = '/helpKind/addHelpKind';//帮助分类添加
      let data = {
        name: res.name,
        icon: res.icon,
        sort: res.sort,
        description: res.description,
      }
      this.submitt.postRequest(url, data);
      this.helpInterlocutionComponent.qeuryAllService();
      this.settings.closeRightPageAndRouteBack();
    } else if (this.linkType == 'updateCount') {
      let url = '/helpKind/updateHelpKind';//计量单位修改
      let data = {
        id:res.id,
        name:res.name,
        sort: res.sort,
        icon: res.icon,
        description:res.description,
      }
      this.submitt.putRequest(url, data);
      this.helpInterlocutionComponent.qeuryAllService();
      this.settings.closeRightPageAndRouteBack();
    }
  }
}
