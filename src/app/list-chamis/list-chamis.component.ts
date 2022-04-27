import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Chami } from '../cyberchamis.service';

@Component({
  selector: 'app-list-chamis',
  templateUrl: './list-chamis.component.html',
  styleUrls: ['./list-chamis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListChamisComponent implements OnInit {

  constructor() { }

  readonly listChamisObs!: Observable<Chami[]>;

  ngOnInit(): void {
  }

}
