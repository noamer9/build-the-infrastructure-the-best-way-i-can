import { GlobalService } from './../../_services/global.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { User } from './../model/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { PasswordValidator } from '../validators/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  private subscription: Subscription;
  private subscription2: Subscription;
  public form: FormGroup;
  public newUser: User;
  private emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  userId = 0;
  editMode = false;
  constructor( private auth: AuthService, private router: Router, private route: ActivatedRoute, private global: GlobalService) {
    if (this.route.paramMap) {
      this.route.paramMap.subscribe( async paramsMap => {
        console.log(+paramsMap.get('userId'));
        this.userId = +paramsMap.get('userId');
        this.editMode = true;
      });
    }
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      'confirmPassword': new FormControl(null, [
                                         Validators.required,
                                         Validators.minLength(8),
                                         Validators.maxLength(12),
                                         PasswordValidator('password')
                                        ]),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(10)]),
    });

   }

  ngOnInit() {
    if (this.editMode) {
      this.subscription2 = this.global.userObservable.subscribe( (user: User) => {
        console.log(user);
        this.form.setValue({
          'email': user.email || '',
          'phone': user.phone || '',
          'password': '',
          'confirmPassword': ''
        });
      });

    }
  }


  async register(form: NgForm) {

    this.newUser = {
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone
    };

    if (this.userId === 0) {
      try {
        await this.auth.register(this.newUser);
        this.subscription = this.auth.userIdObservable.subscribe( res => {
          if (res) {
            this.router.navigate(['/auth', res]);

          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await this.auth.updateUser(this.newUser, this.userId);
        this.subscription = this.auth.userIdObservable.subscribe( (res: any) => {
          if (res) {
            console.log('res', res);
            this.router.navigate(['/auth', res]);

          }
        });
      } catch (error) {
        console.log(error);
      }
    }

  }

  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }

    if (this.subscription2 !== undefined) {
      this.subscription2.unsubscribe();
    }
  }
}
