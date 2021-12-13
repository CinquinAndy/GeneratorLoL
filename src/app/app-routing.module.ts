import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoLComponent} from "./lo-l/lo-l.component";

const routes: Routes = [
  {path: '', component: LoLComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
