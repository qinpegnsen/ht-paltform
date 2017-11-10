import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../../core/settings/settings.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubmitService} from "../../../../core/forms/submit.service";
import {HelpInterlocutionComponent} from "../help-interlocution/help-interlocution.component";
import {PatternService} from "../../../../core/forms/pattern.service";

@Component({
  selector: 'app-addrightpage',
  templateUrl: './addrightpage.component.html',
  styleUrls: ['./addrightpage.component.scss']
})
export class AddrightpageComponent implements OnInit {
  public id: number;
  public linkType: string;
  public updataDataa: any;
  public curPage:any;
  constructor(public settings: SettingsService, public router: Router, public routeInfo: ActivatedRoute,
              public sub: SubmitService, public submitt: SubmitService,
              public helpInterlocutionComponent:HelpInterlocutionComponent,public patterns:PatternService) {
               this.settings.showRightPage("30%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    /**
     * 路由中获取对应参数
     */
    let _this = this;
    _this.curPage = this.routeInfo.snapshot.queryParams['curPage'];
    _this.id = _this.routeInfo.snapshot.queryParams['id'];
    _this.linkType = _this.routeInfo.snapshot.queryParams['linkType'];

    if (_this.linkType == "updateCount") {//分类帮助--若为修改操作,获取信息
      _this.updataDataa = _this.submitt.getData("/helpKind/loadById", {id: _this.id});
      console.log(_this.updataDataa)
    }
  }

  /**
   *  取消
   */
  cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

  /**
   * 提交
   */
  submit(res) {
    if (this.linkType == 'aa') {
      let url = '/helpKind/addHelpKind';//帮助分类添加
      let data = {
        kindName: res.kindName,
        sort: res.sort,
        description: res.description,
      }
      this.submitt.postRequest(url,data,true);
      this.helpInterlocutionComponent.qeuryAllService(this.curPage);
    } else if (this.linkType == 'updateCount') {
      let url = '/helpKind/updateHelpKind';//帮助分类修改
      let data = {
        id:this.id,
        kindName:res.kindName,
        sort: res.sort,
        description:res.description,
      }
      this.submitt.putRequest(url,data,true);
      this.helpInterlocutionComponent.qeuryAllService(this.curPage);
    }
  }
}
