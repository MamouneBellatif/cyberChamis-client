import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CyberchamisService, Etape, Reponse, TypeEtape, Visite } from '../cyberchamis.service';

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

  fin(fini: boolean){
    const reponsesAttendues = this.visite.defi.etape.reduce((questions, etape) => {
      if(etape.type_etape === TypeEtape.question){
        questions.push(etape)
      }
      return questions
    }, [] as Etape[]);
    
    if(reponsesAttendues.length === this.reponses.length){ // on a une réponse à toutes les questions
      //compile and display final score
      const maxScore: number = reponsesAttendues.reduce<number>((total, etape) => {
        return total += etape.point;
      }, 0);

      reponsesAttendues.sort((a, b) => a.id-b.id); // devrait être inutile mais sait-on jamais
      this.reponses.sort((a, b) => a.question_id-b.question_id);

      const score = this.reponses.reduce( (score, reponse, iR) => {
        return score += reponse.valide ? reponsesAttendues[iR].point : 0;
      }, 0);

      //Afficher fin 
      console.log(score + "/" + maxScore)     
    }
    else{
      console.log("questions: " + this.visite.defi.etape.length + ", reponses: "+ this.reponses.length)
    }
  }

  

} 
