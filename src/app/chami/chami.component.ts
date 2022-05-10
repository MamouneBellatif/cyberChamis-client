import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';
import { Chami, CyberchamisService, Defi } from '../cyberchamis.service';
import { ListElementChamiService } from '../list-element-chami/list-element-chami.service';

@Component({
  selector: 'app-chami',
  templateUrl: './chami.component.html',
  styleUrls: ['./chami.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChamiComponent implements OnInit {

  @Input() chami!: Chami;
  // Liste des promesses défis à afficher
  //listPromesseDefis!: Promise<Defi[]>;
  
  listDefis! : Defi[];

  constructor(private lcService: ListElementChamiService, private csService: CyberchamisService)  {
    // this.listPromesseDefis = lcService.getDefis(this.chami.login).then(val => this.listDefis=val);
    // lcService.getDefis(this.chami.login).then(val => this.listDefis=val);
  }


  ngOnInit(): void {
    this.getDefisByChamis();
  }

  /**
   * 
   * @param stringDate Une string représentant une date au format YYYY-MM-DDThh:mm:ss
   * @returns La date formattée selon la localisation de l'appareil
   */
  parsedDateToString(stringDate: string) : string {
    return new Date(stringDate).toLocaleString();
  }

  ngOnChanges(changes: SimpleChanges){
    // this.listDefis=[];
    console.log("current value : "+changes["chami"].currentValue.id);
    console.log("previous value : "+changes["chami"].previousValue);
    console.log("firstchange : "+changes["chami"].firstChange);
    this.lcService.getDefis(changes["chami"].currentValue.id).then(val => {console.log("defis promesse"+changes["chami"].currentValue.id);this.listDefis=val});
    this.getDefisByChamis();
  }

  getDefisByChamis() {
    this.lcService.getDefis(this.chami.id).then(val => {console.log("defis promesse"+val);this.listDefis=val});
  }

  /**
   * Charge tous les défis crées par un Chami
   * @param id l'id du Chami
   * @returns La promesse de la liste des Defis créés par ce Chami
   */
   async getDefis(id: string): Promise<Defi[]>{
    return await this.lcService.getDefis(id);

  }

}
