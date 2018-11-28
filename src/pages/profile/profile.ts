import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/domain/user.service';
import { UserDTO } from '../../models/user.dto';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: UserDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public userService: UserService) {
  }

  ionViewDidLoad() {
    let localUser =  this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.userService.findByEmail(localUser.email)
        .subscribe( response => {
          this.user = response;
        },
        error => {});
    }
  }

}
