import { Component, Input, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import firebase from 'firebase/compat/app'; 

@Component({
  selector: 'app-afficher-image',
  templateUrl: './afficher-image.component.html',
  styleUrls: ['./afficher-image.component.scss']
})
export class AfficherImageComponent implements OnInit {

  @Input() path!: string;

  test='uploads/lGeYVomWjSVotS1w4riM6CPaJmv1/b0fyjgack3m';
  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
    console.log("affichage de"+this.path);
  }

}
