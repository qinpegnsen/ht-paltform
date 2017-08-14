import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private menuItems:any;

    constructor() { }

    ngOnInit() {
    }

    submenus(menus){
      this.menuItems = menus;
      console.log("█ menus ►►►",  menus);
    }

}
