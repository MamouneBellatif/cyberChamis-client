import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ListDefis } from '../cyberchamis.service';

@Component({
  selector: 'app-list-defis',
  templateUrl: './list-defis.component.html',
  styleUrls: ['./list-defis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDefisComponent implements OnInit {

  constructor() { }

  readonly listDefisObs!: Observable<ListDefis>;

  ngOnInit(): void {
  }

}
