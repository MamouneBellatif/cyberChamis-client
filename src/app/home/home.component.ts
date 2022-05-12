import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throws } from 'assert';
import { getDownloadURL } from 'firebase/storage';
import { Subject } from 'rxjs';
import { Chami, CyberchamisService, Defi } from '../cyberchamis.service';
import { ListDefisService } from '../list-defis/list-defis.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() jouer: boolean = false;
  // La liste des Defis à afficher
  listDefis!: Promise<Defi[]>;
  subj = new Subject<Defi[]>();
  joueurs : Chami[] = [];
  taille!:number;
  currentSlide = 0;
  visiteCree : Boolean;

  constructor(public csService: CyberchamisService, private router: Router, private ldService: ListDefisService, private eventService: NotificationService) {
    this.visiteCree = false;
  }
  
  ngOnInit(): void {
    this.init();
    this.subj.subscribe(data => this.taille=data.length);
    this.sub();
  }

  init() {
    this.ldService.getDefisObs().then(data => this.subj.next(data));
  }

  newVisite(defi: Defi){
    this.csService.addVisiteComplete(this.joueurs, defi).then((visite) => {
      this.router.navigateByUrl("play/visite/"+visite.id+"/"+this.csService.currentChami.id);
    });
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
