import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";
import {isUndefined} from "util";
import {PatternService} from "../../../core/forms/pattern.service";

@Component({
  selector: 'app-mumber',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  public memberListdata: Page = new Page();

  public custName:string='';//默认查询的会员的名称

  public custTruename:string='';//默认查询的会员的名称

  public custPhone:string='';//默认查询的会员的名称

  public authState:string='';//默认查询的会员的是否认证
  public state:string='';//默认查询的会员的状态

  public authStates:any;    //会员认证列表
  public states:any;    //会员状态列表

  public detailsbutton:Object;//查看详情按钮

  constructor(public service:SubmitService, public tools: RzhtoolsService,public patterns:PatternService) { }

  ngOnInit() {

    this.detailsbutton={
      title:"查看更多信息",
      type: "details"
    };

    /**
     * 初始化的时候获取快递列表的数据
     */
    this.queryMemberList(1);
    this.authStates = this.tools.getEnumDataList('1028');   //会员状态枚举列表
    this.states = this.tools.getEnumDataList('1018');   //会员状态枚举列表
  }
  search(curPage){
    this.queryMemberList(1);
  }
  /**
   *
   * 查询会员的列表
   */
  queryMemberList(curPage,event?:PageEvent){
    let me=this;
    let activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    };
    let data={
      curPage:activePage,
      pageSize:10,
      sortColumns:'',
      custName:this.custName,
      custTruename:this.custTruename,
      custPhone:this.custPhone,
      authState:this.authState,
      state:this.state,
    }
    let url='/cust/queryAllCust';
    me.memberListdata=new Page(me.service.getData(url,data))
  }

  /**
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(data:any){
    data.isShow = !data.isShow;
  }

  /**
   * 改变用户状态
   * @param state
   * @param orgCode
   */
  changeState(state,custCode,curPage){
    let me=this;
    let url = '/cust/updateState';
    let data = {
      custCode:custCode,
      state:state
    }
    me.service.putRequest(url,data);
    me.queryMemberList(curPage);
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event, i) {
    i.style.display = 'block';
    i.style.top = (event.clientY + 15) + 'px';
    i.style.left = (event.clientX + 20) + 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(i) {
    i.style.display = 'none';
  }
}
