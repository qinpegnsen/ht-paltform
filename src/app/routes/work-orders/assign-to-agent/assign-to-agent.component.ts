import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from "@angular/core";
import {isNullOrUndefined, isUndefined} from "util";
import {SubmitService} from "../../../core/forms/submit.service";
declare var $: any;

@Component({
  selector: 'app-assign-to-agent',
  templateUrl: './assign-to-agent.component.html',
  styleUrls: ['./assign-to-agent.component.scss']
})
export class AssignToAgentComponent implements OnInit, OnChanges, OnDestroy {
  public showAssignWoWindow: boolean = false;
  public agentList: any;   //代理商列表
  public agentCode: any;      //代理商编码
  @Input('wono') wono: string;
  @Input('page') page: string;
  @Output() assignWo = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wono'] && !isNullOrUndefined(this.wono)) {
      console.log("█ ordno ►►►", this.wono);
      $('.wrapper > section').css('z-index', 200);
      this.showAssignWoWindow = true;
      this.getAgentList()
    }
  }

  ngOnDestroy(): void {
    $('.wrapper > section').css('z-index', 114);
  }

  constructor(public submit: SubmitService) {
  }

  ngOnInit() {

  }

  /**
   * 获取代理商列表
   */
  getAgentList(){
    let data = {
      agentName: '',
      state: 'NORMAL'
    }
    this.agentList = this.submit.getData('/agent/queryAgentNormal', data);
  }

  /**
   * 关闭组件
   * @param type true:表示操作成功，false表示取消操作
   */
  hideWindow(type?: boolean) {
    let me = this;
    $('.wrapper > section').css('z-index', 114);
    this.showAssignWoWindow = false;
    if (isUndefined(type)) type = false;
    this.assignWo.emit({
      type: type,
      page: me.page
    })// 向外传值
  }

  /**
   * 指派代理商
   */
  delivery() {
    let url = '/wo/addWoAgent';
    let data = {
      wono: this.wono,
      agentCode: this.agentCode
    }
    let result = this.submit.postRequest(url, data);
    if (isNullOrUndefined(result)) this.hideWindow(true);
  }


}
