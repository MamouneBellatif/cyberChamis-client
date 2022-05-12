import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { max } from 'rxjs';
import { CyberchamisService, Etape, Reponse, TypeEtape, Visite } from '../cyberchamis.service';

export interface DialogData {
  score: number;
  maxScore: number;
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  visiteId!:string;
  chamiId!:string;
  visite!: Visite;
  coutIndices: number = 0;
  reponses: Reponse[] = [];


  constructor(private route: ActivatedRoute, private router: Router, 
    public ccService: CyberchamisService, private dialog: MatDialog,    private snackBar: MatSnackBar
    ) { }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action);
    }

  saveReponse(rep: Partial<Reponse>){
    const iQ = this.reponses.reduce((i, reponse, irep) => {
      return reponse.question.id == rep.question?.id ? irep : i;
    }, -1)

    const reponse: Reponse = {
      type_reponse: rep.type_reponse!,
      valide: rep.valide!,
      value: rep.value!,
      question: rep.question!,
      visite: this.visite
    }

    if(iQ === -1){
      this.reponses.push(reponse)
      this.ccService.addReponse(this.visiteId, reponse).then(() => this.openSnackBar("Réponse ajoutée avec succès", "OK"));
    }
    else{
      this.reponses[iQ] = reponse;
    }
  }

  deduceIndice(cout: number){
    this.coutIndices -= cout;
  }

  ngOnInit(): void {
    this.visiteId = this.route.snapshot.paramMap.get('visiteId') || '';
    this.chamiId = this.route.snapshot.paramMap.get('chamiId') || '';
    this.ccService.getVisite(this.visiteId).then(visite => this.visite = visite);
  }

  retour(){
    // window.history.back();
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
      this.reponses.sort((a, b) => a.question.id-b.question.id);

      const score = this.reponses.reduce( (score, reponse, iR) => {
        return score += reponse.valide ? reponsesAttendues[iR].point : 0;
      }, 0) + this.coutIndices;

      //fin visite
      this.ccService.finVisite(this.visite)

      //Afficher fin 
      console.log(score + "/" + maxScore);
      this.openScoreDialog(score, maxScore);
    }
    else{
      console.log("questions: " + this.visite.defi.etape.length + ", reponses: "+ this.reponses.length);
      this.openUnansweredDialog();
    }
  }

  openScoreDialog(score: number, maxScore:number) {
    const dialogRef = this.dialog.open(DialogScoreComponent, {data: {score, maxScore}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openUnansweredDialog() {
    this.dialog.open(DialogUnansweredComponent);
  }

}

@Component({
  selector: 'dialog-score',
  templateUrl: 'dialog-score.component.html',
  styleUrls: ['./play.component.scss']
})
export class DialogScoreComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogScoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-unanswered',
  templateUrl: 'dialog-unanswered.component.html',
  styleUrls: ['./play.component.scss']
})
export class DialogUnansweredComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogUnansweredComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
