import { Component, OnInit } from '@angular/core';


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

export const MENU_ITEM = [
   
    {
        path: 'ui',
        title: 'C Drive',
        icon: 'nc-credit-card',
        children: [
            {
                path: 'grid',
                title: 'Bootstrap Grid',
                icon:'nc-paper'
            },
            {
                path: 'buttons',
                title: 'Buttons',
                icon:'nc-paper'
            },
            {
                path: 'notification',
                title: 'Notification',
                icon:'nc-paper'
            },
            {
                path: 'tabs',
                title: 'Tabs',
                icon:'nc-paper'
            },
            {
                path: 'file-tree',
                title: 'File Tree',
                icon:'nc-paper'
            },
            {
                path: 'modals',
                title: 'Modals',
                icon:'nc-paper'
            },
            {
                path: 'progress-bar',
                title: 'ProgressBar',
                icon:'nc-paper'
            },
            /*  {
                 path: 'loading',
                 title: 'Loading'
             }, */
        ]
    },
    {
        path: 'form',
        title: 'D Drive',
        icon: 'nc-credit-card',
        children: [
            {
                path: 'form-inputs',
                title: 'Form Inputs',
                icon:'nc-paper'
            },
            
            {
                icon: 'nc-credit-card',
                path: 'form-layouts',
                title: 'Form Layouts', children: [
                    {
                        path: 'form-inputs',
                        title: 'Form Inputs',
                        icon:'nc-paper'
                    },
                    {
                        path: 'form-layouts',
                        title: 'Form Layouts',
                        icon:'nc-paper'
                    },
                    {
                        path: 'file-upload',
                        title: 'File Upload',
                        icon:'nc-paper'
                    },
                    {
                        path: 'ng2-select',
                        title: 'Ng2-Select',
                        icon:'nc-paper'
                    }
                ]
            },
            {
                path: 'file-upload',
                title: 'File Upload',
                icon:'nc-paper'
            },
            {
                path: 'ng2-select',
                title: 'Ng2-Select',
                icon:'nc-paper'
            }
        ]
    },
    {
        path: 'charts',
        title: 'E Drive',
        icon: 'nc-credit-card',
        children: [
            {
                path: 'echarts',
                title: 'Echarts',
                icon:'nc-paper'
            }
        ]
    },
    {
        path: 'table',
        title: 'F Drive',
        icon: 'nc-credit-card',
        children: [
            {
                path: 'basic-tables',
                title: 'Basic Tables',
                icon:'nc-paper'
            },
            {
                path: 'data-table',
                title: 'Data Table',
                icon:'nc-paper'
            }
        ]
    },
    {
        path: 'menu-levels',
        title: 'G Drive',
        icon: 'nc-credit-card',
        children: [
            {
                icon:'nc-credit-card',
                path: 'levels1',
                title: 'Menu Level1',
                children: [
                    {
                        path: 'levels1-1',
                        title: 'Menu Level1-1',
                        icon:'nc-paper'
                    }
                ]
            },
            {
                path: 'levels2',
                title: 'Menu Level2',
                icon:'nc-paper'
            }
        ]
    },
];


@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = MENU_ITEM.filter(menuItem => menuItem);
    }
}
