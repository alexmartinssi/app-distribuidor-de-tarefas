import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskDTO } from '../../models/task.dto';
import { RegisterService } from '../../services/domain/register.service';
import { TaskService } from '../../services/domain/task.service';
import { UserService } from '../../services/domain/user.service';
import { UserDTO } from '../../models/user.dto';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  formGroup: FormGroup;
  users : UserDTO[] = [];
  tasks : TaskDTO[] = [];
  showUserList: boolean = false;
  searchQuery: string = '';
  user = null;
  selectedUsers = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public registerService: RegisterService,
    public userService: UserService,
    public taskService: TaskService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        initialDate: ['', [Validators.required]],
        finalDate: ['', [Validators.required]],
        reward: ['', [Validators.required]],
        users: ['', [Validators.required]]
      });
      this.getAllUsers();
  }

  getAllUsers() {
    this.userService.findAll()
      .subscribe(response => {
        this.users = response;
      },
      error => {});
  }

  insertRegister(){
    console.log(this.formGroup.value);
    this.registerService.create(this.formGroup.value)
      .subscribe(response => {
        this.showCreateOk();
      },
      error => {});
  }

  showCreateOk(){
    let alert = this.alertCtrl.create({
      message: 'Cadastro efetuado com sucesso.',
      enableBackdropDismiss: false,
      buttons:[
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('TaskPage');
          }
        }
      ]
    });
    alert.present();
  }

}
