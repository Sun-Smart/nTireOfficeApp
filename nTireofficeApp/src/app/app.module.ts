import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { PmsCreateIssuePage } from './Property_Pages/pms-create-issue/pms-create-issue.page';

// import { ChartsModule } from 'chartjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS   } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, ],
  providers: [StatusBar,LocationAccuracy,SplashScreen,AndroidPermissions,NativeGeocoder,BarcodeScanner,Geolocation,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
