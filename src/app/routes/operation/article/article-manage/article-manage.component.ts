import {Component,OnInit} from '@angular/core';
@Component({
  selector: 'app-article-manage',
  templateUrl: './article-manage.component.html',
  styleUrls: ['./article-manage.component.scss']
})
export class ArticleManageComponent implements OnInit{

  private articleManAddbutton:Object;         //新增文章按钮
  private state                               //文章的状态
  private totalRow                            //文章各种状态的总条数
  public flag:boolean;                        //定义boolean值用来控制内容组件是否显示

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


  /**
   * 获取当前点击的状态
   * @param state
   */
  getState(state){
    this.state=state;
  }

  /**
   * 获取总数，进行传递
   * @param obj
   */
  getEmitTotalRow(obj){
    this.totalRow=obj;
  }


}
