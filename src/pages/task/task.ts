import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskService } from '../../services/domain/task.service';
import { TaskDTO } from '../../models/task.dto';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  items: TaskDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public taskService: TaskService
    ) {
  }

  ionViewDidLoad() {
    this.taskService.findAll()
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }
}