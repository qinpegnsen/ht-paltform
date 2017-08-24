import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../../core/settings/settings.service";
import {SubmitService} from "../../../core/forms/submit.service";
import {KindManageComponent} from "../kind-manage/kind-manage.component";
import {ActivatedRoute} from "@angular/router";
import {GoodsService} from "../goods.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-add-kind',
  templateUrl: './add-kind.component.html',
  styleUrls: ['./add-kind.component.scss'],
  providers: [KindManageComponent, SubmitService,GoodsService]
})
export class AddKindComponent implements OnInit {
  private kindInfo = {};
  private path;// 当前路由
  private pageTitle;// 右弹窗页面标题
  private editKind: boolean = false;
  private tip = {
    commisRate: '请输入小数形式，0 <= 佣金比例 < 1',
    sort: '0-99，默认0',
    keywords: '多个关键词请用逗号隔开'
  }

  constructor(public settings: SettingsService,private route:ActivatedRoute,
              private parentComp: KindManageComponent,
              private submit: SubmitService) {
    this.settings.showRightPage("28%"); // 此方法必须调用！页面右侧显示，带滑动效果,可以自定义宽度：..%  或者 ..px
  }

  ngOnInit() {
    let me = this;
    this.kindInfo['state'] = 'SHOW';
    this.kindInfo['level'] = '1';
    this.kindInfo['sort'] = '0';

    //获取当前路由
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
      //console.log("█ this.path ►►►", this.path);
      switch (me.path) {
        //新增分类
        case "addKind":
          //console.log("█ \"新增分类\" ►►►", "新增分类");
          me.pageTitle = "新增分类";
          me.editKind = true;
          let param = this.route.snapshot.queryParams;
          if(!isNullOrUndefined(param.pid)) this.kindInfo['kindParentId'] = param.pid ;
          if(!isNullOrUndefined(param.pname)) this.kindInfo['parentKindName'] = param.pname ;
          if(!isNullOrUndefined(param.level)) this.kindInfo['level'] = param.level ;
          break;

        //修改分类
        case "upKind":
          //console.log("█ \"修改分类\" ►►►", "修改分类");
          me.pageTitle = "修改分类";
          me.editKind = true;
          me.kindInfo = this.getKindInfo();// 获取分类信息
          break;
      }
    });
  }

  /**
   * 获取分类信息
   * @returns {any}
   */
  private getKindInfo(){
    let url = '/goodskind/loadGoodsKindById';
    let data = { id: this.submit.getParams('kindId')};
    return this.submit.getData(url,data);
  }



  //提交表单
  private addKindForm() {
    let me = this;
    let submitUrl, submitData;
    submitData = me.kindInfo;
    switch (me.path) {
      //新增分类
      case "addKind":
        submitUrl = '/goodskind/addGoodsKind';
        me.submit.postRequest(submitUrl, submitData, true);// 所有post提交用的都是SubmitService里的postRequest方法,true表示需要返回上级页面
        break;
      //修改分类
      case "upKind":
        submitUrl = '/goodskind/updateGoodsKind';
        me.submit.putRequest(submitUrl, submitData, true);// 所有put提交用的都是SubmitService里的putRequest方法,true表示需要返回上级页面
        break;
    }
    console.log("█ submitData ►►►", submitData);
    me.parentComp.queryDatas(1,0);// 刷新父页面数据
  }

  // 取消
  private cancel() {
    this.settings.closeRightPageAndRouteBack(); //关闭右侧滑动页面
  }

}
