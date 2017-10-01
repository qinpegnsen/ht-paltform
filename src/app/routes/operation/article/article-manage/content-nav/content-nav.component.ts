import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NavService} from "./nav.service";
import {SubmitService} from "../../../../../core/forms/submit.service";

@Component({
  selector: 'app-content-nav',
  templateUrl: './content-nav.component.html',
  styleUrls: ['./content-nav.component.scss']
})
export class ContentNavComponent implements OnInit,OnChanges{

  @Output()
  public sendState=new EventEmitter();//把当点击文章的状态发射出去，用来查询文章的列表

  @Input()
  public totalRow//获取各种状态的总条数,然后刷新页面

  public flag='DRAFT'; //默认草稿是选中的状态,给点击的当前的状态添加样式

  public defaultState='DRAFT'; //组件之间传送的时候默认的是草稿的状态

  public stateList={}; //各种状态总数列表

  constructor(public NavService:NavService,public service:SubmitService) { }

  /**
   * 初始化的时候获取所有状态的总条数
   * 发射默认的文章状态
   */
  ngOnInit() {
    let data={}
    let url= "/article/getCountByState";
    this.stateList=this.NavService.queryTotalRow(url,data);
    this.sendState.emit(this.defaultState)
  }

  /**
   * 输入属性改变当前的状态的总数
   */
  ngOnChanges(){
    this.stateList=this.totalRow;
  }
  /**
   * 点击的时候获取文章的状态
   * @param state  默认是草稿
   */
  articleState(state){
    this.flag=state;//给点击的当前的状态添加样式
    this.sendState.emit(state)
  }

}
