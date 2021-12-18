import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  constructor(private _sidebarservice:SidebarService) {
    this.menuItems = _sidebarservice.menu;
    // console.log(this.menuItems);
   }

  ngOnInit(): void {
  }

}
