import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DropzoneModule, DropzoneConfigInterface,
  DROPZONE_CONFIG
} from 'ngx-dropzone-wrapper';

//import { FlexLayoutModule } from '@angular/flex-layout';

import { IdeasPageComponent } from './ideas-page.component';
//import { DropzoneComponent } from './dropzone/dropzone.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { IdeaDetailsComponent } from './idea-details/idea-details.component'
  ;

// const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
//   // Change this to your upload POST address:
//   url: 'http://localhost:8080',
//   acceptedFiles: 'image/*',
//   createImageThumbnails: true,
//   // headers: { "Authorization": `Client-ID ${clientID}` }
// };

@NgModule( {
  declarations: [
    IdeasPageComponent,
    //DropzoneComponent,
    IdeaDetailsComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    DropzoneModule,
    QuillModule,
    PerfectScrollbarModule
    //FlexLayoutModule
  ],
  providers: [
    // {
    //   provide: DROPZONE_CONFIG,
    //   useValue: DEFAULT_DROPZONE_CONFIG
    // }
  ]
} )
export class IdeasPageModule { }
