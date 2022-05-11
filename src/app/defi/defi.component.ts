import { Component, ChangeDetectionStrategy, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Chami, CyberchamisService, Defi, Etape, Reponse, TypeEtape, Visite } from '../cyberchamis.service';

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
  @Output() indice = new EventEmitter<number>();

  private etape1: boolean = false;

  joueurs : Chami[] = [];
  
  numEtape: number = 0;

  etapesTmp: Etape[] = [];

  visiteCree : Boolean;

  // chami!:Chami;

  // constructor(public csService: CyberchamisService) { }
  constructor(public csService: CyberchamisService, private router: Router) {
    this.visiteCree = false;
   }

  ngOnChanges(): void {
    this.numEtape = 0;
    this.etapesTmp = [];
  }

  ngOnInit(): void {
    console.log("defi.component.ts: ngOnInit()");
    this.joueurs.push(this.csService.currentChami);
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

  newVisite(defi: Defi){
    this.csService.addVisiteComplete(this.joueurs, defi).then((visite) => {
      this.router.navigateByUrl("play/visite/"+visite.id+"/"+this.csService.currentChami.id);
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
    if(!this.etapesTmp[currEtapeId].listeIndice){
      this.etapesTmp[currEtapeId].listeIndice = [];
    }

    if(this.etapesTmp[currEtapeId].listeIndice!.length == 0){
      while(this.defi.etape[this.numEtape].type_etape === TypeEtape.indice){
        this.etapesTmp[currEtapeId].listeIndice?.push(this.defi.etape[this.numEtape]);
        this.numEtape++;
      }
    }else{
      while(this.defi.etape[this.numEtape].type_etape === TypeEtape.indice){
        this.numEtape++;
      }
    }
  }

  fin(){
    this.fini.emit(true);
  }

  ajouterChami(chami : Chami){
    let trouve = false;
    this.joueurs.forEach(j => {
      if(j.id == chami.id || j.login == chami.login){
        trouve = true;
      }
    })
    if(trouve == false){
      this.joueurs.push(chami);
    }
  }
}
