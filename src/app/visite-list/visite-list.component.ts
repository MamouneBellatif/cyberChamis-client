import { Component, OnInit } from '@angular/core';
import { Categorie, Chami, CyberchamisService, Visite } from '../cyberchamis.service';
import {NotificationService} from '../notification.service';
import firebase from 'firebase/compat/app'; 
import { Subject } from 'rxjs';

@Component({
  selector: 'app-visite-list',
  templateUrl: './visite-list.component.html',
  styleUrls: ['./visite-list.component.scss']
})
export class VisiteListComponent implements OnInit {

  listVisites!: Promise<Visite[]>;
  subj = new Subject<Visite[]>();

  constructor(private csService: CyberchamisService, private eventService: NotificationService) { }

  ngOnInit(): void {
   
    this.listVisites = this.csService.getVisitesByChami(this.csService.currentChami.id);
  }


}
