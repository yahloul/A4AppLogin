import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { DataService } from '../_services/data.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  users:Users[];

  constructor(
    private router:Router,
    private user:UserService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private dataServices:DataService,
  ) { }

  ngOnInit()  {
    console.log('gallery ngOnInit...');
    this.GetUsersFunction();
    // reset login status
    this.authenticationService.logout();
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  GetUsersFunction() {
    this.dataServices.getUsers().subscribe((Users) => {
      this.users = Users;

      // get all username 
      this.users.forEach(element => {
        // console.log(element.username);
      });
    });
  }


  RegisterUser(e){
    this.loading = true;
    // e.preventDefault();
    // var username = e.target.elements[0].value;
    // var password = e.target.elements[1].value;
    // console.log(username, password);
    // return false;
    // if (username == 'admin' && password == 'admin') {
    // this.user.setUserLoggedIn();
    //   this.router.navigate(['/dashboard'])
    // }

    
    this.dataServices.getUsers().subscribe((Users) => {
      this.users = Users;

      var hasMatch =false;
      
      for (var index = 0; index < this.users.length; ++index) {
      
       var dataUser = this.users[index];
      
       if(dataUser.username == this.model.username && dataUser.password == this.model.password){
          hasMatch = true;
          console.log('found it ....');
          this.user.setUserLoggedIn();
          this.router.navigate(['/dashboard']);
          break;
       }else {
          console.log('NOT found it !!!!');
          this.loading = false;
          break;
       }
      }

      // get all username 
      // this.users.forEach(element => {
      //   console.log(element.username);
      //   if (this.model.username == element.username && this.model.password == element.username) {
      //     // this.user.setUserLoggedIn();
      //     // this.router.navigate(['/dashboard'])
      //     console.log(element.username);
      //   }
      // });
    });
    this.authenticationService.loginUser(this.model.username, this.model.password)
    .subscribe(
        data => {
            // this.router.navigate([this.returnUrl]);
            console.log('Click Login Data....');
            console.log(this.router.navigate([this.returnUrl]));
        },
        error => {
            // this.alertService.error(error);
            console.log('Click Login Error....');
            console.log(this.alertService.error(error));
            this.loading = false;
        });
  }

}
interface adress{
  street: string,
  suite: string,
  city: string,
  zipcode: string,
}

interface Users{
  id: number,
  name: string,
  password: string,
  username: string,
  email: string,
  address: adress
}
    