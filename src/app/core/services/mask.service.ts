import {Injectable} from '@angular/core';
declare var $: any;

@Injectable()
export class MaskService {
  private template: string;

  constructor() {
    this.template = `
    <div id="Loading" style="position: fixed;z-index:999;top: 0;left:0;height:100%;width:100%;background-color:rgba(255,255,255,0.5);text-align:center;">
      <div style="display:inline-block;vertical-align: middle;height: 100%;width: 0;border: none;padding: 0;margin: 0;"></div>
      <div class="ball-scale-ripple-multiple" style="margin:0 auto;width:100px;display:inline-block; vertical-align: middle;">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>`;
  }

  public showMask(){
    if($("#Loading").length == 0){
      $(document).find("body").append(this.template);
    }else{
      $("#Loading").show();
    }
  }

  public hideMask(){
    $("#Loading").hide();
  }
}
