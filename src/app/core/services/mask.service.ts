import {Injectable} from '@angular/core';
declare var $: any;

@Injectable()
export class MaskService {
  static template: string;
  static templateSimple: string;

  constructor() {
    const _this = this;
    //遮罩层的代码和样式
    MaskService.template = `
    <div id="loading" style="position: fixed;z-index:999;top: 0;left:0;height:100%;width:100%;background-color:rgba(255,255,255,0.5);text-align:center;">
      <div style="display:inline-block;vertical-align: middle;height: 100%;width: 0;border: none;padding: 0;margin: 0;"></div>
      <div class="ball-scale-ripple-multiple" style="margin:0 auto;width:100px;display:inline-block; vertical-align: middle;">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>`;

    //简易遮罩层的代码和样式
    MaskService.templateSimple = `
    <div id="simple_loading" style="position: fixed;z-index:999;top: 0;left:0;height:100%;width:100%;background-color:rgba(0,0,0,0.7);text-align:center;">
    </div>
    `;
  }

  /**
   * 显示遮罩层
   * @param id 遮罩层id
   */
  static showMask(id?: string, type?: boolean) {
    if (!id) id = "loading";
    if ($("#" + id).length == 0) {
      if (!type) $(document).find("body").append(this.template);
      else $(document).find("body").append(this.templateSimple);
    } else {
      $("#" + id).show();
    }
  }

  /**
   * 隐藏遮罩层
   * @param id 遮罩层id
   */
  static hideMask(id?: string) {
    if (!id) id = "loading";
    $("#" + id).hide();
  }

  /**
   * 显示简易遮罩层
   */
  static simpleShowMask() {
    MaskService.showMask("simple_loading", true);
  }

  /**
   * 隐藏简易遮罩层
   */
  static simpleHideMask() {
    MaskService.hideMask("simple_loading");
  }

}
