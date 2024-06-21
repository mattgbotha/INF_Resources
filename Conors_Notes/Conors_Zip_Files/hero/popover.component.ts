import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  standalone: true,
  imports:[IonicModule]
})
export class PopoverComponent  implements OnInit {

  constructor(private route:Router, public popoverController: PopoverController) { }

  ngOnInit() {}

  displayMessage()
  {
    alert("Popover call successful")
    this.popoverController.dismiss()
    this.route.navigate([""])
  }

}
