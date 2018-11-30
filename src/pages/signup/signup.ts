import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/domain/user.service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required]],
     
      });
  }

  signupUser(){
    this.userService.create(this.formGroup.value)
      .subscribe(response => {
        this.showCreateOk();
      },
      error => {});
  }

  showCreateOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso.',
      enableBackdropDismiss: false,
      buttons:[
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present;
  }

}
