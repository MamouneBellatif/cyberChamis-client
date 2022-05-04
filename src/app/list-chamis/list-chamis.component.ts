import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Chami, Defi } from '../cyberchamis.service';
import { ListChamisService } from './list-chamis.service';

@Component({
  selector: 'app-list-chamis',
  templateUrl: './list-chamis.component.html',
  styleUrls: ['./list-chamis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListChamisComponent implements OnInit {

  listChamis!: Promise<Chami[]>;

  //listDefisObsParChamis: Observable<Defi[]>[] = [];

  constructor(private lcService: ListChamisService) {
    this.listChamis = lcService.getChamis();
  }


  ngOnInit(): void {
    // this.listChamisObs = this.lcService.getChamis();
    // this.httpClient.get(this.chamisListUrl);
  }

}
