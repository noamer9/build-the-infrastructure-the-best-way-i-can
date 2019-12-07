import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  options: LaunchNavigatorOptions = {
    app: this.launchNavigator.APP.WAZE
  } 


  constructor(private launchNavigator: LaunchNavigator) { }

  onNav(lat: string, lon: string) {
    this.launchNavigator.isAppAvailable(this.launchNavigator.APP.WAZE).then((isAvailable: any) => {
      let app: any;
      let dest = `${lat}, ${lon}`;
      if(isAvailable){
          app = this.launchNavigator.APP.WAZE;
      }else{
          console.warn('waze not available - falling back to user selection');
          app = this.launchNavigator.APP.USER_SELECT;
      }
      this.launchNavigator.navigate(dest  , {
          app: app
      });
  });  
  }
}
