import { Component, OnInit } from '@angular/core';
import {PageEvent} from "../../../../shared/directives/ng2-datatable/DataTable";
import {TableDateService} from "./table-date.service";

@Component({
  selector: 'app-article-manage',
  templateUrl: './article-manage.component.html',
  styleUrls: ['./article-manage.component.scss']
})
export class ArticleManageComponent implements OnInit {
  private articleButtonLists:Object;//文章管理的列表操作按钮数组
  private articleAddbutton:Object;//新增文章按钮
  private articleListdata:Object;//用来存储服务取回来的数据

  constructor(private TableDateService:TableDateService) {

  }

  ngOnInit() {

    this.articleButtonLists= [
      {
        text:"编辑",
        title:"编辑",
        type: "update",
        callback:function(result){
          result.then((id)=>{
            alert(id);
          })
        }
      },
      {
        title:"删除",
        type: "delete",
        callback:this.delete
      },
      {
        title:"下级",
        type: "details",
        callback:this.details
      },
    ];

    this.articleAddbutton={
        text:"新增文章",
        title:"新增文章",
        type: "add"
      };
    this.queryArticleList()
  }

  /**
   * 添加回调方法
   * @param result  promise对象，回传id
   */

  private delete(){
    alert("delete");
  }
  private details(){
    alert("details");
  }

  public queryArticleList(event?:PageEvent) {
    let data={
      curPage:1,
      pageSize:6
    }
    let dataData=this.TableDateService.queryData(data,event)
    this.articleListdata=dataData;
  }

}
