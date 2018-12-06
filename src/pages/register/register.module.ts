import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    RegisterPage,
    
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    IonicSelectableModule,
  ]
})
export class RegisterPageModule {}
