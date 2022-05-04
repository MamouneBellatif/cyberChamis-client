import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Chami, Defi } from '../cyberchamis.service';
import { ListElementChamiService } from './list-element-chami.service';

@Component({
  selector: 'app-list-element-chami',
  templateUrl: './list-element-chami.component.html',
  styleUrls: ['./list-element-chami.component.scss']
})
export class ListElementChamiComponent implements OnInit {
  @Input() chami!: Chami;

  defis!: Promise<Defi[]>;
  constructor(public lecService: ListElementChamiService) { }

  ngOnInit(): void {
    this.defis = this.lecService.getDefis(this.chami.login)
  }

}
