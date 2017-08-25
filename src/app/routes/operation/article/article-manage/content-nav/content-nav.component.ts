import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-content-nav',
  templateUrl: './content-nav.component.html',
  styleUrls: ['./content-nav.component.scss']
})
export class ContentNavComponent implements OnInit,OnChanges {

  @Output()
  public sendState=new EventEmitter();//把当点击文章的状态发射出去，用来查询文章的列表

  // @Input()
  // public totalRow;//当前的文章的总共条数

  public draftTotol:number=0;//当前的草稿的总共条数
  public auditTotol:number=0;//当前的未审核的总共条数
  public reviseTotol:number=0;//当前的在审核的总共条数
  public normalTotol:number=0;//当前的正常的总共条数
  public delTotol:number=0;//当前的删除的总共条数

  public flag='DRAFT'; //默认草稿是选中的状态

  constructor() { }

  ngOnInit() {

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
