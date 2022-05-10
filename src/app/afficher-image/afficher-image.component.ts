import { Component, Input, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import firebase from 'firebase/compat/app'; 
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-afficher-image',
  templateUrl: './afficher-image.component.html',
  styleUrls: ['./afficher-image.component.scss']
})
export class AfficherImageComponent implements OnInit {

  @Input() path!: string;

  test='uploads/LMJ0twN8C3dwitTIHIarWaKV10F3/nhv6nry3uo';
  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

}
