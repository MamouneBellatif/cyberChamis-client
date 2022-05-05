import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Defi } from '../cyberchamis.service';

@Component({
  selector: 'app-defi',
  templateUrl: './defi.component.html',
  styleUrls: ['./defi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefiComponent implements OnInit {

  @Input() defi!: Defi;

  private etape1: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param stringDate Une string représentant une date au format YYYY-MM-DDThh:mm:ss
   * @returns La date formattée selon la localisation de l'appareil
   */
  parsedDateToString(stringDate: string) : string {
    return new Date(stringDate).toLocaleString();
  }

  set1erEtape(etape1: boolean) {
    this.etape1 = etape1;
  }

  get1erEtape() {
    return this.etape1;
  }
}
