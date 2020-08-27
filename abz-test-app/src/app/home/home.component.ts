import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ControlContainer } from '@angular/forms';
import { registrationInfo } from '../../shared/registrationInfo';
import { UsersService } from 'src/services/users.service';
import { User } from '../../shared/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  signInForm: FormGroup;
  registrationInfo: registrationInfo;
  c: File = null;
  users: User[];
  
  constructor(private fb: FormBuilder,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers(1,6)
    .subscribe(data => {this.users = data.users;
      this.registrationInfo = data;});
    this.signInForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      position: 'front',
      photo: null
    });
  }

  handleFileInput(ev) {
    this.c = ev.target.value;
  }

  showMore() {
    this.usersService.getMoreUsers(registrationInfo.next_url)
    .subscribe(data => {this.users = data.users;
      console.log(this.users);});
  }

  onSubmit(){
    this.registrationInfo = this.signInForm.value;
    console.log(this.registrationInfo);
  }
}
