// Import required libraries and components
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

// Define the component metadata
@Component({
  selector: 'app-account',
  templateUrl: './account-page.page.html',
  styleUrls: ['./account-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class AccountPage {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };
  pastTotal: number = 0;
  @ViewChild('getHelpModal', { static: true }) getHelpModal!: TemplateRef<any>;

  @ViewChild(IonModal) modal!: IonModal;
  pastOrders: any[] = [];

  // Lifecycle hook that runs before the view enters
  ionViewWillEnter() {
    this.loadPastOrders();
  }

  // Load past orders from localStorage
  loadPastOrders() {
    const paymentList = JSON.parse(localStorage.getItem('paymentList') ?? '[]');
    this.pastOrders = paymentList;
    this.pastTotal = this.getTotalPrice(); // Calculate the pastTotal using the getTotalPrice() function
  }

  // Calculate the total price of past orders
  getTotalPrice() {
    let sum = 0;
    for (let order of this.pastOrders) {
      sum += order.price * order.quantity;
    }
    return sum;
  }

  editUserDetailsForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.editUserDetailsForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.required],
    });
  }

  // Dismiss the modal
  dismissModal() {
    this.modal.dismiss(null, 'cancel');
  }

  // Close the modal
  closeModal() {
    this.modalController.dismiss(null, 'cancel');
  }

  // Update user details based on the form data
  updateUserDetails() {
    if (this.editUserDetailsForm.valid) {
      this.user.name = this.editUserDetailsForm.value.name;
      this.user.email = this.editUserDetailsForm.value.email;
      this.user.phone = this.editUserDetailsForm.value.phone;
    }
  }

  // Reorder the past orders
  reorder() {
    // Get the contents of the paymentList local storage
    const paymentList = JSON.parse(localStorage.getItem('paymentList') ?? '[]');
    const orders = paymentList;

    // Save the past orders to local storage
    localStorage.setItem('cart', JSON.stringify(orders));

    // Clear the paymentList after reordering
    localStorage.setItem('paymentList', JSON.stringify([]));

    // Navigate back to the cart page
    window.history.back();
  }
}
