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

  constructor() { }

  ngOnInit(): void {
  }

}
