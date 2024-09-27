import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Rooms } from '../pages/bookings/bookings.component';

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
  private roomsUrl = `${this.baseUrl}/Room`;

  constructor(private http: HttpClient) { }

  //USER REQUESTS
  //Auth
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
  addBookingRequest(rooms: any): Observable<ApiResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ApiResponse>(`${this.bookingUrl}/add`, rooms, { headers, observe: 'response' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error && error.error.message) {
            return throwError(() => new Error(error.error.message));
          }
          else {
            return throwError(() => new Error('Ocurrió un error desconocido.'));
          }
        })
      );
  }




  //ROOMS
  //GetAllRooms
  getAllRoomsRequest(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.roomsUrl}`, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }

  //Add
  addRoomRequest(room: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.roomsUrl}`, room, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }

  //Update
  updateRoomRequest(room: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.roomsUrl}/${room.id}`, room, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }

  //Delete
  deleteRoomRequest(roomId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.roomsUrl}/${roomId}`, { observe: 'response' })
      .pipe(
        catchError(error => {
          return of({ status: error.status, error: error.error } as ApiResponse);
        })
      );
  }

}