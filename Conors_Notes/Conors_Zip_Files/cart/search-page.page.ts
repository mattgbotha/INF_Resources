// Import required libraries and components
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from '../home/home.page';

// Define the component metadata
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [HomePage], // Provide HomePage as a dependency to use its methods
})
export class SearchPagePage implements OnInit {
  searchQuery = ''; // Initialize the search query
  searchResults: any[] = []; // Initialize an array to store search results

  // Constructor for the SearchPagePage class
  constructor(private homePage: HomePage) {}

  // ngOnInit lifecycle hook, which is called when the component is initialized
  ngOnInit() {}

  // Perform the search for restaurants based on the search query
  performSearch() {
    // If the search query is not empty
    if (this.searchQuery.length > 0) {
      // Filter the restaurant list from HomePage using the search query
      this.searchResults = this.homePage['restaurantList'].filter(
        (restaurant: any) =>
          restaurant.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          restaurant.rating.toString().includes(this.searchQuery)
      );
    } else {
      // If the search query is empty, clear the search results
      this.searchResults = [];
    }
  }

  // Add a restaurant to the cart by calling the addToCart method from HomePage
  addToCart(restaurant: any) {
    this.homePage['addToCart'](restaurant);
  }
}
