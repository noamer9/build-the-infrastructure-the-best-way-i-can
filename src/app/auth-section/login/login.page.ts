import { GlobalService } from './../../_services/global.service';
import { FacebookService } from './../_services/facebook.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../model/user';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  private subscription: Subscription;
  private subscription2: Subscription;
  public form: FormGroup;
  private checkUser: User;
  private emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  public isLogin: boolean;
  public returnUrl: string;

  constructor( private auth: AuthService, 
               private router: Router, 
               private fb: FacebookService, 
               private global: GlobalService,
               private route: ActivatedRoute ) {
      this.subscription2 = this.global.loginObservable.subscribe( login => this.isLogin = login);
      this.form = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.pattern(this.emailRegex)]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(form: NgForm) {
    this.checkUser = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    try {
      this.auth.login(this.checkUser);
      this.subscription = this.auth.userObservable.subscribe((user: User) => {
        if (user) {
          console.log(this.returnUrl);
          this.returnUrl !== '/' ? this.router.navigateByUrl(this.returnUrl) : this.router.navigate(['/events']);
        }
      });
    } catch (error) {
      console.log(error.status);
    }

  }

	onFbLogin() {
		this.fb.doFbLogin();
	}

  onLogout() {
    this.auth.logout();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription2.unsubscribe();
  }
}
