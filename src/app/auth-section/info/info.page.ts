import { Subscription } from 'rxjs';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { UserInfo, User } from './../model/user';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/_services/global.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit, OnDestroy {

  private subscription: Subscription;
  userInfo: UserInfo;
  userId: number;
  form: FormGroup;
  isImage = false;
  asImage = false;
  selectedFile: File;
  imageUrl: any;
  editMode = false;
  relationshipStatus = ['רווק/רווקה', 'נשוי/נשואה', 'אב/אם', 'אלמן/אלמנה'];

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router, private global: GlobalService) {

    this.route.paramMap.subscribe( async paramsMap => {
      console.log(+paramsMap.get('userId'));
      this.userId = +paramsMap.get('userId');
    });

    this.form = new FormGroup({
      'first_name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'last_name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'city': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'relationship_status': new FormControl(null, [Validators.required]),
    });


  }
  async ngOnInit() {
    if (this.userId !== undefined && this.global.isLogin) {
      try {
        await this.auth.getUserById(this.userId);
        this.subscription = this.auth.userObservable.subscribe( (user: User) => {
          if (user.info !== null) {
            this.userInfo = user.info;
            console.log('user info', this.userInfo);
            this.form.setValue({
              'first_name': user.info.first_name,
              'last_name': user.info.last_name,
              'city': user.info.city,
              'relationship_status': user.info.relationship_status,
            });
            this.editMode = true;
          }

        });
      } catch (error) {
        console.error(error);
      }

    }

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


      this.userInfo = {
        id: this.userInfo ? this.userInfo.id : 0,
        user_id: this.userId,
        first_name: form.value.first_name,
        last_name: form.value.last_name,
        relationship_status: form.value.relationship_status,
        city: form.value.city
      };

      console.log('user info', this.userInfo);
      const imageData = new FormData();
      imageData.append('image', this.selectedFile);

      if (this.editMode) {
        console.log(this.userInfo.id);
        if (this.selectedFile) {
          console.log(this.selectedFile);
          this.auth.updateUserInfo(this.userInfo, imageData);
        } else {
          this.auth.updateUserInfo(this.userInfo);
        }

      } else {

        if (this.selectedFile) {
          console.log(this.selectedFile);
          this.auth.setUserInfo(this.userInfo, imageData);
        } else {
          this.auth.setUserInfo(this.userInfo);
        }
      }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
