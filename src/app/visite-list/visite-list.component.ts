import { Component, OnInit } from '@angular/core';
import { Categorie, Chami, CyberchamisService, Visite, VisiteDTO } from '../cyberchamis.service';
import {NotificationService} from '../notification.service';
import firebase from 'firebase/compat/app'; 
import { Subject } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-visite-list',
  templateUrl: './visite-list.component.html',
  styleUrls: ['./visite-list.component.scss']
})
export class VisiteListComponent implements OnInit {


  subj = new Subject<Visite[]>();
  // subjDTO = new Subject<VisiteDTO[]>();
  
  constructor(private router: Router, public csService: CyberchamisService, private eventService: NotificationService) { }

  ngOnInit(): void {
    this.init_visites();
  }

  init_visites(){
    console.log("init_visite");
    this.csService.getVisitesByChami(this.csService.currentChami.id).then(data => {this.subj.next(data);
      console.log("http visites: "+data);
    });
    // this.csService.getVisitesDTOByChami(this.csService.currentChami.id).then(data => {this.subjDTO.next(data);
    //    console.log("http visites: "+data);
    // });
  }

  initialize_server_notif() {
		this.eventService.eventSource.onmessage = e => {
      
			const msg = e.data;
      this.init_visites();
    };
  }

  etatVisite(visite: Visite):string{
    if(visite.dateFin==null){
      return "en cours"
    }
    else{
      return "terminée";
    }
  }

  reprendreVisite(visiteId: number){
    this.router.navigateByUrl("play/visite/"+visiteId+"/"+this.csService.currentChami.id);
  }

  // isEnCours(visite: Visite):boolean{
  //   return visite.dateFin == null
  // }

}
