import {Component,OnInit} from '@angular/core';
@Component({
  selector: 'app-article-manage',
  templateUrl: './article-manage.component.html',
  styleUrls: ['./article-manage.component.scss']
})
export class ArticleManageComponent implements OnInit{

  private articleManAddbutton:Object;//新增文章按钮

  private state//文章的状态

  private totalRow//文章各种状态的总条数

  private searchKey:string='';//默认查询的文章的名称,并且输入到内容组件，输入属性变化，子组件的钩子变化

  public flag:boolean;//定义boolean值用来控制内容组件是否显示

  constructor() {

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

  getState(state){
    this.state=state;
  }

  getEmitTotalRow(obj){
    this.totalRow=obj;
  }


}
