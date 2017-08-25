import {Component, OnChanges, OnInit} from '@angular/core';
import {TableDateService} from "./table-date.service";

@Component({
  selector: 'app-article-manage',
  templateUrl: './article-manage.component.html',
  styleUrls: ['./article-manage.component.scss']
})
export class ArticleManageComponent implements OnInit,OnChanges{

  private articleManAddbutton:Object;//新增文章按钮

  private state//文章的状态

  private totalRow//文章的总条数，用来在导航处呈现

  public flag:boolean;//定义boolean值用来控制内容组件是否显示

  constructor(private TableDateService:TableDateService) {

  }

  /**linkType
   * 初始化
   * 1.给articleManButtonLists和articleManAddbutton赋值
   * 2.调用文章管理的接口
   * 3.button的回调方法
   */
  ngOnInit() {
    this.articleManAddbutton={
        text:"新增文章",
        title:"新增文章",
        type: "add"
      };
  }

  ngOnChanges(){
    /**
     * 获取子组件传递过来的文章的状态，作为中间人在传给content组件
     */

  }
  getState(state){
    this.state=state;
  }

  getTotalRow(totalRow){
    this.totalRow=totalRow;
  }

}
