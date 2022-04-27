import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Chami } from '../cyberchamis.service';
import { ListChamisService } from './list-chamis.service';

@Component({
  selector: 'app-list-chamis',
  templateUrl: './list-chamis.component.html',
  styleUrls: ['./list-chamis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListChamisComponent implements OnInit {

  readonly listChamisObs!: Observable<Chami[]>;

  constructor(private lcService: ListChamisService) {
    this.listChamisObs = lcService.getChamis();
  }

  ngOnInit(): void {
    // this.listChamisObs = this.lcService.getChamis();
    // this.httpClient.get(this.chamisListUrl);
  }

}
