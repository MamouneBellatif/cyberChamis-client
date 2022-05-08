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


  subj = new Subject<Visite[]>();

  constructor(private csService: CyberchamisService, private eventService: NotificationService) { }

  ngOnInit(): void {
    this.init_visites();
  }

  init_visites(){
    this.csService.getVisitesByChami(this.csService.currentChami.id).then(data => {this.subj.next(data);
      console.log("http visites: "+data);
    });
  }

  initialize_server_notif() {
		this.eventService.eventSource.onmessage = e => {
			const msg = e.data;
      this.init_visites();
    };
  }


  // isEnCours(visite: Visite):boolean{
  //   return visite.dateFin == null
  // }

}
