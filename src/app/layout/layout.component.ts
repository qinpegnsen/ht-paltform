import {Component, OnInit} from "@angular/core";
import {NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private menuItems:any;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    submenus(menus){
      this.menuItems = menus;
    }


}
