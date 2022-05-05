import { Component, Input, OnInit } from '@angular/core';
import { Etape } from '../cyberchamis.service';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.scss']
})
export class EtapeComponent implements OnInit {

  @Input() etape!: Etape;

  constructor() { }

  ngOnInit(): void {
  }

}
