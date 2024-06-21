// Import required libraries and components
import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

// Define the routes for the application
export const routes: Routes = [
  {
    path: 'tabs', // Route for the tabs component
    component: TabsPage,
    children: [
      // Define child routes for each tab
      {
        path: 'home', // Route for the home tab
        loadComponent: () =>
          // Lazy load the HomePage component when the route is accessed
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: '', // Default route when no specific path is given
        redirectTo: '/tabs/home', // Redirect to the home tab
        pathMatch: 'full',
      },
      {
        path: 'search', // Route for the search tab
        loadComponent: () =>
          // Lazy load the SearchPagePage component when the route is accessed
          import('../search-page/search-page.page').then(
            (m) => m.SearchPagePage
          ),
      },
      {
        path: 'cart', // Route for the cart tab
        loadComponent: () =>
          // Lazy load the CartPagePage component when the route is accessed
          import('../cart-page/cart-page.page').then((m) => m.CartPagePage),
      },
      {
        path: 'account', // Route for the account tab
        loadComponent: () =>
          // Lazy load the AccountPage component when the route is accessed
          import('../account-page/account-page.page').then(
            (m) => m.AccountPage
          ),
      },
    ],
  },
  {
    path: '', // Default route when no specific path is given
    redirectTo: '/tabs/home', // Redirect to the home tab
    pathMatch: 'full',
  },
];
