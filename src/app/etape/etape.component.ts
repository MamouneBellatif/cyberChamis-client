import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Etape, Reponse, TypeEtape } from '../cyberchamis.service';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.scss']
})
export class EtapeComponent implements OnInit {
  TypeEtape = TypeEtape;
  displayedTips: Partial<Etape>[] = []; 
  @Input() etape!: Etape;
  iTip:number = 0;
  nbTips:number = 0;
  repondu = false;
  @Output() reponse = new EventEmitter<Partial<Reponse>>();
  @Output() cout = new EventEmitter<number>()

  constructor() { 
  }

  displayTip(){
    if(this.etape.listeIndice){
      this.displayedTips.push(this.etape.listeIndice[this.iTip]);
      this.cout.emit(this.etape.listeIndice[this.iTip].cout)
      this.iTip++
    }
  }

  checkReponse(valReponse:string){
    this.reponse.emit({
      type_reponse: this.etape.typeReponseAttendu,
      valide: valReponse === this.etape.reponseAttendu,
      value:valReponse,
      question: this.etape
    })
  }

  ngOnInit(): void {
    if(this.etape.listeIndice)
      this.nbTips = this.etape.listeIndice.length;
  }

}
