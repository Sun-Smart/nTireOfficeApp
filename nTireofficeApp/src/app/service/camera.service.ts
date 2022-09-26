import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
@Injectable({
  providedIn: 'root'
})
export class CameraService {
  sourcetype;
  constructor(private camera: Camera) {
   }
  public camerafunction(type){
    return new Promise((resolve, reject) => {
      if(type=="gallery"){
this.sourcetype=this.camera.PictureSourceType.PHOTOLIBRARY;
      }
      else{
        this.sourcetype=this.camera.PictureSourceType.CAMERA;
      }
      const optionsCamera: CameraOptions = {
        quality: 100,
        targetWidth: 600,
        sourceType:this.sourcetype,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true //Corrects Android orientation quirks
      }
    this.camera.getPicture(optionsCamera).then((imageData) => {
      resolve({"data":imageData});
    }, (err) => {
      reject(err);
    })
  });
   }

   public camerafunction1(){
    return new Promise((resolve, reject) => {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true //Corrects Android orientation quirks
    }

    this.camera.getPicture(options).then((imageData) => {
      resolve({"data":imageData});
    }, (err) => {
      reject(err);
    })
  });
   }
}

