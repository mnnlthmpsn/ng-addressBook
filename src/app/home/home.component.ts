import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  contacts: any = [];
  searchTerm: string = '';
  id: any;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts = () => {
    this.apiService.getContacts().subscribe((data: any) => {
      this.contacts = data;
    });
  };

  onChange() {
    if (this.searchTerm == '') {
      this.apiService.getContacts().subscribe((data: any) => {
        this.contacts = data;
      });
    } else {
      var nw = this.contacts.filter(
        (contact: any) =>
          contact.firstname.includes(this.searchTerm) ||
          contact.lastname.includes(this.searchTerm)
      );
      this.contacts = nw;
    }
  }

  deleteContact = (id: any) => {
    this.apiService
      .deleteContact(id)
      .subscribe((data: any) => this.getContacts()
      );
  };
}
