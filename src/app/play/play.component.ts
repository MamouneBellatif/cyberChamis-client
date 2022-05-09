import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CyberchamisService, Visite } from '../cyberchamis.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  visiteId!:string;
  chamiId!:string;
  visite!: Visite;


  constructor(private route: ActivatedRoute, private router: Router, public ccService: CyberchamisService) { }



  ngOnInit(): void {
    this.visiteId = this.route.snapshot.paramMap.get('visiteId') || '';
    this.chamiId = this.route.snapshot.paramMap.get('chamiId') || '';
    this.ccService.getVisite(this.visiteId).then(visite => this.visite = visite);
    
  }

  retour(){
    window.history.back();
    this.router.navigateByUrl("/");
  }

} 
