import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Chami, Defi } from '../cyberchamis.service';
import { ListElementChamiService } from '../list-element-chami/list-element-chami.service';
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

  // Liste des défis à afficher
  listDefis!: Promise<Defi[]>;
  //listDefisObsParChamis: Observable<Defi[]>[] = [];

  constructor(private lcService: ListChamisService, private ldService: ListElementChamiService) {
    this.listChamis = lcService.getChamis();
  }


  ngOnInit(): void {
    // this.listChamisObs = this.lcService.getChamis();
    // this.httpClient.get(this.chamisListUrl);
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
