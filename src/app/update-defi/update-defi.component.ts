import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-defi',
  templateUrl: './update-defi.component.html',
  styleUrls: ['./update-defi.component.scss'],
})
export class UpdateDefiComponent implements OnInit {
  defiId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.defiId = this.route.snapshot.paramMap.get('defiId') || '';
  }

  retour() {
    window.history.back();
  }
}
