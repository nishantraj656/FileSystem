import { Component, Input, OnInit } from '@angular/core';
import { collapse } from './collapse-animate';
import { menuService } from 'app/services/menu.service';
// import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'du-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
   animations: [collapse]
})
export class MenuComponent implements OnInit   {
  @Input() menuInfo: any;
  show=false;
  constructor(private _menu:menuService) {

   }

   ngOnInit() 
   { 
    this._menu.putSidebarJson();
    //  console.log("VAlue of v : ",v);
   }
   
  private isToggleOn(item) {
    // menuItem.children && menuItem.toggle =='init'
   return item.children && item.toggle =='init'  ?  false :  true;
  }

  private _selectItem(item) {
    // //this._globalService._isActived(item);
    // this._globalService.dataBusChanged('isActived', item);
    this.show = !this.show;
    // this._menu.selectItem(item,this.menuInfo);

    console.log("Item click : ",item);
  }
}