import { Component, ChangeDetectionStrategy, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chami, CyberchamisService, Defi, Etape, Reponse, TypeEtape } from '../cyberchamis.service';

@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefiComponent implements OnChanges, OnInit {

  @Input() defi!: Defi;
  @Input() jouer: boolean = false;
  @Output() reponse = new EventEmitter<Partial<Reponse>>();
  @Output() fini = new EventEmitter<boolean>();

  private etape1: boolean = false;

  numEtape: number = 0;

  etapesTmp: Etape[] = [];

  // chami!:Chami;

  // constructor(public csService: CyberchamisService) { }
  constructor(public csService: CyberchamisService, private router: Router) { }

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
    this.csService.addVisite(chami, defi).then((visite) => {
      this.router.navigateByUrl("play/visite/"+visite.id+"/"+chami.id);
    });
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

    // Insertion des indices dans l'étape qui les précède
    const currEtapeId: number = this.etapesTmp.length-1;
    if(!this.etapesTmp[currEtapeId].listIndice){
      this.etapesTmp[currEtapeId].listIndice = [];
    }
    while(this.defi.etape[this.numEtape].type_etape === TypeEtape.indice){
      this.etapesTmp[currEtapeId].listIndice?.push(this.defi.etape[this.numEtape]);
      this.numEtape++;
    }
  }

  fin(){
    this.fini.emit(true);
  }
}
