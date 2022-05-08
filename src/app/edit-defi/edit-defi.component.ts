import { Component, Input, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Chami, CyberchamisService, Defi } from '../cyberchamis.service';
import { ListChamisService } from '../list-chamis/list-chamis.service';

@Component({
  selector: 'app-edit-defi',
  templateUrl: './edit-defi.component.html',
  styleUrls: ['./edit-defi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDefiComponent implements OnInit {
  @Input() chami!: Chami;

  // Liste des défis à afficher
  listDefisByChami!: Promise<Defi[]>;

  // Le défi sélectionné
  public currentDefi: Defi | undefined;

  constructor(private lsSrvice: ListChamisService, private ccService: CyberchamisService) {}

  ngOnInit(): void {
    this.listDefisByChami = this.getDefisByChami(this.chami.id);
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
}
