import { Subscription } from 'rxjs';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { UserInfo, User } from './../../auth-section/model/user';
import { AuthService } from './../../auth-section/_services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/_services/global.service';
import { CallService } from './../_services/call.service';
import { Call } from './../model/call';
@Component({
  selector: 'app-call',
  templateUrl: './call.page.html',
  styleUrls: ['./call.page.scss'],
})
export class CallPage implements OnInit {

  private subscription: Subscription;
  callInfo: Call; 
  userInfo: UserInfo;
  userId: number;
  form: FormGroup;
  isImage = false;
  asImage = false;
  selectedFile: File;
  imageUrl: any;
  editMode = false;
  call_reasons = ['תברואה', 'פציעה', 'פינוי', 'אלימות'];

  constructor(private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private global: GlobalService,
    private callService: CallService
  ) {

    this.route.paramMap.subscribe(async paramsMap => {
      console.log(+paramsMap.get('userId'));
      this.userId = +paramsMap.get('userId');
    });

    this.form = new FormGroup({
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'city': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'call_reasons': new FormControl(null, [Validators.required]),
      'location': new FormControl(null, [Validators.required]),
      'call_content': new FormControl(null, [Validators.required]),
    });


  }
  async ngOnInit() {
    if (this.userId !== undefined && this.global.isLogin) {
      try {
        await this.auth.getUserById(this.userId);
        this.subscription = this.auth.userObservable.subscribe((user: User) => {
          if (user.info !== null) {
            this.userInfo = user.info;
            console.log('user info', this.userInfo);
            this.form.setValue({
              'first_name': user.info.first_name,
              'last_name': user.info.last_name,
              'city': user.info.city,
              'call_reasons': 'בחר סיבה',
              'location': '',
              'call_content': ''
            });
            this.editMode = true;
          }

        });
      } catch (error) {
        console.error(error);
      }

    }

  }

  findLocation() {
    console.log("click");
  }

  onChooseFile(event: any) {
    // event.preventDefault();

    const element: HTMLElement = document.getElementById('avatar') as HTMLElement;

    element.click();
  }

  onFileChange(file) {
    const imageArray = ['.png', '.jpeg', '.jpg'];
    for (let i = 0; i < imageArray.length; ++i) {
      // code...
      this.isImage = file.srcElement.files[0].name.endsWith(imageArray[i]);
      if (this.isImage) {
        // code...
        this.selectedFile = <File>file.srcElement.files[0];
        console.log(this.selectedFile);
        this.asImage = true;
        this.preview(file);
        break;
      }
    }
  }

  preview(file) {
    if (file.length === 0) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file.srcElement.files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    };
  }

  async onSubmit(form: NgForm) {


    this.callInfo = {
      user_id: this.userId,
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      city: form.value.city,
      call_reasons:form.value.call_reasons,
      location: form.value.location,
      call_content: form.value.call_content,
    };

    console.log('callInfo', this.callInfo);
    const imageData = new FormData();
    imageData.append('image', this.selectedFile);

    // if (this.editMode) {
    //   console.log(this.userInfo.id);
    //   if (this.selectedFile) {
    //     console.log(this.selectedFile);
    //     this.auth.updateUserInfo(this.userInfo, imageData);
    //   } else {
    //     this.auth.updateUserInfo(this.userInfo);
    //   }

    // }
    
    // else
    //  {

      if (this.selectedFile) {
        console.log(this.selectedFile);
        this.callService.mokedIroniCall(this.callInfo, imageData);
      } else {
        this.callService.mokedIroniCall(this.callInfo);
      }
    }
  // }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
