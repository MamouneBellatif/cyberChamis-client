import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Categorie, Chami, CyberchamisService, Defi } from '../cyberchamis.service';
import firebase from 'firebase/compat/app'; 


@Component({
  selector: 'app-new-defi',
  templateUrl: './new-defi.component.html',
  styleUrls: ['./new-defi.component.scss']
})
export class NewDefiComponent implements OnInit {
  Categorie = Categorie; // C'est la magie.
  @Input() chami!:Chami;

  // categorie: Categorie = Categorie.SPORTIF;

  Categorie = Categorie;

  // @Input() token!:string;
  constructor(private auth: AngularFireAuth,private ccService: CyberchamisService) { }
  ngOnInit(): void {
  }

  addDefi(defi: Defi) :Promise<unknown>{
    console.log('addDefi', defi);
    return this.ccService.addDefi(defi.id,defi,JSON.parse(localStorage.getItem("currentUserToken") || '{}'));
  }
    
}
