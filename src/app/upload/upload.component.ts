import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FileUpload, UploadService } from '../upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  // ref!: AngularFireStorageReference;
  // task!: AngularFireUploadTask;
  // constructor(private afStorage: AngularFireStorage) { }

  // ngOnInit(): void {
  // }

  // upload(event: Event) {
  //   const id = Math.random().toString(36).substring(2);
  //     this.ref = this.afStorage.ref("image.png");
  //       this.task = this.ref.put((<HTMLInputElement>event?.target)?.files?[0]: null);
    
  // }

  @Output() urlFichier = new EventEmitter<string>();

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  constructor(public uploadService: UploadService) { }

  ngOnInit(): void { }
  
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        // this.setUrl(this.uploadService.pushFileToStorage(this.currentFileUpload));
        this.setUrl(this.uploadService.pushFileToStorage(this.currentFileUpload));
      }
    }
  }

  setUrl(url : string){
    this.urlFichier.emit(url);
  }
}
