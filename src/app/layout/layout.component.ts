import {Component, OnInit} from "@angular/core";
import {NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private menuItems:any;
  private path;

    constructor(private router: Router) {
      this.router.events
        .filter(event => event instanceof NavigationStart)
        .subscribe((event) => {
          this.path = event['url'];
        });

    }

    ngOnInit() {
    }

    submenus(menus){
      this.menuItems = menus;
    }

}
