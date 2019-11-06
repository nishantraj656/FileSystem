import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
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
  @Output() listClick = new EventEmitter<any>()
  
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
    console.log("Clickehhfhgd")
    this.listClick.emit(item);
    
  }

  

  
}