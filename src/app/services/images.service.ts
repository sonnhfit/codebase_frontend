import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        };
    }
  
  public upload_base64_image(mydic)
  {
    return this.http.post<any>(`${environment.apiUrl}/upload-base64/`, JSON.stringify(mydic), this.httpOptions);
  }

  public predict_image(formData) {
    let httpOptions2 = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
      };
    
    return this.http.post(`${environment.apiUrl}/predict/`, formData, httpOptions2);
  }

  public train_model() {
    return this.http.post(`${environment.apiUrl}/train/`, '', this.httpOptions);
  }

}
