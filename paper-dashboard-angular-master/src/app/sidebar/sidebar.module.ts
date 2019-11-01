import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { MenuComponent } from 'app/shared/menu/menu.component';
import { menuService } from 'app/services/menu.service';
import { GetDirService } from 'app/get-dir.service';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarComponent,MenuComponent  ],
    exports: [ SidebarComponent],
    providers:[menuService,GetDirService]
})

export class SidebarModule {}
