import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chami',
  templateUrl: './chami.component.html',
  styleUrls: ['./chami.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChamiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
