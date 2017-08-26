import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {TableDateService} from "./table-date.service";
import {ContentComponent} from "./content/content.component";

@Component({
  selector: 'app-article-manage',
  templateUrl: './article-manage.component.html',
  styleUrls: ['./article-manage.component.scss']
})
export class ArticleManageComponent implements OnInit,OnChanges{

  private articleManAddbutton:Object;//新增文章按钮

  private state//文章的状态

  private searchKey;//默认查询的文章的名称

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

  ngOnChanges(){
    /**
     * 获取子组件传递过来的文章的状态，作为中间人在传给content组件
     */

  }

  /**
   * 根据输入的文章名字查询文章,其实不用这个点击事件，输入属性变化自动刷新
   */
  queryArticList(){

  }
  getState(state){
    this.state=state;
  }


}
