import { Component, OnInit } from '@angular/core';
import { loginService } from 'src/service/login.service';
import { UserDto } from 'src/model/UserDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;

  constructor(private service : loginService, private router: Router ) { }

  ngOnInit() {

  }

  login(){
    let userDto = new UserDto();
    userDto.passWord = this.password;
    userDto.userName = this.username;
    this.service.login(userDto).subscribe(
      data => {
        if(data){
          sessionStorage.setItem('loggedIn', 'true');
          sessionStorage.setItem('user', userDto.userName);
          this.router.navigate(['']);
        } else {
          alert("Invalid username and/or password");
        }
      },
      error => {
        alert("Error connecting to database");
      }
    )
  }
}
