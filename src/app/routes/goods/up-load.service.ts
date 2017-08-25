import {Injectable} from "@angular/core";
import {AjaxService} from "../../core/services/ajax.service";
import {AppComponent} from "../../app.component";

@Injectable()
export class UpLoadService {

  constructor(public ajax: AjaxService) {
  }

  /**
   * 上传图片或文件
   * @param url
   * @param data
   */
  public uploadFile(url,data) {
    this.ajax.post({
      url: url,
      data: data,
      async: false,
      maskIcon: 'sk-circle12 sk-child',
      success: (res) => {
        if (!res.success) {
          AppComponent.rzhAlt("error", res.info,'');
        }
      },
      error: () => {
        AppComponent.rzhAlt("error", '图片上传连接失败','');
      }
    });
  }
}
