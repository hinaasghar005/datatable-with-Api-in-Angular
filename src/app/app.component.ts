import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import DataTables, { Config } from 'datatables.net';
import { BackendService } from './services/backend.service';
import { CommonModule } from '@angular/common';
import DataTable from 'datatables.net-bs5';
import { DataTablesModule } from 'angular-datatables';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,DataTablesModule, HttpClientModule,  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  dtOptions: any = {}; // DataTable options
  users: any[] = []; // Stores user data
  dtTrigger: Subject<any> = new Subject(); // DataTable trigger

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    // Fetch initial data
    this.getUsers();
  }

  // Fetch user data from API
  getUsers(): void {
    const apiUrl = 'https://randomuser.me/api/?results=100';
    this.http.get<any>(apiUrl).subscribe(response => {
      this.users = response.results;  
      this.dtTrigger.next(this.users); // Trigger DataTable refresh
    });
  }

  // Add new user
  addUser(): void {
    const newUser = {
      id: Math.random(), // Temporary ID
      name: { first: 'New', last: 'User' },
      email: 'new.user@example.com',
      login: { username: 'newuser' }
    };
    this.users = [newUser, ...this.users];
  }

  // Edit a user
  editUser(user: any): void {
    user.name.first = 'Updated';
    
    user.name.last = 'User';
    user.email = 'updated.user@example.com';
  }

  // Delete a user
  deleteUser(user: any): void {

    this.users = this.users.filter(u => u !== user);
  }
}