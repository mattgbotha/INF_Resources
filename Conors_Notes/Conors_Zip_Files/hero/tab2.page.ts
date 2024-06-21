import { Component } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent]
})
export class Tab2Page {

  constructor(private _popoverController: PopoverController) {}

  async onPopoverButtonClicked(clickEvent:any)
  {
      const _popover = await this._popoverController.create({
        event: clickEvent,
        component: PopoverComponent
      })

      await _popover.present()
      
    }
}
