import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  {path: 'play/visite/:visiteId/:chamiId', component: PlayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
