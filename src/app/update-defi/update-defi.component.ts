import { Component, DefaultIterableDiffer, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Categorie,
  CyberchamisService,
  Defi,
  Etape,
} from '../cyberchamis.service';

@Component({
  selector: 'app-update-defi',
  templateUrl: './update-defi.component.html',
  styleUrls: ['./update-defi.component.scss'],
})
export class UpdateDefiComponent implements OnInit {
  defiId!: number;
  defi!: Defi;
  Categorie = Categorie;

  constructor(
    private ccService: CyberchamisService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.defiId = Number(this.route.snapshot.paramMap.get('defiId') || '');
    this.getDefiById(this.defiId).then((data) => (this.defi = data));
  }

  retour() {
    window.history.back();
    this.router.navigateByUrl('/');
  }

  getDefiById(defiId: number): Promise<Defi> {
    return this.ccService.getDefiById(defiId);
  }

  updateDefi(defi: Defi) {
    return this.ccService.updateDefi(defi.id, defi);
  }

  getCategorie() {
    return this.ccService.getCategorie();
  }

  getCategorieString(categorie: string) {
    if (categorie == 'SPORTIF') return Categorie.SPORTIF;
    if (categorie == 'CULTUREL') return Categorie.CULTUREL;
    if (categorie == 'ENIGME') return Categorie.ENIGME;
    else return Categorie.CULTUREL;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
