import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DropzoneModule, DropzoneConfigInterface,
  DROPZONE_CONFIG
} from 'ngx-dropzone-wrapper';

//import { FlexLayoutModule } from '@angular/flex-layout';

import { IdeasPageComponent } from './ideas-page.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { IdeaDetailsComponent } from './idea-details/idea-details.component'

const clientID = 'b0b2f9259cc3896';
const clientSecrete = 'c96a6a593a5132ebfe999243a1a141490e5ca34f';
const accessToken = '20011d8c7e6a5f1654514c77bfdba8cdbeb35885';
//const refreshToken = '715b5f0a3a920b2086ef5ed522ed002a6bebada2';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'http://localhost:8080',
  acceptedFiles: 'image/*',
  createImageThumbnails: true,
  headers: { "Authorization": `Client-ID ${clientID}` }
};

@NgModule( {
  declarations: [
    IdeasPageComponent,
    DropzoneComponent,
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
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
} )
export class IdeasPageModule { }
