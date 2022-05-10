import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CyberchamisService, Defi, Etape, TypeEtape, TypeReponse } from '../cyberchamis.service';

@Component({
  selector: 'app-new-etape',
  templateUrl: './new-etape.component.html',
  styleUrls: ['./new-etape.component.scss']
})
export class NewEtapeComponent implements OnInit {
  TypeReponse = TypeReponse;

  @Output() newEtape = new EventEmitter<Etape>();
  @Input() rang! : number;
  @Input() defi! : Defi;

  private estIndice : Boolean = false;

  constructor(private ccService: CyberchamisService) { }

  ngOnInit(): void {
  }

  addNewEtape(etape : Etape){
    console.log("valider sur le composant new-etape");
    if(this.estIndice){
      etape.type_etape = TypeEtape.indice;
      etape.label = "URL:" + etape.url;
    }
    this.newEtape.emit(etape);
  }

  setIndice(ok : boolean){
    this.estIndice = ok;
  }

  isIndice(){
    return this.estIndice;
  }

  // setUrl(url : string){
  //   this.
  // }

}
