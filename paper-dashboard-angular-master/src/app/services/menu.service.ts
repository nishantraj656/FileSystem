import { Injectable } from '@angular/core';
import { MENU_ITEM } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Injectable()
export class menuService {

  constructor( private _router: Router) {
    this.getNodePath(MENU_ITEM);
  }
  id = 0;
  private parent_node = null;
  private node = null;
  private path_item = [];

  protected queryParentNode(json: any, node_id: any) {
    for (let i = 0; i < json.length; i++) {
      if (this.node)
        break;
      const object = json[i];
      if (!object || !object.path)
        continue;
      if (object.path === node_id) {
        this.node = object;
        break;
      } else {
        if (object.children) {
          this.parent_node = object;
          this.queryParentNode(object.children, node_id);
        } else {
          continue;
        }
      }
    }
    if (!this.node)
      this.parent_node = null;
    return {
      parent_node: this.parent_node,
      node: this.node
    };
  }

  protected creatRouterLink(nodeId: any) {
    this.node = null;
    this.parent_node = null;
    const menuObj = this.queryParentNode(MENU_ITEM, nodeId);
    if (menuObj.parent_node && menuObj.parent_node.path) {
      this.path_item.unshift(menuObj.parent_node.path);
      return this.creatRouterLink(menuObj.parent_node.path);
    } else {
      return this.path_item;
    }
  }

  protected getNodePath(json: any): void {
    json.forEach((index) => {
      index.trace = ++this.id;
      
      if (index.children) {
        //delete index.routerLink;
        this.getNodePath(index.children);
        index.toggle = true;
      } else {
        this.path_item = [index.path];
        index.routerLink = this.creatRouterLink(index.path);
        index.routerLink.unshift('/', 'pages');
      }
    })
  }

  public putSidebarJson() {
    return MENU_ITEM;
  }

  public selectItem(item,menu) {
    // item.forEach(element => {
    //   if (element.routerLink) {
    //     element.isActive = this._router.isActive(this._router.createUrlTree(element.routerLink), true);
    //     if (element.isActive)
    //       //this._globalService._isActived(element);
    //       this._globalService.dataBusChanged('isActived', element);
    //   } else if (element.children)
    //     this.selectItem(element.children);
    // });
    

      menu.forEach((index) => {
        if(index.children){
          //delete index.routerLink;
          this.selectItem(item,index.children);
          
        } 
      if(index.trace === item.trace)
          index.toggle = !index.toggle; 

      })
  }

}
