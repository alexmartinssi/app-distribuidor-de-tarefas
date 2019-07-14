import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TaskService } from '../../services/domain/task.service';
import { TaskDTO } from '../../models/task.dto';

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  items: TaskDTO[] = [];
  page : number = 0;
  arrayItemsEmpty: boolean = false;
  borderColor: string;
  textColor: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public taskService: TaskService,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let loader = this.presentLoading();
    this.taskService.findAll(this.page)
      .subscribe(response => {
        this.items = this.items.concat(response['content']);
        loader.dismiss();
        if(this.items.length == 0){
          this.arrayItemsEmpty = true;
        }
      },
      error => {
        loader.dismiss();
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  changeStatus(task){
    let loader = this.presentLoading();
    if (task.status === 'Em Andamento') {
      task.status = 'Concluído';
    } else {
      task.status = 'Em Andamento';
    }
    console.log('task ', task);
    this.taskService.changeStatus(task)
      .subscribe(response => {
        loader.dismiss();
      },
      error => {
        loader.dismiss();
      });
  }

  changeStatusColor(status){
    let color;
    if(status == 'Em Andamento'){
      color = 'orange';
    }else{
      color = 'green';
    }
    return color;
  }
}