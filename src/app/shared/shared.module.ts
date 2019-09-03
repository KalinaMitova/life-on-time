import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import {
    DropzoneModule, DropzoneConfigInterface,
    DROPZONE_CONFIG
} from 'ngx-dropzone-wrapper';

//COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';
import { CustomizerComponent } from './customizer/customizer.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ModalCreateEditComponent } from './modal-create-edit/modal-create-edit.component';
import { ModalIdeaCreateEditComponent } from './modal-idea-create-edit/modal-idea-create-edit.component';

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarDirective } from './directives/sidebar.directive';
import { SidebarLinkDirective } from './directives/sidebarlink.directive';
import { SidebarListDirective } from './directives/sidebarlist.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebaranchortoggle.directive';
import { SidebarToggleDirective } from './directives/sidebartoggle.directive';
import { ConfirmEqualValidatorDirective } from './directives/confirm-equal-validator.directive';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: 'http://localhost:8080',
    acceptedFiles: 'image/*',
    createImageThumbnails: true,
    // headers: { "Authorization": `Client-ID ${clientID}` }
};


@NgModule( {
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CustomizerComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        ConfirmEqualValidatorDirective,
        SidebarDirective,
        NgbModule,
        TranslateModule,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        TranslateModule,
        PerfectScrollbarModule,
        DropzoneModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        SidebarLinkDirective,
        SidebarListDirective,
        SidebarAnchorToggleDirective,
        SidebarToggleDirective,
        ConfirmEqualValidatorDirective,
        CustomizerComponent,
        ModalConfirmComponent,
        ModalCreateEditComponent,
        ModalIdeaCreateEditComponent,
    ],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ],
    entryComponents: [
        ModalConfirmComponent,
        ModalCreateEditComponent,
        ModalIdeaCreateEditComponent, ]
} )
export class SharedModule { }
