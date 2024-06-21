// Import required libraries and components
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
// import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton } from '@ionic/vue';

// Define the component metadata
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  // Initialize a list of restaurants

  restaurantList = [
    {
      name: 'KFC',
      slogan: "Well, it's finger lickin' good",
      rating: 4.3,
      distance: '5km',
      priceRange: 48.93,
      image: 'assets/Pictures/KFCLOGO.svg.png',
    },
    {
      name: 'Steers',
      slogan: 'Real food. Made Real Good',
      rating: 4.8,
      distance: '3km',
      priceRange: 54.9,
      image: '/assets/Pictures/STEERSLOGO.png',
    },
    {
      name: 'Debonairs',
      slogan: 'WHO WE ARE IS AMAZING.',
      rating: 3.8,
      distance: '2,1km',
      priceRange: 78.92,
      image: '/assets/Pictures/DEBONAIRSLOGO.png',
    },
    {
      name: 'Wimpy',
      slogan: 'We Love It When You Talk Local',
      rating: 4.1,
      distance: '1.9km',
      priceRange: 63.43,
      image: '/assets/Pictures/WIMPYLOGO.svg.png',
    },
  ];

  // Constructor for the HomePage class
  constructor() {}

  // Dismiss the modal if it is open
  dismissModal() {
    const modalElement = document.querySelector('ion-modal');
    if (modalElement) {
      modalElement.dismiss();
    }
  }

  // Add a featured restaurant to the cart
  addFeaturedToCart() {
    // Define the featured restaurant
    const featuredRestaurant = {
      name: 'Steers',
      slogan: 'Real food. Made real good.',
      rating: 4.5,
      distance: '1.2 km',
      priceRange: 54.9,
      image: '/assets/Pictures/STEERSLOGO.png',
    };

    // Call addToCart method with the featured restaurant as an argument
    this.addToCart(featuredRestaurant);
  }

  addToCart(restaurant: {
    name: string;
    slogan: string;
    rating: number;
    distance: string;
    priceRange: number;
    image: string;
  }) {
    // Retrieve the cart from local storage, or create an empty array if it doesn't exist
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');

    // Find the index of the restaurant in the cart, if it exists
    const itemIndex = cart.findIndex(
      (order: { restaurantName: string }) =>
        order.restaurantName === restaurant.name
    );

    // If the restaurant is not in the cart, add it with a quantity of 1
    if (itemIndex === -1) {
      cart.push({
        price: restaurant.priceRange,
        restaurantName: restaurant.name,
        restaurantImage: restaurant.image,
        quantity: 1,
      });
    } else {
      // If the restaurant is already in the cart, increment its quantity
      cart[itemIndex].quantity++;
    }
    // Save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
