import { Component } from '@angular/core';

import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token='';
  constructor(
    private usersService:UsersService


  ){}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
  createUser(){
    this.usersService.create({
      name: 'juan',
      email:'juan@gmail.com',
      password: '123456'
    }).subscribe(rta => {
      console.log(rta);
    });
  }


}
