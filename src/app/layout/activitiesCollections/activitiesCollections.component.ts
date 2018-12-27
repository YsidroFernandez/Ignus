import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';


const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-activitiesCollections',
  templateUrl: './activitiesCollections.component.html',
  styleUrls: ['./activitiesCollections.component.scss']
})
export class ActivitiesCollectionsComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  files:File[] = [];
  rol: number;
  actividades:string[]=["Actividad 1","Actividad 2","Actividad 3","Actividad 4"];

  recaudos:string[]=["Recaudo 1","Recaudo 2","Recaudo 3","Recaudo 4"];

  constructor() {
    this.rol = 1;
  }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };

  }

}
