import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { UpdateDefiComponent } from './update-defi/update-defi.component';

const routes: Routes = [
  {path: 'play/visite/:visiteId/:chamiId', component: PlayComponent},
  {path: 'modifierDefi/:defiId', component: UpdateDefiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
