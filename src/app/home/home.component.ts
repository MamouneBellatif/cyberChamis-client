import { Component, Input, OnInit } from '@angular/core';
import { throws } from 'assert';
import { Subject } from 'rxjs';
import { Defi } from '../cyberchamis.service';
import { ListDefisService } from '../list-defis/list-defis.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // La liste des Defis à afficher
  listDefis!: Promise<Defi[]>;
  subj = new Subject<Defi[]>();
  taille!:number;
  currentSlide = 0;

  constructor(private ldService: ListDefisService, private eventService: NotificationService) { }
  
  ngOnInit(): void {
    this.init();
    this.subj.subscribe(data => this.taille=data.length);
    this.sub();
  }

  init() {
    this.ldService.getDefisObs().then(data => this.subj.next(data));
  }

  sub() {
    this.eventService.eventSource.onmessage = e => {
      this.init();
    }
  }  

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.taille - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.taille ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }

}
