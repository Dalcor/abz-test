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
  formErrors = {
    'name': ''
  }

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Firstname is must be at least 2 characters long.',
      'maxlength': 'Firstname cannot be more than 60 characters long.'
    }
  }

  newToken: string;
  modal: boolean = false;
  formData: FormData;
  signInForm: FormGroup;
  shown: boolean;
  isSet: boolean;
  registrationData: registrationInfo;
  c: any = null;
  photo: any;
  user: User;
  users: User[];
  currentPage: number;
  count: number = 6;
  showButton: boolean = true;
  positions: [
    {
      id: number;
      name: string;
    }
  ];
  submitted: boolean = false;
  errMess: string;

  constructor(private fb: FormBuilder,
    private usersService: UsersService) { 
      this.createForm();
    }

  ngOnInit(): void {
    this.currentPage = 1;
    this.usersService.getUsers(this.currentPage, this.count)
    .subscribe(data => {this.users = data.users;
      this.registrationData = data;});
    this.usersService.getPositions()
    .subscribe(pos => {this.positions = pos.positions;});
    
    this.isSet = true;
    this.shown = false;
    this.usersService.getToken().subscribe(data => {
      this.newToken = data.token;
    });
  }

  createForm() {
    this.signInForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(2)]],
      email: ['vitia2282@gmail.com', [Validators.required, Validators.email]],
      phone: ['+380935610488', [Validators.required, Validators.pattern]],
      position_id: ["1", [Validators.required]], 
      photo: [null, [Validators.required]] 
    });
  }

  get f() { return this.signInForm.controls; }
  // get f() { return this.signInForm.controls; }

  handleClickInput(event: any) {
    this.c = null;
  }

handleFileInput(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files && event.target.files[0]) {
      this.photo = event.target.files[0];
      this.signInForm.controls['photo'].setErrors(null);
      this.c = event.target.files[0].name;
    }

  if(event.target.files[0].size >= 5000000) {
      this.signInForm.controls['photo'].setErrors({'incorrect': true});
  } else {
    this.signInForm.controls['photo'].setErrors(null);

  }

  if(event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/jpg") {
      this.signInForm.controls['photo'].setErrors({'incorrect': true});
  } else {
    this.signInForm.controls['photo'].setErrors(null);
  }

}


  showMore(ev) {
    this.currentPage += 1;
    this.usersService.getUsers(this.currentPage, this.count)
    .subscribe(data => {
      this.users = [...this.users, ...data.users];
      if(this.currentPage == data.total_pages) {
        this.showButton = false;
      }
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.signInForm.invalid) {
      return;
    }


      const formData = new FormData();
      this.user = this.signInForm.value;
      formData.append('name', this.user.name);
      formData.append('phone', this.user.phone);
      formData.append('email', this.user.email);
      formData.append('position_id', this.user.position_id);
      formData.append('photo', this.photo);

        this.isSet = false;
        this.usersService.submitForm(formData, this.newToken)
        .subscribe(data => {
            if(data.success === true) {
              this.currentPage = 1;
              this.usersService.getUsers(this.currentPage, this.count)
              .subscribe(items => {
              this.users = items.users;
              this.modal = true;
            });
            }  
        });
        this.signInForm.reset({
          name: '',
          email: '',
          phone: '',
          position_id: '1',
          photo: null
        });
      }


      closeModal() {
        this.modal = false;
      }
}


