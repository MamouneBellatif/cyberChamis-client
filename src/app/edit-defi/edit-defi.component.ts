import { Component, Input, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { Chami, CyberchamisService, Defi } from '../cyberchamis.service';
import { ListChamisService } from '../list-chamis/list-chamis.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-edit-defi',
  templateUrl: './edit-defi.component.html',
  styleUrls: ['./edit-defi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDefiComponent implements OnInit {
  // @Input() chami!: Chami;
  chami!: Chami;

  // Liste des défis à afficher
  listDefisByChami!: Promise<Defi[]>;
  subj =new Subject<Defi[]>();


  // Le défi sélectionné
  public currentDefi: Defi | undefined;

  constructor(private lsSrvice: ListChamisService, private ccService: CyberchamisService, private nService: NotificationService) {}

  ngOnInit(): void {
    this.chami = this.ccService.currentChami;
    // this.listDefisByChami = this.getDefisByChami(this.chami.id);
    this.getDefisByChami(this.chami.id).then(data => this.subj.next(data));
    // this.listDefisByChami
    this.initialize();
  }

  initialize() {
    this.nService.eventSource.onmessage = e => {
      this.getDefisByChami(this.chami.id).then(data => {this.subj.next(data)});
    }
  }

  /**
   * Charge tous les défis créés par un Chami
   * @param id l'id du Chami
   * @returns La promesse de la liste des défis créés par ce Chami
   */
  async getDefisByChami(id: string): Promise<Defi[]> {
    return await this.lsSrvice.getDefis(id);
  }

  /**
   * Définit un défi comme étant sélectionné
   * @param defi le défi sélectionné
   */
  selectDefi(defi: Defi) {
    console.log("HELLO");
    this.currentDefi = defi;
  }

  updateDefi(defi: Defi): Promise<unknown> {
    console.log('updateDefi', defi);
    return this.ccService.updateDefi(
      defi.id,
      defi,
    );
  }

  deleteDefi(defi: Defi): Promise<unknown> {
    console.log('deleteDefi', defi);
    return this.ccService.deleteDefi(
      defi.id,
    );
  }

  maj(id: number){
    console.log("maj")
    this.getDefisByChami(this.chami.id).then(data => {this.subj.next(data)});
  }
}
