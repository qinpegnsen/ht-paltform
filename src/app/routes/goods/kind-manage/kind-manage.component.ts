import {Component, OnInit} from "@angular/core";
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {Page} from "../../../core/page/page";
import {Router} from "@angular/router";
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {GoodsService} from "../goods.service";

@Component({
  selector: 'app-kind-manage',
  templateUrl: './kind-manage.component.html',
  styleUrls: ['./kind-manage.component.scss']
})
export class KindManageComponent implements OnInit {
  public kinds: Page = new Page();
  public addButton;// 添加按钮的配置
  public buttons;// 按钮组的配置
  public childKindId = 0; //分类编码，查询子集用,初始值0，代表第一级
  public childKindList: Array<any> = []; //菜单级别面包屑
  public curSortId: any; //当前三级分类的id
  public parentId: any; //当前三级分类的父id

  constructor(public router: Router,
              public submitService: SubmitService,
              public GoodsService: GoodsService,
              public tool: RzhtoolsService) {
  }

  ngOnInit() {
    let me = this;
    me.queryDatas(1, 0);
    me.addButton = {
      type: 'add-thc',
      text: '新增分类',
    };
    me.buttons = [
      {
        title: "修改",
        type: "update",
        size: "xs",
        callback: function (kindId,curPage, kindPid) {
          me.router.navigate(['/main/goods/kind-manage/upKind'],{queryParams: {kindId: kindId,page:curPage,kindPid:kindPid}});
        }
      },
      {
        title: "删除",
        type: "delete",
        size: "xs",
        callback: function (kindId,curPage, kindPid) {
          let url = '/goodsKind/deleteGoodsKind';
          me.submitService.delRequest(url, {id: kindId});
          me.queryDatas(curPage, kindPid);
        }
      }
    ];
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 20) + 'px';
    target.style.left = (event.clientX + 30) + 'px';
  }

  /**
   * 隐藏大图
   * @param event
   */
  hideImg(event){
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
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
    this.submitService.putRequest(requestUrl, requestData);
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
    this.queryDatas(1, me.childKindId);
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
    let requestUrl = '/goodsKind/queryGoodsKindPageByParentId';
    let requestData = {
      curPage: activePage,
      pageSize: 10,
      kindParentId: kindId
    };
    let res = me.submitService.getData(requestUrl, requestData);
    me.kinds = new Page(res);
  }

  /**
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(data:any){
    data.isShow = !data.isShow;
  }

  /**
   * 绑定品牌
   * @param id
   */
  bindKind(id,parentId){
    this.curSortId = id;
    this.parentId = parentId;
  }

  /**
   * 分类关联品牌回调函数
   * @param data
   */
  getDeliverOrderData(data) {
    if(data.type) {
      this.queryChildKindList(this.parentId,'',true);
    }
    this.curSortId = null;
  }
}
