import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiUbicationService {

  constructor(private http: HttpClient) { }


  async getRegion() {
    return await lastValueFrom(this.http.get<ApiResponse<any>>(`${environment.apiUrl}region`))
  }

  async getComuna(idRegion: number) {
    return await lastValueFrom(this.http.get<ApiResponse<any>>(`${environment.apiUrl}comuna/` + idRegion))
  }

}
