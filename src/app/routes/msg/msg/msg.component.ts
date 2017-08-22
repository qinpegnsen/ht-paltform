import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit} from "@angular/core";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {AppComponent} from "../../../app.component";
import {PopupComponent} from "app/routes/operationpage/popup/popup.component";
import {Router} from "@angular/router";
const swal = require('sweetalert');

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {
  toasterconfig: ToasterConfig = new ToasterConfig({  //初始化信息提示配置
    positionClass: 'toast-bottom-right', //提示位置
    showCloseButton: true //显示关闭按钮
  });
  componentRef: ComponentRef<PopupComponent>;

  constructor(public toasterService: ToasterService,private router: Router,  private app: AppComponent, private resolver: ComponentFactoryResolver) {
  }

  /**
   * 当路由变化时会销毁组件
   */
/*  ngOnDestroy() {
    this.componentRef.destroy()
  }*/

  ngOnInit() {

  }

  /**
   * 显示窗口组件
   */
  showPopup(){
    let _this = this;
    _this.app.container.clear();// 先清空容器，每次我们需要创建组件时，我们需要删除之前的视图，否则组件容器中会出现多个视图 (如果允许多个组件的话，就不需要执行清除操作 )。
    const factory: ComponentFactory<PopupComponent> = _this.resolver.resolveComponentFactory(PopupComponent);// PopupComponent是自己创建的弹窗组件
    _this.componentRef = _this.app.container.createComponent(factory);// 调用容器的 createComponent() 方法，该方法内部将调用 ComponentFactory 实例的 create() 方法创建对应的组件，并将组件添加到我们的容器。
    this.componentRef.instance.val = {a:1};// 定义向子组件输入的值
    this.componentRef.instance.output.subscribe(event => console.log(event));// 订阅动态组件的输出值
  }




  /************************************************弹框提醒 begin *************************************************************************/
  //成功提示框
  dialogSuccess() {
    swal('成功提醒', '成功，状态：success', 'success');
  }

  //失败提示框
  dialogError() {
    swal('失败提醒', '失败，状态：error', 'error');
  }

  //警示提示框
  dialogWarning() {
    swal('警告提醒', '警告，状态：warning', 'warning');
  }

  //信息提示框
  dialogInfo() {
    swal('信息提醒', '信息，状态：info', 'info');
  }

  //自动关闭 提示框
  dialogAutomaticClose() {
    swal({
      title: '自动关闭',
      text: '三秒后自动关闭',
      type: 'info',
      timer: 3000, //关闭时间，单位：毫秒
      showConfirmButton: false  //不显示按钮
    });
  }

  //自定义html 提示框
  dialogAutomaticHtml() {
    swal({
      title: '我是 <small>头部</small>!',
      text: '我是<font color="red">小红</font>，我是<font color="green">小绿</font>',
      html: true
    });
  }

  //自定义html2 提示框
  dialogAutomaticHtml2() {
    swal({
      title: '<h3><i class="fa fa-check-circle text-success mr"></i>这是一个完美的成功提示信息...</h3>',
      timer: 2000, //关闭时间，单位：毫秒
      html: true,
      animation: 'slide-from-top',
      showConfirmButton: false  //不显示按钮
    });
  }

  //自定义按钮 提示框
  dialogAutomaticBtn() {
    swal({
        title: '自定义按钮',
        type: 'success',
        text: '自定义 ‘确认’ 和 ‘取消’ 按钮',
        confirmButtonText: '确认', //‘确认’按钮命名
        showCancelButton: true, //显示‘取消’按钮
        cancelButtonText: '取消', //‘取消’按钮命名
        closeOnConfirm: false  //点击‘确认’后，执行另外一个提示框
      },
      function () {  //点击‘确认’时执行
        swal({
          title: '你点击了确认！',
          type: 'info',
          timer: 1500, //关闭时间，单位：毫秒
          showConfirmButton: false  //不显示按钮
        });
      }
    );
  }

  //自定义图片 提示框
  dialogAutomaticImg() {
    swal({
      title: '自定义图片',
      text: '自定义一张图片',
      imageUrl: 'assets/img/user/01.jpg'
    });
  }

  //进入方式 顶部
  dialogTop() {
    swal({
      title: '进入方式',
      text: '我从<font color="green"> 顶部 </font>来',
      html: true,
      animation: 'slide-from-top'
    });
  }

  //进入方式 底部
  dialogBottom() {
    swal({
      title: '进入方式',
      text: '我从<font color="green"> 底部 </font>来',
      html: true,
      animation: 'slide-from-bottom'
    });
  }

  /************************************************弹框提醒 end ***************************************************************************/
  //成功消息
  msgSuccess() {
    this.toasterService.pop("success", "成功提示", "成功消息，类型：succes");
  }

  //失败消息
  msgError() {
    this.toasterService.pop("error", "失败提示", "失败消息，类型：error");
  }

  //警示消息
  msgWarning() {
    this.toasterService.pop("warning", "警示提示", "警示消息，类型：warning");
  }

  //信息消息
  msgInfo() {
    this.toasterService.pop("info", "信息提示", "信息消息，类型：info");
  }

  //执行中消息
  msgWait() {
    this.toasterService.pop("wait", "执行中提示", "执行中消息，类型：wait");
  }

  //上中 消息
  msgTopCenter() {
    this.toasterconfig['positionClass'] = "toast-top-center";
    this.toasterService.pop("success", "成功提示", "成功消息，类型：success");
  }

  //上左 消息
  msgTopLeft() {
    this.toasterconfig['positionClass'] = "toast-top-left";
    this.toasterService.pop("success", "成功提示", "成功消息，类型：success");
  }

  //上右 消息
  msgTopRight() {
    this.toasterconfig['positionClass'] = "toast-top-right";
    this.toasterService.pop("success", "成功提示", "成功消息，类型：success");
  }

  //下中 消息
  msgBottomCenter() {
    this.toasterconfig['positionClass'] = "toast-bottom-center";
    this.toasterService.pop("success", "成功提示", "成功消息，类型：success");
  }

  //上左 消息
  msgBottomLeft() {
    this.toasterconfig['positionClass'] = "toast-bottom-left";
    this.toasterService.pop("success", "成功提示", "成功消息，类型：success");
  }

  //上右 消息
  msgBottomRight() {
    this.toasterconfig['positionClass'] = "toast-bottom-right";
    this.toasterService.pop("success", "成功提示", "成功消息，类型：success");
  }
}
