import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';
import { Restaurant } from 'src/app/models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  banners = [  
    {banner: 'assets/imgs/3.jpg'},
    {banner: 'assets/imgs/2.jpg'},
    {banner: 'assets/imgs/1.jpg'}  
  ];
  
  restaurants: Restaurant[] = [
    {
      uid: '12wefdss',
      cover: 'assets/imgs/1.jpg',
      name: 'Jollof of Africa',
      short_name: 'Jollof of Africa',
      cuisines: [
        'African'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.38,
      price: 150
    },
    {
      uid: '12wefdefsdss',
      cover: 'assets/imgs/2.jpg',
      name: 'Spice - The Indian Kitchen',
      short_name: 'Spice - The Indian Kitchen',
      cuisines: [
        'Indian'
      ],
      rating: 4.0,
      delivery_time: 5,
      distance: 1.5,
      price: 100
    },
    {
      uid: '12wefdssrete',
      cover: 'assets/imgs/3.jpg',
      name: 'Boujee Shisanyama',
      short_name: 'Boujee Shisanyama',
      cuisines: [
        'African'
      ],
      rating: 4.7,
      delivery_time: 25,
      distance: 2.5,
      price: 110
    },
  ];

  allRestaurants: Restaurant[] = [
    {
      uid: '12wefdss',
      cover: 'assets/imgs/1.jpg',
      name: 'Jollof of Africa',
      short_name: 'Jollof of Africa',
      cuisines: [
        'African'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.38,
      price: 150
    },
    {
      uid: '12wefdefsdss',
      cover: 'assets/imgs/2.jpg',
      name: 'Spice - The Indian Kitchen',
      short_name: 'Spice - The Indian Kitchen',
      cuisines: [
        'Indian'
      ],
      rating: 4.0,
      delivery_time: 5,
      distance: 1.5,
      price: 100
    },
    {
      uid: '12wefdssrete',
      cover: 'assets/imgs/3.jpg',
      name: 'Boujee Shisanyama',
      short_name: 'Boujee Shisanyama',
      cuisines: [
        'African'
      ],
      rating: 4.7,
      delivery_time: 25,
      distance: 2.5,
      price: 110
    },
  ];

  restaurants1: Restaurant[] = [
    {
      uid: '12wefdss',
      cover: 'assets/imgs/1.jpg',
      name: 'Jollof of Africa',
      short_name: 'Jollof of Africa',
      address: 'Francis Baard Street',
      cuisines: [
        'African'
      ],
      rating: 5,
      delivery_time: 25,
      distance: 2.38,
      price: 150
    },
    {
      uid: '12wefdefsdss',
      cover: 'assets/imgs/2.jpg',
      name: 'Spice - The Indian Kitchen',
      short_name: 'Spice - The Indian Kitchen',
      cuisines: [
        'Indian'
      ],
      rating: 4.0,
      delivery_time: 5,
      address: 'Lynnwood Ridge',
      distance: 1.5,
      price: 100
    },
    {
      uid: '12wefdssrete',
      cover: 'assets/imgs/3.jpg',
      name: 'Boujee Shisanyama',
      short_name: 'Boujee Shisanyama',
      cuisines: [
        'African'
      ],
      rating: 4.7,
      delivery_time: 25,
      address: 'Arcadia Street, Hatfield',
      distance: 2.5,
      price: 110
    },
  ];
  
  categories: Category[] = [
    {
      id: "e0",
      name: "Indian",
      uid: "12wefdefsdss"
    },
    {
      id: "e00",
      name: "African",
      uid: "12wefdss"
    },
    {
      id: "e01",
      name: "African",
      uid: "12wefdssrete"
    },
    
    
  ]; 

  allItems: Item[] = [
    
    
    {
        category_id: "e0",
        cover: "assets/imgs/2.jpg",
        desc: "Great in taste",
        id: "i1",
        name: "Bunny Chow",
        price: 50,
        rating: 0,
        status: true,
        uid: "12wefdefsdss",
        variation: false,
        veg: false
    },
    {
      category_id: "e00",
      cover: "assets/imgs/1.jpg",
      desc: "Great in taste",
      id: "i1",
      name: "Jollof Rice",
      price: 75,
      rating: 0,
      status: true,
      uid: "12wefdss",
      variation: false,
      veg: false
  },
  {
    category_id: "e01",
    cover: "assets/imgs/3.jpg",
    desc: "Great in taste",
    id: "i1",
    name: "Shisanyama and Pap",
    price: 55,
    rating: 0,
    status: true,
    uid: "12wefdssrete",
    variation: false,
    veg: false
},
   
  ];

  addresses: Address[] = [     
    {
      address: "University of Pretoria", 
      house: "4th Floor", 
      id: "7Kox63KlggTvV7ebRKar", 
      landmark: "Informatorium", 
      lat: 26.1830738, 
      lng: 91.74049769999999, 
      title: "Work", 
      user_id: "1"},
    {address: "Department of Informatics", house: "5th Floor", id: "8Kox63KlggTvV7ebRKar", landmark: "University of Pretoria", lat: 26.1830738, lng: 91.74049769999999, title: "Home", user_id: "1"}
  ];

  orders: Order[] = [      
    {
      address: {address: "University of Pretoria, Infomatorium", house: "dsgd", id: "cLQdnS8YXk5HTDfM3UQC", landmark: "fdgs", lat: 26.108991978867923, lng: 91.79069981213378, title: "yui", user_id: "1" }, 
      deliveryCharge: 20,
      grandTotal: 200.00,
      id: "5aG0RsPuze8NX00B7uRP",
      order: [
        {category_id: "e0", cover: "assets/imgs/2.jpg", desc: "Great in taste", id: "i2", name: "Bunny Chow", price: 200, rating: 0, status: true, uid: "12wefdefsdss", variation: false, veg: true, quantity: 4},
      ],
      paid: "COD",  
      restaurant: 
     {
        uid: '12wefdefsdss',
        cover: 'assets/imgs/2.jpg',
        name: 'Spice - The Indian Kitchen',
        short_name: 'Spice - The Indian Kitchen',
        cuisines: [
          'Indian'
        ],
        rating: 4.0,
        delivery_time: 5,
        distance: 1.5,
        price: 100
      },
      restaurant_id: "12wefdefsdss",  
      status: "Delivered",
      time: "May 6, 2024 11:44 AM",
      total: 200.00,
      user_id: "1"
    },
   
  ];
  

  constructor() { }
}
