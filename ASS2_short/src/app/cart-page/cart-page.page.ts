// Import required libraries and components
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

// Define an interface for cart items
interface CartItem {
  restaurantName: string;
  slogan: string;
  dishPrice: number;
  quantity: number;
  restaurantImage: string;
}

// Define the component metadata
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.page.html',
  styleUrls: ['./cart-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CartPagePage {
  cart: any[] = [];
  pastOrders: any[] = [];
  deliveryFee: number = 5.0;
  deliveryInstructions: string = '';
  paymentMessage: string = 'Payment was successful';

  // Get a reference to the paymentSuccessModal element
  @ViewChild('paymentSuccessModal', { static: false })
  paymentSuccessModal!: IonModal;

  constructor() {}

  // Load the current order list from localStorage
  loadOrders() {
    this.cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
  }

  // Load past orders from localStorage
  loadPastOrders() {
    this.pastOrders = JSON.parse(localStorage.getItem('paymentList') ?? '[]');
  }

  // Lifecycle hook that runs before the view enters
  ionViewWillEnter() {
    this.loadOrders();
    this.loadPastOrders();
  }

  // Calculate the total cost of items in the cart
  total() {
    let sum = 0;
    for (let item of this.cart) {
      sum += item.price * item.quantity;
    }
    return sum + this.deliveryFee;
  }

  // Make a payment and update localStorage
  makePayment() {
    this.openModal(); // Open the payment success modal
    const newPaymentList = this.cart;
    localStorage.setItem('paymentList', JSON.stringify(newPaymentList));
    localStorage.setItem('cart', JSON.stringify([])); // Clear the orderList in localStorage
  }

  // Clear the cart and remove orderList from localStorage
  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  // Remove an item from the cart and update localStorage
  removeItem(item: CartItem) {
    const index = this.cart.indexOf(item);
    if (index > -1) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  // Open the payment success modal
  openModal() {
    this.paymentSuccessModal.present();
  }

  // Close the payment success modal
  closeModal(modal: IonModal) {
    modal.dismiss();
  }
}
