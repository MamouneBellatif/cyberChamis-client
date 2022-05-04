import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Defi } from '../cyberchamis.service';
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
  //readonly currentDefiObs!: Observable<Defi>;
  //readonly defisObs!: Observable<{defis: readonly Defi[], currentDefi: Defi}>;

  constructor(private ldService: ListDefisService) { 
    this.listDefis = ldService.getDefisObs();
    /*this.defisObs = combineLatest(
      [this.listDefisObs, this.currentDefiObs]
    ).pipe(
      map(
        ([defis, currentDefi]) => ({defis, currentDefi})
      )
    );*/
  }

  ngOnInit(): void {
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
    //console.log("hello");
    this.currentDefi = defi;
  }
}

