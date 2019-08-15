import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

public result = {};  

public fileData: File = null;
public localUrl: any[];
constructor(private _imageservices: ImagesService) { }

ngOnInit() {
}

fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    console.log('file process');
}

showPreviewImage(event: any) {
    this.fileProgress(event);
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.localUrl = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
}
 
onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this._imageservices.predict_image(formData)
    .subscribe(res => {
      console.log(res);
      this.result = res;
      // alert('SUCCESS !!');
    })
}

}
