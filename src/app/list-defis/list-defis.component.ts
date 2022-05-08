import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { combineLatest, map, Observable, from, BehaviorSubject, Subject } from 'rxjs';
import { Chami, Defi } from '../cyberchamis.service';
import { NotificationService } from '../notification.service';
import { ListDefisService } from './list-defis.service';

@Component({
  selector: 'app-list-defis',
  templateUrl: './list-defis.component.html',
  styleUrls: ['./list-defis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDefisComponent implements OnInit {

  // Le Defi sélectionné
  public currentDefi: Defi | undefined;

  // La liste des Defis à afficher
  listDefis!: Promise<Defi[]>;
  subj = new Subject<Defi[]>();


  constructor(private ldService: ListDefisService, private eventService: NotificationService ) { 
    this.listDefis = ldService.getDefisObs();
    // this.listObs = from(this.listDefis);
    this.listDefis.then(data => this.subj.next(data))


    /*this.defisObs = combineLatest(
      [this.listDefisObs, this.currentDefiObs]
    ).pipe(
      map(
        ([defis, currentDefi]) => ({defis, currentDefi})
      )
    );*/
  }


  initialize() {
		// const eventSource = new EventSource('http://localhost:8080/notification');
		this.eventService.eventSource.onmessage = e => {
			const msg = e.data;
      this.ldService.getDefisObs().then(data => {this.subj.next(data);
                          });
      console.log("nv defis");	
    };
  }

  // firebase.auth().currentUser?.uid

  ngOnInit(): void {
    this.initialize();
  }

  /**
   * 
   * @param stringDate Une string représentant une date au format YYYY-MM-DDThh:mm:ss
   * @returns La date formattée selon la localisation de l'appareil
   */
  parsedDateToString(stringDate: string) : string {
    return new Date(stringDate).toLocaleString();
  }

  /**
   * Définit un défi comme étant sélectionné
   */
  selectDefi(defi: Defi) {
    this.currentDefi = defi;
  }
}

