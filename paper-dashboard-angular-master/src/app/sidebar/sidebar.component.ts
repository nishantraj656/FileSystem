import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GetDirService } from 'app/get-dir.service';
import { element } from 'protractor';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;

}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/icons', title: 'Icons', icon: 'nc-diamond', class: '' },
    { path: '/maps', title: 'Maps', icon: 'nc-pin-3', class: '' },
    { path: '/notifications', title: 'Notifications', icon: 'nc-bell-55', class: '' },
    { path: '/user', title: 'User Profile', icon: 'nc-single-02', class: '' },
    { path: '/table', title: 'Table List', icon: 'nc-tile-56', class: '' },
    { path: '/typography', title: 'Typography', icon: 'nc-caps-small', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO', icon: 'nc-spaceship', class: 'active-pro' },
];

export const MENU_ITEM = [];


@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    splitArray = [];
    index = 0;
    childArray = [];
    nodes = [];
    constructor(private _getDir: GetDirService) { }

    ngOnInit() {
        this.menuItems = MENU_ITEM.filter(menuItem => menuItem);
        let objectArray = [];
        this._getDir.getDir("/").subscribe(
            data => {
                this.menuItems = this.nodeJS(data.data,0,"C:/");
            },
            error => {
                console.log("Eroor : ", error)
                alert("Error in Loading API Data.")
            }
        )
    }

    listClick(event) {
        this.index = 0;
        this.nodes = event.nodeID.split('-')
        console.log("Clicked", event)
        if (event.on) {
            this.childArray = [];
            this.menuItems = this.nodeSetChild(this.menuItems, this.nodes[++this.index]);
            // let nodes = Array.from(event.nodeID)

            // console.log("New ",this.menuItems);
            // console.log(this.nodes);
            console.log(event)
        }
        else {
            // no call
            console.log("Event....... ", event)
            this._getDir.getDir(event.path).subscribe(data => {
                console.log(data)
                this.childArray = this.nodeJS(data.data, event.nodeID, event.path + "/");
                // this.splitArray =event.path.split('/');

                this.menuItems = this.nodeSetChild(this.menuItems, this.nodes[++this.index]);
                // let nodes = Array.from(event.nodeID)
                // console.log("New ",this.menuItems);
                // console.log(nodes);
                // let index=0;
                // let l = nodes.length;

                // nodes.forEach(element=>{
                //     this.menuItems    
                // })
            }, error => {
                console.log("Eroor : ", error)
                alert("Error in Loading API Data.")
            })
        }
    }

    nodeSetChild(menuItems, match) {
        let temp = [];

        console.log("Matched : " + this.nodes.length + " " + this.index);
        menuItems.forEach(element => {
            let t = element.nodeID.split('-')
            if (t[this.index] == match) {
                console.log("Matched yes : ", element.on);
                if (this.index == this.nodes.length - 1)
                    element.on = !element.on
                console.log("Matched yes : ", element.on);
                if (this.childArray.length != 0 && this.index == this.nodes.length - 1)
                    element.children = this.childArray
                else
                    element.children = this.nodeSetChild(element.children, this.nodes[++this.index])
                console.log(element)
            }
            temp.push(element);
        });
        console.log("Matched : ", temp);
        return temp;
    }

    nodeJS(data, v, base) {
        let node = 1;
        let val = [];
        //    console.log("DATA ",data);

        if (data)
            data.forEach(element => {
                let temp = {
                    path: base + element.name + '/',
                    title: element.name,
                    icon: 'nc-paper',
                    on: false,
                    nodeID: v + '-' + (++node)
                };
                // console.log('Col : '+temp.nodeID,element)
                if (element.type == "folder") {
                    if (element.children.length)
                        temp["children"] = this.nodeJS(element.children, v, element.path + '/')
                    temp.icon = "nc-credit-card";
                }
                val.push(temp);
            });

        return val;
    }

    @Output('radioClicked') radioClickeds = new EventEmitter();
    @Output('fileNameClicked') fileNameClickeds = new EventEmitter();

    radioClicked(ev) {
        this.radioClickeds.emit(ev);
    }
    fileNameClicked(ev) {
        this.fileNameClickeds.emit(ev);
    }
}