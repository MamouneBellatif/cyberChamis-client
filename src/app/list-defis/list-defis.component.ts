import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Defi } from '../cyberchamis.service';
import { ListDefisService } from './list-defis.service';

@Component({
  selector: 'app-list-defis',
  templateUrl: './list-defis.component.html',
  styleUrls: ['./list-defis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDefisComponent implements OnInit {

  readonly listDefisObs!: Observable<Defi[]>;

  constructor(private ldService: ListDefisService) { 
    this.listDefisObs = ldService.getDefis();
  }

  ngOnInit(): void {
  }

  parsedDateToString(stringDate: string) : string {
    return new Date(stringDate).toLocaleString();
  }
}
