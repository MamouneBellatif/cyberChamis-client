import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { getDownloadURL } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { Observable, finalize } from 'rxjs';
import { CyberchamisService } from './cyberchamis.service';

export class FileUpload{
  key!: string;
  name!: string;
  url!: string;
  file: File;
  constructor(file: File) {
    this.file=file;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {


  private basePath = '/uploads';

  constructor( private storage: AngularFireStorage, private ccService: CyberchamisService) { }


  getImage(ref: string){ //explose url
    // const storage = getStorage();
    let urlImage='';
    const storageRef = this.storage.ref(ref);
    storageRef.getDownloadURL().subscribe(data =>urlImage=data);
    return urlImage;
  }


  pushFileToStorage(fileUpload: FileUpload): string  {
    const chamiId = this.ccService.currentChami.id;
    const imgId = Math.random().toString(36).substring(2);
    // const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const filePath = `${this.basePath}/${chamiId}/${imgId}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    let urlFinal: string ='';
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          console.log("url final: "+urlFinal);
          fileUpload.name = fileUpload.file.name;
        });
      })
    ).subscribe();
    return filePath;
    // return fileUpload;
  }
  private saveFileData(fileUpload: FileUpload): void {
    // this.db.list(this.basePath).push(fileUpload);
    // console.log("file name"+ fileUpload.name);
    // console.log("file url"+ fileUpload.url)
  }
  // getFiles(numberItems: number): AngularFireList<FileUpload> {
  //   return this.db.list(this.basePath, ref =>
  //     ref.limitToLast(numberItems));
  // }
  deleteFile(fileUpload: FileUpload): void {
    // this.deleteFileDatabase(fileUpload.key)
    //   .then(() => {
    //     this.deleteFileStorage(fileUpload.name);
    //   })
    //   .catch(error => console.log(error));
  }
  // private deleteFileDatabase(key: string): Promise<void> {
  //   return this.db.list(this.basePath).remove(key);
  // }
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
