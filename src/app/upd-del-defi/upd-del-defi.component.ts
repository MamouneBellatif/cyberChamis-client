import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CyberchamisService, Defi } from '../cyberchamis.service';

@Component({
  selector: 'app-upd-del-defi',
  templateUrl: './upd-del-defi.component.html',
  styleUrls: ['./upd-del-defi.component.scss']
})
export class UpdDelDefiComponent implements OnInit {

  @Input() defi!: Defi;
  // @Output() evenement = new EventEmitter<"supression">();
  @Output() evenement = new EventEmitter<number>();

  constructor(public csService: CyberchamisService, public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param stringDate Un string représentant une date au format YYYY-MM-DDThh:mm:ss
   * @returns La date formattée selon la localisation de l'appareil
   */
  parsedDateToString(stringDate: string) : string {
    return new Date(stringDate).toLocaleString();
  }

  supprimerDefi(defi: Defi) {
    this.csService.deleteDefi(defi.id).then(()=>this.evenement.emit(defi.id));
  }

  rediriger() {
    this.router.navigateByUrl("modifierDefi/"+this.defi.id);
  }

  refresh() {
    window.location.reload();
  }

}
