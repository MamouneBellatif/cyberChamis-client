import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Chami, Defi } from '../cyberchamis.service';
import { ListElementChamiService } from '../list-element-chami/list-element-chami.service';
import { NotificationService } from '../notification.service';
import { ListChamisService } from './list-chamis.service';

@Component({
  selector: 'app-list-chamis',
  templateUrl: './list-chamis.component.html',
  styleUrls: ['./list-chamis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListChamisComponent implements OnInit {

  // Chami sélectionné
  public currentChami: Chami| undefined;

  temp!: Defi[] | undefined;

  // Liste des chamis à afficher
  listChamis!: Promise<Chami[]>;
  chamiSubj = new Subject<Chami[]>();

  // Liste des défis à afficher
  listDefis!: Promise<Defi[]>;
  //listDefisObsParChamis: Observable<Defi[]>[] = [];

  constructor(private lcService: ListChamisService, private ldService: ListElementChamiService, private eventService: NotificationService) {
    this.listChamis = lcService.getChamis();
    this.listChamis.then(data => this.chamiSubj.next(data));
  }

  initialize() { //fonction qui recharge les chamis et défis
		this.eventService.eventSource.onmessage = e => {
			const msg = e.data;
      this.lcService.getChamis().then(data => {this.chamiSubj.next(data);
                          // console.log("data" +JSON.stringify(data));});
                          });
      console.log("nv chami");	
    };
  }

  ngOnInit(): void {
    this.initialize();
  }

  /**
   * Charge tous les défis crées par un Chami
   * @param id l'id du Chami
   * @returns La promesse de la liste des Defis créés par ce Chami
   */
   async getDefis(id: string): Promise<Defi[]>{
    return await this.lcService.getDefis(id);
  }

  /**
   * Définit un chami comme étant sélectionné
   */
   selectChami(chami: Chami) {
    this.currentChami = chami;
    // this.currentChami.defis = 

    this.getDefis(this.currentChami.id).then(data => {
      this.currentChami!.defis=data;
      // this.temp = this.currentChami?.defis;
      // data = this.temp || [];
    }
    );
  }
}
