import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Add this import

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'your-backend-api-url'; 

  constructor(private http: HttpClient) { }

  // GET request to fetch data (already done in your code)
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // DELETE request to delete a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  // PUT request to edit/update a user
  editUser(userId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, updatedData);
  }
 }

