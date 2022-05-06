import { Component, Input, OnInit } from '@angular/core';
import { Etape, TypeEtape } from '../cyberchamis.service';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.scss']
})
export class EtapeComponent implements OnInit {
  TypeEtape = TypeEtape;
  tipDisplayed: boolean = false;
  @Input() etape!: Etape;

  constructor() { }

  displayTip(){
    this.tipDisplayed = true;
  }
  ngOnInit(): void {
  }

}
