import {Component, OnDestroy, OnInit} from "@angular/core";
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public menuItems: any;
  public path;
  public routeChangeListener: any;

  constructor(private router: Router) {
    this.routeChangeListener = this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event) => {
        this.path = event['url'];
      });
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.routeChangeListener.unsubscribe();//当组件销毁时清除路由监听，否则会多次触发
  }

  submenus(menus) {
    this.menuItems = menus;
  }


}
