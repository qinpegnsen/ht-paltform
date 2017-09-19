import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../shared/directives/ng2-datatable/DataTable";
import {SubmitService} from "../../../core/forms/submit.service";
import {Page} from "../../../core/page/page";
import {RzhtoolsService} from "../../../core/services/rzhtools.service";

@Component({
  selector: 'app-mumber',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  private custName:string='';//默认查询的会员的名称

  private custTruename:string='';//默认查询的会员的名称

  private custPhone:string='';//默认查询的会员的名称

  private authState:string='';//默认查询的会员的是否认证

  public authStates:any;    //会员状态列表

  private memberListdata;//用来存储会员列表的信息

  private detailsbutton:Object;//查看详情按钮

  constructor(public service:SubmitService, private tools: RzhtoolsService) { }

  ngOnInit() {

    this.detailsbutton={
      title:"查看更多信息",
      type: "details"
    };

    /**
     * 初始化的时候获取快递列表的数据
     */
    this.queryMemberList()
    this.authStates = this.tools.getEnumDataList('1028');   //会员状态枚举列表
  }
  search(){
    this.queryMemberList()
  }
  /**
   *
   * 查询会员的列表
   */
  queryMemberList(event?:PageEvent){
    let activePage = 1;
    if(typeof event !== "undefined") {activePage =event.activePage};
    let data={
      curPage:activePage,
      pageSize:10,
      sortColumns:'',
      custName:this.custName,
      custTruename:this.custTruename,
      custPhone:this.custPhone,
      authState:this.authState,
    }
    let url='/cust/queryAllCust';
    this.memberListdata=new Page(this.service.getData(url,data))
    console.log(this.memberListdata)
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
  changeState(state,custCode){
    let url = '/cust/updateState';
    let data = {
      custCode:custCode,
      state:state
    }
    this.service.putRequest(url,data);
    this.queryMemberList();
  }
}
