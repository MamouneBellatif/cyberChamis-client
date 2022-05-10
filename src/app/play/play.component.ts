import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CyberchamisService, Reponse, Visite } from '../cyberchamis.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  visiteId!:string;
  chamiId!:string;
  visite!: Visite;
  reponses: Reponse[] = [];


  constructor(private route: ActivatedRoute, private router: Router, public ccService: CyberchamisService) { }


  saveReponse(rep: Partial<Reponse>){
    const iQ = this.reponses.reduce((i, reponse, irep) => {
      return reponse.question_id == rep.question_id ? irep : i;
    }, -1)

    const reponse: Reponse = {
      type_reponse: rep.type_reponse!,
      valide: rep.valide!,
      value: rep.value!,
      question_id: rep.question_id!,
      visite_id: parseInt(this.visiteId)
    }

    if(iQ === -1){
      this.reponses.push(reponse)
    }
    else{
      this.reponses[iQ] = reponse;
    }
  }

  ngOnInit(): void {
    this.visiteId = this.route.snapshot.paramMap.get('visiteId') || '';
    this.chamiId = this.route.snapshot.paramMap.get('chamiId') || '';
    this.ccService.getVisite(this.visiteId).then(visite => this.visite = visite);
    
  }

  retour(){
    window.history.back();
    this.router.navigateByUrl("/");
  }

  fin(){
    //compile and display final score
    const maxScore: number = this.visite.defi.etape.reduce<number>((total, etape) => {
      return total += etape.point;
    }, 0)
    //const score: number = 
  }

  

} 
