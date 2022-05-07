import { Component, ChangeDetectionStrategy, Input, OnChanges, OnInit } from '@angular/core';
import { Chami, CyberchamisService, Defi, Etape } from '../cyberchamis.service';

@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefiComponent implements OnChanges, OnInit {

  @Input() defi!: Defi;

  private etape1: boolean = false;

  numEtape: number = 0;

  etapesTmp: Etape[] = [];

  // chami!:Chami;

  // constructor(public csService: CyberchamisService) { }
  constructor(public csService: CyberchamisService) { }

  ngOnChanges(): void {
    this.numEtape = 0;
    this.etapesTmp = [];
  }

  ngOnInit(): void {
    // this.csService.
  }

  /**
   * 
   * @param stringDate Une string représentant une date au format YYYY-MM-DDThh:mm:ss
   * @returns La date formattée selon la localisation de l'appareil
   */
  parsedDateToString(stringDate: string) : string {
    return new Date(stringDate).toLocaleString();
  }

  newVisite(defi: Defi, chami: Chami){
    console.log("new visite("+defi.id+","+chami.id+")");
    this.csService.addVisite(chami, defi, JSON.parse(localStorage.getItem("currentUserToken")||''));
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
