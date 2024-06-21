import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Hero } from '../shared/hero';
import { HeroService } from '../services/hero.service';
import { AppModule } from '../app.module';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, AppModule, CommonModule, RouterLink],
})
export class Tab1Page {
  Heroes: Observable<Hero[]>;
  constructor(private _toastController: ToastController, private _heroService: HeroService) {
    this.Heroes = this._heroService.getHeroes();
  }

  ngOnInit() {
  }

  refreshHeroes(event:any){
    this.Heroes = this._heroService.getHeroes();

    event.target.complete();

    
      const toast = this._toastController.create({
        message: "Heroes are refreshed",
        duration: 3000,
        position:"bottom"
      })

      toast.then((toastMessage) => {
        toastMessage.present();
      })
  }
}
