import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NavService} from "./nav.service";

@Component({
  selector: 'app-content-nav',
  templateUrl: './content-nav.component.html',
  styleUrls: ['./content-nav.component.scss']
})
export class ContentNavComponent implements OnInit,OnChanges {

  @Output()
  public sendState=new EventEmitter();//把当点击文章的状态发射出去，用来查询文章的列表

  public flag='DRAFT'; //默认草稿是选中的状态

  public stateList; //状态总数列表

  constructor(public NavService:NavService) { }

  ngOnInit() {
    let data={}
    let url= "/article/getCountByState";
    this.stateList=this.NavService.queryTotalRow(url,data);
    console.log(this.stateList.data)

  }
  ngOnChanges(){
    // console.log(this.totalRow)
  }

  /**
   * 点击的时候获取文章的状态
   * @param state
   */
  articleState(state){
    this.flag=state;
    this.sendState.emit(state)
    // if(state=='AUDIT'){
    //   this.draftTotol=this.totalRow;
    // }else if(state=='AUDIT'){
    //   this.auditTotol=this.totalRow;
    // }else if(state=='REVISE'){
    //   this.reviseTotol=this.totalRow;
    // }else if(state=='NORMAL'){
    //   this.normalTotol=this.totalRow;
    // }else if(state=='DEL'){
    //   this.delTotol=this.totalRow;
    // }
  }

}
