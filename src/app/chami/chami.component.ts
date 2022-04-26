import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Chami } from '../cyberchamis.service';

@Component({
  selector: 'app-chami',
  templateUrl: './chami.component.html',
  styleUrls: ['./chami.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChamiComponent implements OnInit {

  @Input() chami!: Chami;

  constructor() { }

  ngOnInit(): void {
  }

}
