import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Defi } from '../cyberchamis.service';
import { ListDefisService } from './list-defis.service';

@Component({
  selector: 'app-list-defis',
  templateUrl: './list-defis.component.html',
  styleUrls: ['./list-defis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDefisComponent implements OnInit {

  public currentDefi: Defi | undefined;

  readonly listDefisObs!: Observable<Defi[]>;
  readonly currentDefiObs!: Observable<Defi>;
  readonly defisObs!: Observable<{defis: readonly Defi[], currentDefi: Defi}>;

  constructor(private ldService: ListDefisService) { 
    this.listDefisObs = ldService.getDefisObs();
    this.defisObs = combineLatest(
      [this.listDefisObs, this.currentDefiObs]
    ).pipe(
      map(
        ([defis, currentDefi]) => ({defis, currentDefi})
      )
    );
  }

  ngOnInit(): void {
  }

  parsedDateToString(stringDate: string) : string {
    return new Date(stringDate).toLocaleString();
  }

  selectDefi(defi: Defi) {
    console.log("hello");
    this.currentDefi = defi;
  }
}
