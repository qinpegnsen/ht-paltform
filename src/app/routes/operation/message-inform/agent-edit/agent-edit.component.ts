import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {isNullOrUndefined, isUndefined} from "util";
import {OperationService} from "../../operation.service";

declare var $: any;


@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.scss']
})
export class AgentEditComponent implements OnInit {

  public showDeliverWindow: boolean = false;
  public tplData: any;                                        //当前模板的数据
  @Input('type') type: string;                                //根据不同的类型呈现不同的内容
  @Input('tplCode') tplCode: string;
  @Input('page') page: string;                                 //刷新当前页码的内容，在发射出去的时候
  @Output() emitTplData = new EventEmitter();

  /**
   * 1.根据类型显示不同的内容
   * 2.如果模板的编码存在，获取当前load的信息
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && !isNullOrUndefined(this.type)) {
      $('.wrapper > section').css('z-index', 200);
      this.showDeliverWindow = true;
      if(changes['tplCode'] && !isNullOrUndefined(this.tplCode)){
        this.loadByTplCode()
      }
    }
  }

  /**
   * 组件销毁
   */
  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(public operationService:OperationService) {
  }

  ngOnInit() {}

  /**
   * 根据当前的编码查询信息
   */
  loadByTplCode(){
    let url='/notifyAgentTpl/loadByTplCode';
    let data={
      tplCode:this.tplCode,
    };
    this.tplData=this.operationService.linkGoods(url,data);
    console.log("█ this.tplData ►►►",  this.tplData);
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: boolean) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showDeliverWindow = false;
    if (isUndefined(type)) type = false;
    this.emitTplData.emit({
      page: me.page
    })// 向外传值
  }

  /**
   * 修改模板的内容
   */
  update() {
    let url = '/notifyAgentTpl/updateNotifyAdminTpl';
    let data = {
      id:this.tplData.id ,
      tplCode: this.tplData.tplCode,
      tplName: this.tplData.tplName,
      icon:this.tplData.icon,
      tpl: this.tplData.tpl,
      limitMenu:this.tplData.limitMenu,
      url: this.tplData.url,
      remark: this.tplData.remark,
    }
    let result = this.operationService.updateproblem(url, data);
    if (result=='成功修改管理员消息模板') {
      this.hideWindow(true)
    };
  }

  /**
   * 新增模板的内容
   */
  add(obj) {
    let url = '/notifyAgentTpl/addNotifyAgentTpl';
    let data = {
      tplCode: obj.tplCode,
      tplName: obj.tplName,
      icon:obj.icon,
      tpl: obj.tpl,
      limitMenu:obj.limitMenu,
      url: obj.url,
      remark: obj.remark,
    }
    let result = this.operationService.addproblem(url, data);
    console.log("█ result ►►►",  result);
    if (result=='成功添加管理员消息模板') this.hideWindow(true);
  }
}
