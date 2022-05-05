import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { Defi, Etape } from '../cyberchamis.service';

@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefiComponent implements OnChanges {

  @Input() defi!: Defi;

  private etape1: boolean = false;

  numEtape: number = 0;

  etapesTmp: Etape[] = [];

  constructor() { }

  ngOnChanges(): void {
    this.numEtape = 0;
    this.etapesTmp = [];
  }

  /**
   * 
   * @param stringDate Une string représentant une date au format YYYY-MM-DDThh:mm:ss
   * @returns La date formattée selon la localisation de l'appareil
   */
  parsedDateToString(stringDate: string) : string {
    return new Date(stringDate).toLocaleString();
  }

  set1erEtape(etape1: boolean) {
    this.etape1 = etape1;
  }

  get1erEtape() {
    return this.etape1;
  }

  etapeSuivExists(): boolean {
    if(this.numEtape < this.defi.etape.length) {
      return true;
    }
    else return false;
  }

  nextEtape() {
    this.etapesTmp.push(this.defi.etape[this.numEtape]);
    this.numEtape++;
  }
}
