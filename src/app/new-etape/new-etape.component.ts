import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CyberchamisService, Defi, Etape } from '../cyberchamis.service';

@Component({
  selector: 'app-new-etape',
  templateUrl: './new-etape.component.html',
  styleUrls: ['./new-etape.component.scss']
})
export class NewEtapeComponent implements OnInit {


  @Output() newEtape = new EventEmitter<Etape>();
  @Input() rang! : number;
  @Input() defi! : Defi;

  constructor(private ccService: CyberchamisService) { }

  ngOnInit(): void {
  }

  addNewEtape(etape : Etape){
    console.log("valider sur le composant new-etape");
    this.newEtape.emit(etape);
  }

}
