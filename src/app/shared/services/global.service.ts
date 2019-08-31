import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { UserService } from './user.service';

// declare global {
//   interface Window {
//     categories: Array<Category>;
//   }
// }

@Injectable( {
  providedIn: 'root'
} )

export class GlobalService {

  constructor ( private userService: UserService ) {
  }

  getCategory() {
    let userCategories;
    this.userService.getUserAvailableCategories()
      .subscribe( data => {
        userCategories = data
      }
      );
    return userCategories;
  }

}
