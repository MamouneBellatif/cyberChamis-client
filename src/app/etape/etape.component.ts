import { Component, Input, OnInit } from '@angular/core';
import { Etape, TypeEtape } from '../cyberchamis.service';

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

  constructor() { 
  }

  displayTip(){
    if(this.etape.listeIndice){
      this.displayedTips.push(this.etape.listeIndice[this.iTip]);
      this.iTip++
    }
  }

  ngOnInit(): void {
    if(this.etape.listeIndice)
      this.nbTips = this.etape.listeIndice.length;
  }

}
