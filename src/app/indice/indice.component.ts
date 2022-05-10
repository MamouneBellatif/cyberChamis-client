import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Defi, Etape, Indice, TypeEtape } from '../cyberchamis.service';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent implements OnInit {

  @Output() newIndice = new EventEmitter<Indice>();
  @Input() rang! : number;
  @Input() defi! : Defi;

  constructor() { }

  ngOnInit(): void {
  }

  addNewIndice(indice : Indice){
    if(indice.type_etape == TypeEtape.media){
      indice.label = "URL:" + indice.label;
    }
    indice.type_etape = TypeEtape.indice;
    this.newIndice.emit(indice);
  }
}
