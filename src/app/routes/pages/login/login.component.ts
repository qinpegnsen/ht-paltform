import {Component, OnInit} from '@angular/core';
import '../../../../assets/login/js/supersized.3.2.7.min.js'
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {SettingsService} from '../../../core/settings/settings.service';
import {AjaxService} from '../../../core/services/ajax.service';
import {MaskService} from "app/core/services/mask.service";
import {menu} from "../../menu";
import {MenuService} from "../../../core/menu/menu.service";
import {CookieService} from "angular2-cookie/core";

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userName: string;
  public password: string;
  public authMsg: string;

  constructor(private ajax: AjaxService, private maskservice: MaskService,
              private localtion: Location, private router: Router, private _cookieService: CookieService,
              private setting:SettingsService,private myMenu:MenuService) {

  }

  ngOnInit() {
    //初始化界面
    setTimeout(() => {
      this.initSupersized();
    }, 200)
  }

  // 登录页效果渲染
  private initSupersized() {
    $.supersized({
      // Functionality
      slide_interval: 4000,    // Length between transitions
      transition: 1,    // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
      transition_speed: 1000,    // Speed of transition
      performance: 1,    // 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)

      // Size & Position
      min_width: 0,    // Min width allowed (in pixels)
      min_height: 0,    // Min height allowed (in pixels)
      vertical_center: 1,    // Vertically center background
      horizontal_center: 1,    // Horizontally center background
      fit_always: 0,    // Image will never exceed browser width or height (Ignores min. dimensions)
      fit_portrait: 1,    // Portrait images will not exceed browser height
      fit_landscape: 0,    // Landscape images will not exceed browser width

      // Components
      slide_links: 'blank',    // Individual links for each slide (Options: false, 'num', 'name', 'blank')
      slides: [    // Slideshow Images
        {image: '/assets/login/img/backgrounds/1.jpg'}
        // {image : '/assets/login/img/backgrounds/2.jpg'},
        // {image : '/assets/login/img/backgrounds/3.jpg'},
        // {image : '/assets/login/img/backgrounds/4.jpg'}
      ]
    });
  }

  // 用户登录
  public login() {
    let start = new Date().getTime(), end;
    let me = this;
    this.maskservice.showMask();
    me.ajax.post({
      url: '/login/login',
      data: {
        'account': me.userName,
        'pwd': me.password
      },
      success: (result) => {
        console.log(result);
        this.maskservice.hideMask();
        end = new Date().getTime();
        if (result.success) {
          let user =  result.data;
          // console.log("█ result.data.menuVOList ►►►",  result.data.menuVOList);
          // me.myMenu.addMenu(result.data.menuVOList);
          sessionStorage.setItem('loginInfo', user); //用户信息存入cookie
          me.setting.user.name = user.staffName,me.setting.user.job = user.mgrName; //修改user变量
          me.router.navigate(['/main/home'], {replaceUrl: true}); //路由跳转
        }
        else {
          console.log("█ result ►►►",  JSON.stringify(result));
        }
      },
      error: (result) => {
        this.maskservice.hideMask();
      }
    });
  }

}
