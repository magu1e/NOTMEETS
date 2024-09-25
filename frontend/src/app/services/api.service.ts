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
  private bookingUrl = `${this.baseUrl}/Booking`;

  constructor(private http: HttpClient) { }

  //USER REQUESTS
  //Auth
  // Verifica errores de de la solicitud, de no haber devuelve el observable con la response
  authRequest(user: any): Observable<ApiResponse> {
    return this.http.post(`${this.userUrl}/auth`, user, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }

  //Register
  registerRequest(user: any): Observable<ApiResponse> {
    return this.http.post(`${this.userUrl}/register`, user, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }

  //Update
  updateUserRequest(user: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.userUrl}/update`, user, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }


  //Delete
  deleteUserRequest(userId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.userUrl}/delete/${userId}`, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }

  //GetUserRole
  getUserRoleRequest(userId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.userUrl}/role/${userId}`, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }

  //GetAllUsers
  getAllUsersRequest(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.userUrl}/all`, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }



  //BOOKING
  //AddBooking
  makeBookingRequest(rooms: any[]): Observable<ApiResponse> {
    return this.http.post(`${this.bookingUrl}/add`, rooms, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }
}