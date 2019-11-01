import { Component, OnInit } from '@angular/core';
import { GetDirService } from 'app/get-dir.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;

}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

export const MENU_ITEM = [];


@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    constructor(private _getDir:GetDirService)
    {}
    
    ngOnInit() {
        this.menuItems = MENU_ITEM.filter(menuItem => menuItem);
        let objectArray=[];
        this._getDir.getDir().subscribe(
            data=>{
                console.log(data);
                this.menuItems = this.nodeJS(data.data,0);
                console.log(this.menuItems);
                },
            error=>{console.log("Eroor : ",error)
        alert("Error in Loading API Data.")}
        )
    }

    nodeJS(data,v)
    {
        let node =v;
        let val = [];
       console.log("DATA ",data);
       if(data)
        data.forEach(element => {
                let temp = {
                    path: 'grid',
                    title: element.name,
                    icon:'nc-paper',
                    on:false,
                    nodeID:(++node)
                };
                console.log('Col : '+temp.nodeID,element)
                if(element.type == "folder")
                {
                    if(element.children.length)
                    temp["children"] =this.nodeJS(element.children,node*10)
                    temp.icon = "nc-credit-card";
                }
                val.push(temp);
        });

        return val;
    }
}
