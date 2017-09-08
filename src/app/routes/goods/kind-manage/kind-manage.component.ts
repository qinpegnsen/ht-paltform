import {Component, OnInit} from "@angular/core";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {Router} from "@angular/router";
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";

@Component({
  selector: 'app-kind-manage',
  templateUrl: './kind-manage.component.html',
  styleUrls: ['./kind-manage.component.scss']
})
export class KindManageComponent implements OnInit {
  private searchKey: string;// 搜索关键词
  private kinds: Page = new Page();
  private addButton;// 添加按钮的配置
  private buttons;// 按钮组的配置
  private childKindId = 0; //分类编码，查询子集用,初始值0，代表第一级
  private childKindList: Array<any> = []; //菜单级别面包屑

  constructor(private router: Router, private submitService: SubmitService, public tool: RzhtoolsService) {
  }

  ngOnInit() {
    let me = this;
    me.queryDatas(1, 0);
    me.addButton = {
      type: 'add',
      text: '新增分类',
    };
    me.buttons = [
      {
        title: "修改",
        type: "update",
        size: "xs",
        callback: function (result, kindId) {
          result.then((id) => {
            me.router.navigate(['/main/goods/kind-manage/upKind'],{queryParams: {kindId: kindId}});
          })
        }
      },
      {
        title: "删除",
        type: "delete",
        size: "xs",
        callback: function (result, kindId) {
          result.then((id) => {
            let url = '/goodsKind/updateStateById';
            let data = {id: kindId, state: 'DEL'};
            me.submitService.delRequest(url, data);
          })
        }
      }
    ];
  }

  /**
   * 修改状态
   * @param show
   * @param kindId
   */
  changeKindState(show, kindId, kindPid, curPage) {
    // console.log("█ curPage ►►►",  curPage);
    let state, requestData, requestUrl;
    if (show) {
      state = 'HIDE'
    } else {
      state = 'SHOW'
    }
    ;
    requestUrl = '/goodsKind/updateStateById';
    requestData = {
      id: kindId,
      state: state
    }
    this.submitService.delRequest(requestUrl, requestData);
    this.queryDatas(curPage, kindPid);
  }

  /**
   * 查询子集分类列表
   */
  queryChildKindList(kindId?, kindName?, isTit?: boolean) {
    let me = this, num = 0;
    if (isNullOrUndefined(kindId)) {
      this.childKindId = null, this.childKindList = []; //清空子集查询
    } else {
      me.childKindId = kindId;
      let item = {name: kindName, id: kindId};
      if (!isTit) me.childKindList.push(item); //非点击面包屑路径时，添加面包屑
      else { //点击面包屑路径时，提出点击地址后的面包屑路径
        for (var i = 0; i < me.childKindList.length; i++) {  //获取点击面包屑的路径地址下标
          if (item.id == me.childKindList[i].id) num = i;
        }
        me.childKindList.splice(num + 1); //剔除下标后面的路径
      }
    }
    this.queryDatas(1, me.childKindId)
    // me.data = new Page(me.limitService.queryMenuList(1, 4, me.sysCode, me.childKindId));
  }

  /**
   * 返回上一级分类列表
   */
  goBackMenu() {
    let num = this.childKindList.length;
    if (num - 2 < 0) this.queryChildKindList();
    else this.queryChildKindList(this.childKindList[num - 2].id, this.childKindList[num - 2].name, true);
  }


  ceshi33() {
    let me = this;
    me.tool.rzhAlt("success", "hello world!");
    // this.toasterService.pop("info", "信息提示", "信息消息，类型：info");
  }

  /**
   * 查询分类列表
   * @param event
   * @param curPage
   */
  queryDatas(curPage, kindId, event?: PageEvent) {
    let me = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    ;
    let requestUrl = '/goodsKind/queryGoodsKindPageByParentId';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      kindParentId: kindId
    };
    let res = me.submitService.getData(requestUrl, requestData);
    me.kinds = new Page(res);
  }


}
