import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';



export interface ApiResponse {
  status: number;
  body?: any;
  error?: any;
}

@Injectable({
  providedIn: 'root',
})


export class ApiService {
  //Endpoints
  private baseUrl = 'https://localhost:7252/api';
  private userUrl = `${this.baseUrl}/User`;

  constructor(private http: HttpClient) {}

  //USER REQUESTS

  // Verifica errores de de la solicitud, de no haber devuelve el observable con la response
  //USER REQUESTS
  authRequest(user: any): Observable<ApiResponse> {
    return this.http.post(`${this.userUrl}/auth`, user, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }

  registerRequest(user: any): Observable<ApiResponse> {
    return this.http.post(`${this.userUrl}/register`, user, { observe: 'response' })
      .pipe(
        catchError( error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }
}