import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Etape, Reponse, TypeEtape, TypeReponse } from '../cyberchamis.service';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.scss']
})
export class EtapeComponent implements OnInit {
  TypeEtape = TypeEtape;
  TypeReponse = TypeReponse;
  displayedTips: Partial<Etape>[] = []; 
  @Input() etape!: Etape;
  iTip:number = 0;
  nbTips:number = 0;
  repondu = false;
  @Output() reponse = new EventEmitter<Partial<Reponse>>();
  @Output() cout = new EventEmitter<number>()
  url: string;

  constructor() { 
    this.url = ""; 
  }

  displayTip(){
    if(this.etape.listeIndice){
      this.displayedTips.push(this.etape.listeIndice[this.iTip]);
      this.cout.emit(this.etape.listeIndice[this.iTip].cout)
      this.iTip++
    }
  }

  checkReponse(valReponse:string) {
    // let res: string;
    // if(valReponse == "") {
    //     res = this.url;
    //     console.log("MEDIAAAAAAAAAAAAAAAAAAA :"+res);
    // } else {
    //   res = valReponse;
    //   console.log("INPUUUUUUUUUUUUUUUT :"+res);
    // }
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

  isMedia(tip: string | undefined){
    return tip?.includes('URL');
  }

  parseUrl(label: string | undefined):string{
    return label?.replace('URL:','') || '';
  }

  urle(url: string) {
    console.log("TA MERE L'URL : "+url);
    this.url = url;
  }

}
