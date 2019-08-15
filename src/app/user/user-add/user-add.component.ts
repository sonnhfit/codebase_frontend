import { Component, OnInit } from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, fromEventPattern} from 'rxjs';
import {Observable} from 'rxjs';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public user_id: string = null;
  public errors: WebcamInitError[] = [];
  public list_image: any[] = [];
  public webcamImage: WebcamImage = null;
  public message = false;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  constructor(private _imageservices: ImagesService) { }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }
  public triggerSnapshot(): void {
    this.trigger.next();
    this.list_image.push(this.webcamImage.imageAsDataUrl);
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  public submitImage() {
    for (let item of this.list_image) {
        this._imageservices.upload_base64_image({'img': item, 'user_id': this.user_id})
        .subscribe(

          data => {
            this.list_image.splice(0, 1);
          },
          err => {
            console.error('refresh error', err);
          }

      );
    }
    
  }
  public removeItem(event, item) {
    this.list_image.splice(item, 1);
  }

  public trainModel() {
    this._imageservices.train_model()
    .subscribe(

      data => {
        this.message = data['success'];
      },
      err => {
        console.error('refresh error', err);
      }

  );
  }

}
